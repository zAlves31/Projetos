import React, { useState } from "react";
import './Register.css'

import logo from "../../assets/images/Logo.png"
import banner from "../../assets/images/bannerloginmobile.png"

import Carousel from "../../components/carousel/Carousel";
import { Input } from "../../components/input/Index"
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button"
import { Octokit } from "octokit";
import { octokit } from "../../utils/apiGithubKey";
import { ErrorMessage } from "../../components/errorMessage/ErrorMessage";

function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(ev) {
        try {
            ev.preventDefault();
            setErrorMessage('');
            
            if(password !== confirmPassword){
                setErrorMessage('A senhas digitadas devem ser iguais')
                return null;
            }
            if(await userAlreadyExists()){
                return null;
            }

            const res = await octokit.request("GET /users/{username}", {
                username: username.toLowerCase(),
                headers: {
                    'X-Github-Api-Version': '2022-11-28'
                }
            });
            const data = await res.data;
            const user = {
                name: data.name,
                username: username.toLowerCase(),
                password: password,
                created_at: new Date().getTime(),
                user_image_path: data.avatar_url
            };
            await fetch('http://localhost:3000/users', {
                method: 'POST',
                body: JSON.stringify(user),
            })
            navigate('/',{
                state: user
            })
        } catch (error) {
            setErrorMessage('Não existe nenhum usuário no github com esse username')
        }
    }

    async function userAlreadyExists() {
        const res = await fetch(`http://localhost:3000/users?username=${username.toLowerCase()}`)
        const data = await res.json();
        if (data[0]) {
            setErrorMessage('Já existe um usuário com esse username')
            return true
        }
        return false;
    }

    return (
        <div className="min-h-screen w-full bg-secondary-white flex justify-around items-center">

            <form onSubmit={handleSubmit} className="w-[50%] h-[96vh] flex flex-col items-center justify-center mt-[-30px] gap-4">
                <img src={logo} alt="" className="w-[250px]" />

                <h1 className="w-[80vw] md:w-auto font-chackra font-semibold text-[22px] md:text-[30px]">Cadastre-se Desenvolvedor!</h1>

                <Input
                    label={"Username:"}
                    placeholder={"Informe seu username do GitHub:"}
                    style="w-[90vw] md:w-[22vw]"
                    value={username}
                    setValue={(ev) => setUsername(ev.target.value)}
                />

                <div>
                    <Input
                        label={"Senha:"}
                        placeholder={"Informe sua senha:"}
                        style="w-[90vw] md:w-[22vw]"
                        type={showPassword ? 'text' : 'password'}
                        showPasswordButton={true}
                        value={password}
                        setValue={(ev) => setPassword(ev.target.value)}
                    />
                    <div className="w-[90vw] sm:w-[22vw] flex items-center justify-start mt-2">
                        <div
                            className={`w-[20px] h-[20px] mr-1 border ${showPassword ? 'bg-secondary-lightGray' : ''} border-secondary-gray rounded`}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                        <p className="text-verdana text-sm">Mostrar Senha</p>
                    </div>
                </div>


                <Input
                    label={"Confirmar Senha:"}
                    placeholder={"Confirme sua senha:"}
                    style="w-[90vw] md:w-[22vw]"
                    type="password"
                    value={confirmPassword}
                    setValue={(ev) => setConfirmPassword(ev.target.value)}
                />

                <ErrorMessage>{errorMessage}</ErrorMessage>

                <Button addStyles="w-[90vw] sm:w-[22vw] h-[50px] mt-6 z-10" isGradient >Cadastrar</Button>

                <div className="w-[80vw] sm:w-auto text-center mt-4">
                    <p className="font-verdana text-[14px]">Já possui uma conta? <Link to={"/login"}><span className="text-primary-blue font-bold">Faça seu Login!</span></Link></p>
                </div>
            </form>

            <Carousel addStyles={"hidden sm:flex"} />


            <img className="absolute bottom-[-15px] flex sm:hidden" src={banner} alt="" />

        </div>
    );
}

export default Register;