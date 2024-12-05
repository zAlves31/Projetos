import React, { useState } from "react"
import ImgPerfil from "../../assets/images/modelo-persona.jpg"
import { ButtonIcon, ButtonLogout } from "../button/Button";
import { Link, useLocation } from "react-router-dom";

export const CardProfile = ({ imgSource, username, following }) => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);
    const [follow, setFollow] = useState(false);

    const handleItemClick = (path) => {
        setActiveItem(path);
    };

    const alternarEstado = () => {
        setFollow(prevEstado => !prevEstado);
      };

    return (
        <div className={`flex h-[15%] sm:h-[200px] w-[90%] bg-secondary-white flex-row border rounded shadow-custom backdrop-blur-sm mx-auto sm:ml-[30px]`}>

            <img
                src={imgSource ? imgSource : ImgPerfil}
                alt="Imagem Perfil"
                className="h-[60px] w-[60px] sm:h-[100px] sm:w-[100px] rounded-full self-center ml-2 sm:self-center sm:ml-16"
            />


            <div className="h-[13%] w-[50%] sm:h-[90px] sm:w-[70%] flex flex-col self-center sm:ml-20 justify-between">

                <div className="mt-2 sm:mt-auto place-self-start text-lg font-bold">
                    <p>{username ? username : "Alice_Valentin"}</p>
                </div>

                <div className="flex text-center lg:flex-row lg:gap-6 gap-2 mt-5 font-verdana text-sm">
                    <p>12 publicações</p>
                    <p>2 seguidores</p>
                    <p>1 seguindo</p>
                </div>
                <div className="hidden w-[250px] sm:flex flex-row justify-between mt-[20px]">
                    <p>C#</p>
                    <p>JavaScript</p>
                    <p>HTML</p>
                    <p>CSS</p>
                </div>

                <Link to="/login" onClick={() => handleItemClick("/login")}>
                    <div className=" lg:mt-[-10%] sm:mt-auto w-[108px] sm:w-[120px] absolute right-5 mt-[-25%]">
                        {following ?
                            <ButtonIcon handleClick={alternarEstado}>{follow ? "Seguindo" : "Seguir"}</ButtonIcon>
                            :
                            <ButtonLogout />}
                    </div>
                </Link>

            </div>

        </div>

    );
};

export default CardProfile;

{/* <img
        className="w-16 rounded"
        src={ImgPerfil}
        alt="Imagem de perfil do usuário logado"
/> */}


{/* <img src={ImgPerfil} alt="ImagemPerfil"/> */ }