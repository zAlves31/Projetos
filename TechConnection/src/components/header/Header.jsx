import React, { useState } from "react";
import logo from "../../assets/images/Logo.png";
import { GoHome } from "react-icons/go";
import { IoAddCircleOutline } from "react-icons/io5";
import { PiUserCircle } from "react-icons/pi";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const Header = ({ addStyles, onOpenCreateModal }) => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);

    const handleItemClick = (path) => {
        setActiveItem(path);
    };

    return (
        <header className={`w-[325px] h-[96vh] bg-secondary-white rounded shadow-custom border border-secondary-gray flex flex-col items-center py-12 fixed left-5 top-3 ${addStyles}`}>
            <img src={logo} alt="" className="w-[12vw] mt-3" />

            <div className="w-[90%] h-[1px] bg-secondary-gray mt-9"></div>

            <div className="w-[90%] h-full mt-9 flex flex-col justify-between">
                <div>
                    <Link to="/" onClick={() => handleItemClick("/")}>
                        <div className={`h-auto flex items-center cursor-pointer mb-6 group ${activeItem === "/" ? "text-primary-purple" : ""}`}>
                            <GoHome size={30} className={`transition-colors duration-300 ${activeItem === "/" ? "text-primary-purple" : "text-secondary-darkGray"}`} />
                            <h1 className={`text-[18px] font-verdana ml-2 transition-colors duration-300 ${activeItem === "/" ? "text-primary-purple" : "text-secondary-darkGray"}`}>Home</h1>
                        </div>
                    </Link>

                    <div onClick={onOpenCreateModal} className={`h-auto flex items-center cursor-pointer mb-6 group ${activeItem === "/criar" ? "text-primary-purple" : ""}`}>
                        <IoAddCircleOutline size={30} className={`transition-colors duration-300 ${activeItem === "/criar" ? "text-primary-purple" : "text-secondary-darkGray"}`} />
                        <h1 className={`text-[18px] font-verdana ml-2 transition-colors duration-300 ${activeItem === "/criar" ? "text-primary-purple" : "text-secondary-darkGray"}`}>Criar</h1>
                    </div>

                    <Link to="/perfil" onClick={() => handleItemClick("/perfil")}>
                        <div className={`h-auto flex items-center cursor-pointer mb-6 group ml-[0.8px] ${activeItem === "/perfil" ? "text-primary-purple" : ""}`}>
                            <PiUserCircle size={30} className={`transition-colors duration-300 ${activeItem === "/perfil" ? "text-primary-purple" : "text-secondary-darkGray"}`} />
                            <h1 className={`text-[18px] font-verdana ml-2 transition-colors duration-300 ${activeItem === "/perfil" ? "text-primary-purple" : "text-secondary-darkGray"}`}>Perfil</h1>
                        </div>
                    </Link>
                </div>

                <Link to="/login" onClick={() => handleItemClick("/login")}>
                    <div className="h-auto flex items-center cursor-pointer group">
                        <HiOutlineLogout size={30} className="text-secondary-darkGray group-hover:text-secondary-red" />
                        <h1 className="text-secondary-darkGray text-[18px] font-verdana ml-2 transition-colors duration-300 group-hover:text-secondary-red">Logout</h1>
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default Header;
