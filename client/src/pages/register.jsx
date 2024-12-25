import React, { useEffect, useState } from "react";
import Input from "@/components/common/Input";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { REGISTER_ROUTE } from "@/utils/ApiRoutes";
import Avatar from "@/components/common/Avatar";

function register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("/default_avatar.png");
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      router.push("/");
    }
  }, []);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async () => {
    if (handleValidation()) {
      const { data } = await axios.post(REGISTER_ROUTE, {
        username,
        password,
        avatarImage: image,
        name,
      });
      console.log(data);
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        router.push("/login");
      }
    }
  };
  const handleValidation = () => {
    if (username.length < 6) {
      toast.error("账号长度应大于6.", toastOptions);
      return false;
    } else if (password.length < 6) {
      toast.error("密码长度应大于6.", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <div className=" bg-panel-header-background w-screen h-screen text-white flex justify-center items-center flex-col">
      <div className=" flex justify-center items-center gap-6 ">
        <Image src="/whatsapp.gif" alt="logo" width={300} height={300} />
        <div className=" text-7xl">whatsapp</div>
      </div>
      <h2 className=" text-2xl">创建用户</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input name="用户名" state={name} setState={setName} label />
          <Input name="账号" state={username} setState={setUsername} label />
          <Input
            name="密码"
            state={password}
            setState={setPassword}
            label
            password
          />
          <div className=" flex items-center justify-center ">
            <button
              onClick={handleSubmit}
              className=" flex justify-center items-center gap-7 bg-search-input-container-background p-5 rounded-lg"
            >
              注册
            </button>
          </div>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default register;




