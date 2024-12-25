import React, { useEffect, useRef } from "react";

function ContextMenu({
  options,
  coordinates,
  contextMenu,
  setContextMenu,
  id,
}) {
  const contextMenuRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.id !== id) {
        if (
          contextMenuRef.current &&
          !contextMenuRef.current.contains(e.target)
        ) {
          setContextMenu(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  const handleClick = (e, callback) => {
    e.stopPropagation();
    setContextMenu(false);
    callback();
  };
  return (
    <div
      className={` bg-dropdown-background fixed py-2 z-[100]  shadow-xl `}
      ref={contextMenuRef}
      style={{
        top: coordinates.y,
        left: coordinates.x,
      }}
    >

      <ul>
        {options.map(({ name, callback }) => (
          <li
            key={name}
            onClick={(e) => handleClick(e, callback)}
            className=" px-5 py-2 cursor-pointer hover:bg-outgoing-background"
          >
            <span className=" text-white">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;
