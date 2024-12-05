import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Paragraph, TextError, Title } from "../../Components/Texts";
import { ButtonLink } from "../../Components/Button";
import { FormAccess } from "../../Components/Forms";



const Login = ({onLinking, setUser}) => {
    const navigate = useNavigate();

    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState("");
    const [userAccess, setUserAccess] = useState("");

    const verifySccess = (e) => {
        e.preventDefault();
console.log(`http://localhost:3000/usuarios?login=${userAccess.toLowerCase()}`);
        setLoad(true)
        fetch(`http://localhost:3000/usuarios?login=${userAccess.toLowerCase()}`)
        .then( response => response.json())
        .then( response => {
   
            if(response[0]){
                console.log(response[0]);
                setUser({
                    id : response[0].id,
                    login : response[0].login,
                    imagem : response[0].imagem,
                })
                navigate("/painel-ativos");
            }else{
                setMessage("Usuario nao encontrado tente novamente")
            }

        })
        .catch( () =>{
            setMessage("Nao foi possivel efetuar login, teste sua conexao com a internet")
        })

        
        setLoad(false)
        setUserAccess("")
    }

    return (
        <section className="flex flex-col items-center justify-center gap-8 ">
            <Title>Entrar na plataforma</Title>

            <Paragraph>Para acessar sua conta, informe seu usuário de acesso vínculado ao Github</Paragraph>

            <FormAccess
                load={load}
                onSubmit={verifySccess}
                textButton="Acessar conta"

                value={userAccess}
                onChange={e => setUserAccess(e.target.value)}
            />

            <TextError>{message}</TextError>

            <Paragraph>Seu primeiro acesso? <ButtonLink onClick={onLinking}>registre-se aqui</ButtonLink></Paragraph>
        </section>
    )
}

export default Login