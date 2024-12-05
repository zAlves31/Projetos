import React, { useState } from "react";
import "./Login.css"

import logo from "../../assets/images/Logo.png";
import banner from "../../assets/images/bannerloginmobile.png"

import Carousel from "../../components/carousel/Carousel"
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input/Index";
import { Button } from "../../components/button/Button";
import { ErrorMessage } from "../../components/errorMessage/ErrorMessage";

function Login() {
    const [showPassword, setShowPassword] = useState(false)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate();

    async function handleSubmit(ev){
        ev.preventDefault();
        setErrorMessage('')
        const res = await fetch(`http://localhost:3000/users?username=${username.toLowerCase()}&password=${password}`)
        const data = await res.json();
        const user = data[0];
        if (user) {
            navigate('/',{
                state:user
            })
            return null;
        }
        setErrorMessage('Username ou senha incorretos')
    }

    return (
        <div className="min-h-screen w-full bg-secondary-white flex justify-around items-center">

            <form onSubmit={handleSubmit} className="w-[50%] h-[96vh] flex flex-col items-center justify-center mt-[-70px] sm:mt-4 gap-4">
                <img src={logo} alt="" className="w-[200px] md:w-[250px]" />

                <h1 className="w-[80vw] text-center font-chackra font-semibold text-[22px] md:text-[30px]">Bem-vindo Desenvolvedor!</h1>

                <Input
                    label={"Username:"}
                    placeholder={"Informe seu username"}
                    style="w-[90vw] sm:w-[22vw]"
                    value={username}
                    setValue={(ev)=>setUsername(ev.target.value)}
                />

                <div>
                    <Input
                        label={"Senha:"}
                        placeholder={"Informe sua senha:"}
                        style="w-[90vw] sm:w-[22vw]"
                        type={showPassword ? 'text' : 'password'}
                        showPasswordButton={true}
                        value={password}
                        setValue={(ev)=> setPassword(ev.target.value)}
                    />
                    <div className="w-[90vw] sm:w-[22vw] flex flex-row items-center justify-start mt-2">
                        <div
                            className={`w-[20px] h-[20px] mr-1 border ${showPassword ? 'bg-secondary-lightGray' : ''} border-secondary-gray rounded`}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                        <p className="text-verdana text-sm">Mostrar Senha</p>
                    </div>
                </div>

                <ErrorMessage>{errorMessage}</ErrorMessage>

                <Button addStyles="w-[90vw] sm:w-[22vw] h-[50px] mt-6" isGradient >ENTRAR</Button>

                <div className=" w-[80vw] sm:w-auto mt-4">
                    <p className="font-verdana text-[14px]">Ainda não possui uma conta? <Link to={"/Registro"}><span className="text-primary-blue font-bold"> Cadastre-se!</span></Link></p>
                </div>

            </form>

            <Carousel addStyles={"hidden sm:flex"} />

            <img className="absolute bottom-[-15px] flex sm:hidden" src={banner} alt="" />
        </div>
    );
}

export default Login;
