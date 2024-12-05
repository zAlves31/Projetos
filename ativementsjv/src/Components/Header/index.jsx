import React, { useContext } from "react";
import context from "../../Context/context";
import { useNavigate } from "react-router-dom";

import logomarca from "../../assets/logomarca_dark.png"

import { FaPowerOff } from 'react-icons/fa'
import { ButtonTransparent } from "../Button";

const Header = () => {
    const { user, setUser } = useContext(context)
    const navigate = useNavigate();

    const logoutUser = () => {
        try{
            const data = {
                ...user,
                ultimoAcesso : new Date().toJSON()
            }
            fetch("http://localhost:3000/usuarios/" + user.id,{
                method : "PUT",
                body : JSON.stringify(data)
            });

            setUser({})
            navigate("/")
        }
        catch{
            alert("Nao foi possivel, sair da aplicacao")
        }
    }

    return (
        <header className='w-full flex justify-between items-center py-5'>

            <img src={logomarca} alt="" />

            <div className='flex justify-center items-center gap-5'>
                <a target='_blank' href={`https://github.com/${user.login}`} rel="noreferrer">
                    <img className='w-14 rounded' src={user.imagem} alt="Imagem de perfil do usuario logado" />
                </a>

                <ButtonTransparent onClick={logoutUser} styles="border-primary-red"><FaPowerOff fill="#bf0000" /></ButtonTransparent>

            </div>

        </header>
    )
}

export default Header