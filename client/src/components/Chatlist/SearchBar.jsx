import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

function SearchBar() {
  const [{ contactSearch }, dispatch] = useStateProvider();
  return (
    <div className=" bg-search-input-container-background flex py-3 pl-5 items-center gap-3 h-14">
      <div className=" bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
        <BiSearchAlt2 className=" text-xl text-panel-header-icon cursor-pointer" />
        <input
          type="text"
          placeholder="搜索"
          className=" bg-transparent text-sm focus:outline-none text-white w-full"
          value={contactSearch}
          onChange={(e) => {
            dispatch({
              type: reducerCases.SET_CONTACT_SEARCH,
              contactSearch: e.target.value,
            });
          }}
        />
      </div>
      <div className=" pr-4 pl-3 ">
        <BsFilter className=" text-panel-header-icon cursor-pointer text-xl" />
      </div>
    </div>
  );
}

export default SearchBar;
