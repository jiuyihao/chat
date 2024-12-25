import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

function Avatar({ type, image, setImage }) {
  const [hover, serHover] = useState(false);
  const [isContextMEnuVIsible, setIsContextMEnuVisible] = useState(false);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);
  const showContextMenu = (e) => {
    e.preventDefault();
    setContextMenuCoordinates({ x: e.pageX, y: e.pageY });
    setIsContextMEnuVisible(true);
  };
  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      };
    }
  }, [grabPhoto]);
  const photoPickerChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement("img");
    reader.onload = (e) => {
      data.src = e.target.result;
      data.setAttribute("data-src", e.target.result);
      setImage(data.src);
    };
    reader.readAsDataURL(file);
  };
  const contextMenuOptions = [
    {
      name: "拍照",
      callback: () => {
        setShowCapturePhoto(true);
      },
    },
    {
      name: "选择来自此网站",
      callback: () => {
        setShowPhotoLibrary(true);
      },
    },
    {
      name: "上传图片",
      callback: () => {
        setGrabPhoto(true);
      },
    },
    {
      name: "移除头像",
      callback: () => {
        setImage("/default_avatar.png");
      },
    },
  ];

  return (
    <div>
      <div className=" flex items-center justify-center">
        {type === "sm" && (
          <div className="relative h-10 w-10">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "lg" && (
          <div className="relative h-14 w-14">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "xl" && (
          <div
            className="relative cursor-pointer z-0"
            onMouseEnter={() => serHover(true)}
            onMouseLeave={() => serHover(false)}
          >
            <div
              className={` z-10 bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col gap-2
              ${hover ? "visible" : "hidden"}
            `}
              onClick={(e) => showContextMenu(e)}
              id="context-opener"
            >
              <FaCamera className=" text-2xl"></FaCamera>
              <span> 更换头像</span>
            </div>
            <div className=" flex items-center justify-center h-60 w-60 ">
              <Image src={image} alt="avatar" className="rounded-full" fill />
            </div>
          </div>
        )}
      </div>
      {showCapturePhoto && (
        <CapturePhoto
          setImage={setImage}
          hide={setShowCapturePhoto}
        ></CapturePhoto>
      )}
      {isContextMEnuVIsible && (
        <ContextMenu
          options={contextMenuOptions}
          coordinates={contextMenuCoordinates}
          contextMenu={isContextMEnuVIsible}
          setContextMenu={setIsContextMEnuVisible}
          id="context-opener"
        />
      )}
      {showPhotoLibrary && (
        <PhotoLibrary
          setImage={setImage}
          setShowPhotoLibrary={setShowPhotoLibrary}
        ></PhotoLibrary>
      )}
      {grabPhoto && <PhotoPicker onChange={photoPickerChange}></PhotoPicker>}
    </div>
  );
}

export default Avatar;
