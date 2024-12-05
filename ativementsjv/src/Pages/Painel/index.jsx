import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { FormAtivement } from "../../Components/Forms";
import Tabs from "../../Components/Tabs";
import Table from "../../Components/Table";

const Painel = () =>{
    const [update, setUpdate]=useState([])
    const [selectedPlace, setSelectedPlace] = useState("")
    const [places, setPlaces] = useState([]);
    const [listAtivements, setListAtivements] = useState([]);

    const getPlaces = () =>{
        fetch("http://localhost:3000/locais")
        .then(response => response.json())
        .then(response => {
            setPlaces(response);

            if(response[0]){
                setSelectedPlace(response[0].id)
            }
        })
        .catch(() =>{
            alert("Erro inesperado, nao foi possivel obeter os locais dos ativos")
        })
    }

    useEffect(() => {
        if(selectedPlace === ""){
            getPlaces()
        }
    }, []);

    const filterAtivements = (local) => {
        
        fetch("http://localhost:3000/ativos?local=" + local)
        .then(response => response.json())
        .then(response =>{
            setListAtivements(response)
        })

        .catch(()=>{
            alert("Nao foi possivel obeter os ativos")
        })
    }

    useEffect(()=>{
        filterAtivements(selectedPlace)
    }, [selectedPlace])

    return (
        <div className='w-10/12 mx-auto my-0'>

            <Header/>
            

            {/* Formularios de ativos */}
            <FormAtivement places={places} setPlaces={setPlaces} setList={setListAtivements} list={listAtivements} update={update}/>

            {/* tabs - locais do ativo */}
            <Tabs places={places} selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace}/>

            <Table list={listAtivements.filter( x => x.local === selectedPlace)} setList={setListAtivements} setUpdate={setUpdate} />

        </div>
    )
}

export default Painel