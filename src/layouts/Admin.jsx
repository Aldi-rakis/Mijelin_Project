import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import { Link } from "react-router-dom"; // Import useLocation

const Layoutadmin = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation(); // Ambil lokasi URL
  
  const Menus = [
    { title: "Dashboard", src: "Chart_fill", link: "/admin/dashboard" },
    { title: "Berita", src: "Chat", link: "/admin/berita" },
    { title: "Users", src: "User", link: "/admin/users" },
    { title: "Ticketing", src: "Setting", link: "/admin/tiket" },
  ];

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setOpen(false);
        setMobileMenuOpen(false);
      } else {
        setOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setOpen(!open);
    }
  };

  return (
    <div className="flex min-h-screen md:h-screen bg-gray-100 relative">
      {/* Mobile Overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isMobile 
            ? mobileMenuOpen 
              ? "translate-x-0" 
              : "-translate-x-full"
            : open 
              ? "w-72" 
              : "w-20"
        } ${
          isMobile ? "fixed left-0 top-0 w-72 z-50" : "relative"
        } bg-gradient-to-b from-[#1e293b] to-[#0f172a] h-svh p-5 pt-8 duration-300 shadow-2xl transition-all`}
      >
        {/* Toggle Button */}
        {!isMobile && (
          <img
            src="../src/assets/admin/control.png"
            className={`absolute cursor-pointer -right-3 top-5 w-7 border-2 border-blue-500 bg-white
             rounded-full ${!open && "rotate-180"} transition-transform duration-300 hover:scale-110`}
            onClick={toggleSidebar}
          />
        )}

        {/* Logo Section */}
        <div className="flex gap-x-4 gap-y-1 items-center">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-xl">
            <img
              src="../src/assets/admin/logo.png"
              className={`cursor-pointer duration-500 w-8 h-8 ${
                (open || isMobile) && "rotate-[360deg]"
              }`}
            />
          </div>
          <div className={`${!open && !isMobile && "scale-0"} origin-left duration-300`}>
            <h1 className="text-white font-bold text-xl">
              Mijelin Admin
            </h1>
            <p className="text-blue-200 text-sm">Management Panel</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <ul className="pt-8 space-y-2">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-xl p-3 cursor-pointer hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-gray-300 text-sm items-center gap-x-4 transition-all duration-200 group
              ${Menu.gap ? "mt-6" : "mt-2"} ${
                location.pathname === Menu.link 
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg" 
                  : ""
              }`}
            >
              <Link to={Menu.link} className="flex items-center gap-x-4 w-full">
                <div className={`p-2 rounded-lg ${
                  location.pathname === Menu.link 
                    ? "bg-white bg-opacity-20" 
                    : "bg-gray-600 bg-opacity-30 group-hover:bg-white group-hover:bg-opacity-20"
                } transition-colors duration-200`}>
                  <img src={`../src/assets/admin/${Menu.src}.png`} className="w-5 h-5" />
                </div>
                <span
                  className={`${!open && !isMobile && "hidden"} origin-left duration-200 font-medium`}
                >
                  {Menu.title}
                </span>
                {location.pathname === Menu.link && (
                  <div className="w-2 h-2 bg-white rounded-full ml-auto"></div>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Profile Section */}
        <div className={`absolute bottom-5 left-5 right-5 ${!open && !isMobile && "hidden"}`}>
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-3 border border-gray-600">
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full border-2 border-blue-400"
                src="https://demo.tailladmin.com/src/images/user/user-01.png"
                alt="Admin"
              />
              <div className="flex-1">
                <p className="text-white font-medium text-sm">Admin User</p>
                <p className="text-blue-200 text-xs">Super Admin</p>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex w-full p-4 h-[70px] items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              {isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
              
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4" />
                </svg>
                <span className="font-medium hidden sm:inline">Admin Panel</span>
                <span className="text-gray-400 hidden sm:inline">/</span>
                <span className="text-blue-600 font-medium text-sm sm:text-base">
                  {Menus.find(menu => menu.link === location.pathname)?.title || 'Dashboard'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM12 3C6.48 3 2 7.48 2 13c0 2.76 1.12 5.26 2.93 7.07L12 13l7.07 7.07C20.88 18.26 22 15.76 22 13c0-5.52-4.48-10-10-10z" />
                </svg>
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              
              {/* Settings */}
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100 hidden sm:block">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button className="flex items-center space-x-2 sm:space-x-3 p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <img
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-gray-200"
                    src="https://demo.tailladmin.com/src/images/user/user-01.png"
                    alt="Profile"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-700">Admin User</p>
                    <p className="text-xs text-gray-500">admin@mijelin.com</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layoutadmin;
