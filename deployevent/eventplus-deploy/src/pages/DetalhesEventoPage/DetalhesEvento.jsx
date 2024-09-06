import React, { useEffect, useState } from "react";
import MainContent from "../../components/MainContent/MainContent";
import { useParams } from "react-router-dom";
import Title from "../../components/Title/Title";
import Container from "../../components/Container/Container";
import TableDe from "../DetalhesEventoPage/TableDe/TableDe";
import { useContext } from "react";
import { UserContext } from "../../context/AuthContext";
import api, { commentaryEventResource } from "../../Services/Service";
import "./DetalhesEvento.css";


const DetalhesEventosPage = () => {
  const { userData, setUserData } = useContext(UserContext);
  const {idEvent} = useParams();

  const [comentarios, setComentarios] = useState([]);

  async function getComentarios() {
    try {
      const route = userData.role === 'Comum' ?  'ListarSomenteExibe' : 'ListarTodos';
      const promise = await api.get(`${commentaryEventResource}/${route}?id=${idEvent}`);
      const dados = promise.data;

      setComentarios(dados);
      console.log(comentarios)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getComentarios();
  }, []);

  return (
    <>
      <MainContent>
        <div className="lista-detalhes-section">
          <Container>
            <Title titleText={"Detalhes-Eventos"} additionalClass="custom-title"/>
            <TableDe dados={comentarios} />
          </Container>
        </div>
      </MainContent>
    </>
  );
};

export default DetalhesEventosPage;
