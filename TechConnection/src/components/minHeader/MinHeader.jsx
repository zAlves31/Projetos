import React, { useState } from "react";
import logo from "../../assets/images/Logo.png";

import { GoHome } from "react-icons/go";
import { IoAddCircleOutline } from "react-icons/io5";
import { PiUserCircle } from "react-icons/pi";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { ModalPost } from "../modalPost/Index";

const MinHeader = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleItemClick = (path) => {
        setActiveItem(path);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <header className="w-[100%] h-[8vh] bg-secondary-white shadow-custom border border-secondary-gray flex flex-row fixed top-[93%] left-[0vw] lg:hidden">

            <div className="flex w-[100%] justify-around items-center">
                <Link to="/" onClick={() => handleItemClick("/")} className="flex items-center">
                    <GoHome size={30} className={`transition-colors duration-300 ${activeItem === "/" ? "text-primary-purple" : "text-secondary-darkGray"}`} />
                </Link>

                <button onClick={handleOpenModal}>
                    <IoAddCircleOutline size={30} className="transition-colors duration-300 text-secondary-darkGray hover:text-primary-purple" />
                </button>

                <Link to="/perfil" onClick={() => handleItemClick("/perfil")}>
                    <PiUserCircle size={30} className={`transition-colors duration-300 ${activeItem === "/perfil" ? "text-primary-purple" : "text-secondary-darkGray"}`} />
                </Link>

                <Link to="/login" onClick={() => handleItemClick("/login")}>
                    <div className="h-auto flex items-center cursor-pointer group">
                        <HiOutlineLogout size={30} className="text-secondary-darkGray group-hover:text-secondary-red" />
                    </div>
                </Link>

                {isModalOpen && (
                    <ModalPost
                        setIsOpen={setIsModalOpen}
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                    />
                )}
            </div>

        </header>
    );
};

export default MinHeader;
