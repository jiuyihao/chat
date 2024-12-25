import React, { useEffect, useState } from "react";
import Input from "@/components/common/Input";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LOGIN_ROUTE, loginRoute } from "@/utils/ApiRoutes";

function login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
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

  const handleSubmit = async (e) => {
    console.log(111);
    if (handleValidation()) {
      const { data } = await axios.post(LOGIN_ROUTE, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        router.push("/");
      }
    }
  };
  const handleValidation = () => {
    if (username.length === "") {
      toast.error("请输入用户账号.", toastOptions);
      return false;
    } else if (password.length === "") {
      toast.error("请输入用户密码.", toastOptions);
      return false;
    }
    return true;
  };
  const toRegister = () => {
    router.push("/register");
  };

  return (
    
    <div className=" bg-panel-header-background w-screen h-screen text-white flex justify-center items-center flex-col">
      <div className=" flex justify-center items-center gap-2 ">
        <Image src="/whatsapp.gif" alt="logo" width={300} height={300} />
        <div className=" text-7xl">whatsapp</div>
      </div>
      <h2 className=" text-2xl">密码登录</h2>
      <div className="flex  mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input name="账号" state={username} setState={setUsername} label />
          <Input
            name="密码"
            state={password}
            setState={setPassword}
            label
            password
          />
          <div className=" flex items-center justify-center gap-3 ">
            <button
              onClick={handleSubmit}
              className=" flex justify-center items-center gap-7  bg-login p-5 rounded-3xl"
            >
              登录
            </button>
            <button
              onClick={toRegister}
              className=" flex justify-center items-center  bg-search-input-container-background p-5  rounded-3xl"
            >
              注册
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default login;
