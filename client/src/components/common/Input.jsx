import React from "react";

function Input({ name, state, setState, label = false, password = false }) {
  return (
    <div className=" flex gap-1 flex-col">
      {label && (
        <label htmlFor={name} className=" text-teal-light text-lg px-1">
          {name}
        </label>
      )}
      {password ? (
        <input
          type="password"
          id={name}
          value={state}
          onChange={(e) => setState(e.target.value)}
          className=" bg-[#2a3942] text-start focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
        />
      ) : (
        <input
          type="text"
          id={name}
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="  bg-[#2a3942] text-start focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
        />
      )}
    </div>
  );
}

export default Input;
