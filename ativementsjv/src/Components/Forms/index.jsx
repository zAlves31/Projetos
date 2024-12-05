import { useContext, useEffect, useState } from "react";
import { Button, ButtonTransparent } from "../Button";
import { Input, Select } from "../Input";
import context from "../../Context/context";

import { v4 as uuid } from "uuid";

export const FormAccess = ({ textButton, onSubmit, value, onChange, load }) => {
    return (
        <form onSubmit={onSubmit} className="w-[40%]">
            <Input styles="w-full" id="campoFormulario" value={value} onChange={onChange}>Usuário de acesso</Input>

            <Button load={load} styles="w-full mt-4">{textButton}</Button>
        </form>
    )
}

export const FormAtivement = ({ list, setList, places, setPlaces, update }) => {
    const { user } = useContext(context);
    const [ativement, setAtivement] = useState({
        numero: "",
        nome: "",
        local: ""
    })

    const clearInputs = () => {
        setAtivement({numero : "", nome : "", local : ""})
    }

    const updateAtivement = async () => {
        try{
            const localId =  await findPlace(ativement.local)

            const data ={
                ...ativement,
                local : localId,
                dataAtualizacao : new Date().toLocaleString(),
                usuarioAlteracao : user.id
            }

            fetch("http://localhost:3000/ativos/" + ativement.id, {
                method : "PUT",
                body : JSON.stringify(data)
            });

            setList( list.map(item => item.id === ativement.id ? data : item))

        }catch{
            alert("Nao foi possivel atualizar o ativo")
        }
        
    }

    const validateData = async (e) =>{
        e.preventDefault();

        const numeracaoEmUso = await validateNumberAtivement()

        if(ativement.nome.length <= 2){
            alert("Nome do ativo com poucos caracteres")
        }else if (ativement.numero.length <= 5){
            alert("Numero do ativo com poucos caracteres, obrigatorio ser mais do que 5")
        }else if(ativement.nome.trim() == "" || ativement.local.trim() == ""){
            alert("Campos nao prenchidos corretamente")
        }else if(numeracaoEmUso && !ativement.id){
            alert("Numero do ativo ja em uso, utilize outra numeracao ")
        }else{
            
            if(!ativement.id){
                createAtivement();
            }else{
                updateAtivement()
            } 
        }
    }

    const validateNumberAtivement = () => {
        fetch("http://localhost:3000/ativos?numero=" + ativement.numero)
        .then(response => response.json())
        .then(response => {
            if(response[0]){
                return true
            }
            return false
        })
        .catch(() =>{
            return true
        })
    }

    const createAtivement = async (e) => {
     

        try {
            const localId = await findPlace(ativement.local)

            const data = {
                ...ativement,
                local: localId,
                id: uuid(),
                usuario_id: user.id,
                dataRegistro: new Date().toLocaleString(),
                status: true
            }

            fetch("http://localhost:3000/ativos", {
                method: "POST",
                body: JSON.stringify(data)
            })

            setList([...list, data])
        }
        catch {
        }
    }

    const findPlace = (local) => {
        return fetch("http://localhost:3000/locais?nome=" + local)
            .then(response => response.json())
            .then(async response => {
                if (!response[0]) {
                    return createPlace(local);
                }
                else {
                    return response[0].id;
                }
            })
            .catch(() => {
                alert("Nao foi ")
            })
    }

    const createPlace = (local) => {
        try {
            const data = {
                id: uuid(),
                nome: local
            }

            fetch("http://localhost:3000/locais", {
                method: "POST",
                body: JSON.stringify(data)
            })

            setPlaces([...places, data])

            return data.id;
        }
        catch {
            alert("Nao foi possivel registrar um novo local")
        }
    }

    useEffect(() =>{
        const local = places.filter( item => item.id === update.local )

        if(local[0]){
            setAtivement({...update, local : local[0].nome})
        }

    }, [update])

    return (
        <form onSubmit={validateData} className="bg-[#D9D3F6] w-full py-5 px-10 mt-6 rounded flex justify-between items-end shadow-md">
            <Input disabled={!!ativement.id} type="number" styles="w-[20%]" id="numeroativo" value={ativement.numero} onChange={e => setAtivement({ ...ativement, numero: e.target.value })}>Numero do ativo</Input>
    
            <Input styles="w-[20%]" id="nomeativo" value={ativement.nome} onChange={e => setAtivement({ ...ativement, nome: e.target.value })}>Nome do ativo</Input>
    
            <Select places={places} styles="w-[20%]" id="localativo" value={ativement.local} onChange={e => setAtivement({ ...ativement, local: e.target.value })}>Local do ativo</Select>
    
            <ButtonTransparent onClick={e => clearInputs()} styles="w-[15%] border-primary-blue text-primary-blue">Limpar campos</ButtonTransparent>
    
            <Button styles="w-[15%]">Inserir ativo</Button>
        </form>
    )
}

