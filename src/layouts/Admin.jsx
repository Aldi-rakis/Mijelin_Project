import { useState } from "react";
import { useLocation } from "react-router-dom"; 
import { Link } from "react-router-dom"; // Import useLocation

const Layoutadmin = ({ children }) => {
  const [open, setOpen] = useState(true);
  const location = useLocation(); // Ambil lokasi URL
  const Menus = [
    { title: "Dashboard", src: "Chart_fill", link: "/admin/dashboard" },
    { title: "Berita", src: "Chat", link: "/admin/berita" },
    { title: "Accounts", src: "User", gap: true, link: "/accounts" },
    { title: "Schedule", src: "Calendar", link: "/schedule" },
    { title: "Search", src: "Search", link: "/search" },
    { title: "Analytics", src: "Chart", link: "/analytics" },
    { title: "Files", src: "Folder", gap: true, link: "/files" },
    { title: "Setting", src: "Setting", link: "/settings" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-[#333d4b] h-screen p-5 pt-8 relative duration-300`}
      >
        <img
          src="../src/assets/admin/control.png"
          className={`absolute cursor-pointer -right-3 top-5 w-7 border-[#1E94B1]
           border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 gap-y-1 items-center">
          <img
            src="../src/assets/admin/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>

        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-[#1E94B1] text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-2" : "mt-2"} ${
                location.pathname === Menu.link ? "bg-[#1E94B1]" : ""
              }`}
            >
              <a href={Menu.link} className="flex items-center gap-x-4 w-full">
                <img src={`../src/assets/admin/${Menu.src}.png`} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-sm w-full">
        <div className="flex w-full p-4 h-[70px] items-center shadow-md bg-white justify-between">
          <p className="text-[#3c3f3f]">
            Dashboard <span className="text-[#77797aa2]">/user</span>
          </p>
          <img
            className="w-[40px] h-[40px]"
            src="https://demo.tailadmin.com/src/images/user/user-01.png"
            alt=""
          />
        </div>
        <div className="flex m-4">{children}</div>
      </div>
    </div>
  );
};

export default Layoutadmin;
