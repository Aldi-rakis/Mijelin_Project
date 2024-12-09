import { useState } from "react";
import Layoutadmin from "../../layouts/Admin";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard"); // Menyimpan menu yang aktif
  const Menus = [
    { title: "Dashboard", src: "Chart_fill", link: "/dashboard" },
    { title: "Inbox", src: "Chat", link: "/admin/berita" },
    { title: "Accounts", src: "User", gap: true, link: "/accounts" },
    { title: "Schedule", src: "Calendar", link: "/schedule" },
    { title: "Search", src: "Search", link: "/search" },
    { title: "Analytics", src: "Chart", link: "/analytics" },
    { title: "Files", src: "Folder", gap: true, link: "/files" },
    { title: "Setting", src: "Setting", link: "/settings" },
  ];

  return (
    <div className="">
      <Layoutadmin >
     
      <div className="bg-white shadow-sm w-full">
        
        <div className="flex">

        <div className="p-4 bg-white border w-1/2 border-gray-100 rounded-sm text-black shadow-md m-4 ">
          <h1>Ini merupakan tempat makan makanan</h1>

        </div>

        <div className="p-4 bg-white border w-1/2 border-gray-100 rounded-sm text-black shadow-md m-4 ">
          <h1>Ini merupakan tempat makan makanan</h1>

        </div>

        </div>

       
       
      </div>
      </Layoutadmin>
      
    </div>
  );
};

export default Dashboard;
