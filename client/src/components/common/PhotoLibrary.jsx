import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";

function PhotoLibrary({ setImage, setShowPhotoLibrary }) {
  const images = [
    "/avatars/1.png",
    "/avatars/2.png",
    "/avatars/3.png",
    "/avatars/4.png",
    "/avatars/5.png",
    "/avatars/6.png",
    "/avatars/7.png",
    "/avatars/8.png",
    "/avatars/9.png",
  ];
  return (
    <div className=" fixed top-0 left-0 max-h-[100vh] max-w-[100vw] w-full h-full flex justify-center items-center ">
      <div className=" h-max w-max bg-gray-900 gap-6 rounded-lg p-4">
        <div
          className=" pt-2 pe-2 cursor-pointer  "
          onClick={() => setShowPhotoLibrary(false)}
        >
          <IoClose className=" h-10 w-10 cursor-pointer" />
        </div>
        <div className=" grid grid-cols-3 justify-center items-center gap-16 p-20 w-full">
          {images.map((item) => (
            <div
              onClick={() => {
                setImage(item);
                setShowPhotoLibrary(false);
              }}
            >
              <div>
                <Image src={item} alt="image" width={100} height={100} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhotoLibrary;

