import getPrismaInstance from "../utils/PrismaClient.js";
import bcrypt from "bcrypt";
export const register = async (req, res, next) => {
  try {
    const { username, password, avatarImage, name } = req.body;
    const prisma = getPrismaInstance();
    const usernameCheck = await prisma.user.findUnique({ where: { username } });
    if (usernameCheck) return res.json({ msg: "用户已存在", status: false });
    if (avatarImage === "/default_avatar.png")
      return res.json({ msg: "请上传头像", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword, avatarImage, name },
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.json({ msg: "用户不存在", status: false });
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) return res.json({ msg: "密码错误", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};
export const change = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const { name, password, about, id, avatarImage } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      const newUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name,
          password,
          about,
          avatarImage,
        },
      });
      return res.json({ status: true, user });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const users = await prisma.user.findMany({
      orderBy: { id: "asc" },
      select: {
        id: true,
        name: true,
        avatarImage: true,
        about: true,
      },
    });
    const usersGroupedByInitialLetter = {};
    users.forEach((user) => {
      const initialLetter = user.name.charAt(0).toUpperCase();
      if (!usersGroupedByInitialLetter[initialLetter]) {
        usersGroupedByInitialLetter[initialLetter] = [];
      }
      usersGroupedByInitialLetter[initialLetter].push(user);
    });
    return res.status(200).send({ users: usersGroupedByInitialLetter });
  } catch (error) {
    console.log(error);
  }
};
