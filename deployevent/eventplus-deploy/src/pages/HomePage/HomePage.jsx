import React, { useEffect, useState } from "react";
import "./HomePage.css";

import Banner from "../../components/Banner/Banner";
import MainContent from "../../components/MainContent/MainContent";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Title/Title";
import NextEvent from "../../components/NextEvent/NextEvent";
import LastEvent from "../../components/LastEvent/LastEvent"
import Container from "../../components/Container/Container";
import api from "../../Services/Service";
import Notification from "../../components/Notification/Notification";
import { nextEventResource, previousEventResource } from "../../Services/Service";


const HomePage = () => {
  const [nextEvents, setNextEvents] = useState([]);
  const [notifyUser, setNotifyUser] = useState(); //Componente Notification
  const [previousEvents, setpreviousEvents] = useState([]);

  // roda somente na inicialização do componente
  useEffect(() => {
    async function getNextEvents() {
      try {
        const promise = await api.get(nextEventResource);
        const dados = await promise.data;
        // console.log(dados);
        setNextEvents(dados); //atualiza o state

      } catch (error) {
        console.log("não trouxe os próximos eventos, verifique lá!");
      }
    }


    async function getpreviousEvents() {
      try {
        const promise = await api.get(previousEventResource);
        const dados = await promise.data;
        // console.log(dados);
        setpreviousEvents(dados); //atualiza o state

      } catch (error) {
        console.log("não trouxe os próximos eventos, verifique lá!");
      }
    }

    getNextEvents(); //chama a função
    getpreviousEvents();
  }, []);

  return (
    
    <MainContent>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <Banner />

      {/* PRÓXIMOS EVENTOS */}
      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos Eventos"} /> 

          <div className="events-box">
            {nextEvents.map((e) => {
              return (
                <NextEvent
                  key={e.idEvento}
                  title={e.nomeEvento}
                  description={e.descricao}
                  eventDate={e.dataEvento}
                  idEvent={e.idEvento}
                />
              );
            })}
          </div>
        </Container>
      </section>

      <section className="eventos-anteriores">
        <Container>
          <Title titleText={"Eventos Anteriores"} /> 

          <div className="events-box">
            {previousEvents.map((e) => {
              return (
                <LastEvent
                  key={e.idEvento}
                  title={e.nomeEvento}
                  description={e.descricao}
                  eventDate={e.dataEvento}
                  idEvent={e.idEvento}
                />
              );
            })}
          </div>
        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
