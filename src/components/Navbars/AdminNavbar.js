import React from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbar(  {viewName} ) {
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-lightBlue-600 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            { /*TODO: Enlazar con la propiedad de vista actual*/ }
            {viewName}
          </a>
          {/* User Info */}

            <span className={" text-white "}>Nombre de usuario</span>

          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
