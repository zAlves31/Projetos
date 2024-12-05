import React, { useState } from "react";
import { Paragraph, TextError, Title } from "../../Components/Texts";
import { ButtonLink } from "../../Components/Button";
import { FormAccess } from "../../Components/Forms";
import { octokit } from "../../Utils/githubkey";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";



const Register = ({onLinking, setUser}) => {
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState("");
    const [userAccess, setUserAccess] = useState("");

    const validateUser = (e) => {
        e.preventDefault();

        setLoad(true)
        octokit.request("GET /users/{username}", {
            username: userAccess,
            headers: {
                'X-GitHub-Api-Version': "2022-11-28"
            }
        }).then(async response => {
            const verify = await checkUserExists()

            if (!verify) {
                registerUser(response.data)
            } else {
                setMessage("Usuario ja cadastrado")
            }

        }).catch(() => {
            setMessage("Usuario nao encontrado, tente novamente")
        })
        setLoad(false)
        setUserAccess("")
    }

    const checkUserExists = () => {
        return fetch(`http://localhost:3000/usuarios?login=${userAccess.toLowerCase()}`)
            .then(response => response.json())
            .then(response => {
                if (response.lenght > 0) {
                    return true;
                }

                return false;
            }).catch(() => {
                alert("Nao foi possivel encontrar o usuario")
            })
    }

    const registerUser = (user) => {
        setMessage("")
        try {
            const data = {
                id: uuid(),
                login: user.login.toLowerCase(),
                imagem: user.avatar_url
            }

            fetch("http://localhost:3000/usuarios", {
                method: "POST",
                body : JSON.stringify(data)
            });

            setUser(data)

            navigate("/painel-ativos")
        }
        catch{
            setMessage("Nao foi possivel cadastrar efetuar o registro, teste sua conexao com a internet")
        }
    }

    return (
        <section className="flex flex-col items-center justify-center gap-8 ">
            <Title>Registrar-se na plataforma</Title>

            <Paragraph>Para criar uma conta, informe a url de acesso ao seu perfil da plataforma do Github</Paragraph>

            <FormAccess
                load={load}
                onSubmit={validateUser}
                textButton="Cadastrar conta"

                value={userAccess}
                onChange={e => setUserAccess(e.target.value)}
            />

            <TextError>{message}</TextError>

            <Paragraph>Já possui registro? <ButtonLink onClick={onLinking}>acessar aqui</ButtonLink></Paragraph>
        </section>
    )
}

export default Register