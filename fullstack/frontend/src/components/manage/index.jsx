import { useState, useEffect } from "react";
import {
  Body,
  Container,
  SubTitle,
  ContainerCardBarber,
  CardBarber,
  NameBarber,
  SubTitleInfoBarber,
  ContainerBarber,
  InfoBarber,
  Specialties,
  CardSpecialties,
  ContainerSpecialties,
} from "./styles";
import Api from "../../services";

export const Manage = () => {
  const token = JSON.parse(localStorage.getItem("@UserAuthorization:token"));
  const [barber, setBarber] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [schedulesFilter, setSchedulesFilter] = useState([]);

  useEffect(() => {
    Api.get("barber")
      .then((res) => {
        setBarber(res.data);
      })
      .catch((err) => console.log(err));

    Api.get("specialty")
      .then((res) => {
        setSpecialties(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function formateData(dataHora) {
    const data = new Date(dataHora);
    const dia = data.getUTCDate().toString().padStart(2, "0");
    const mes = (data.getUTCMonth() + 1).toString().padStart(2, "0");
    const ano = data.getUTCFullYear().toString();
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <Body>
      <Container>
        <SubTitle>Funcionários</SubTitle>
        <ContainerCardBarber>
          {barber.map((elem) => (
            <CardBarber>
              <NameBarber>{elem.name}</NameBarber>
              <ContainerBarber>
                <div>
                  <SubTitleInfoBarber>Idade:</SubTitleInfoBarber>
                  <InfoBarber> {elem.age}</InfoBarber>
                </div>
                <div>
                  <SubTitleInfoBarber>Data de início:</SubTitleInfoBarber>
                  <InfoBarber>{formateData(elem.hiring_date)}</InfoBarber>
                </div>
              </ContainerBarber>
              <SubTitleInfoBarber>Especialidades:</SubTitleInfoBarber>
              <ContainerBarber>
                {elem.specialties.length === 0 ? (
                  <Specialties>Referencie uma especialidade</Specialties>
                ) : (
                  <ContainerBarber>
                    {elem.specialties.map((elem) => (
                      <Specialties>{elem.name}</Specialties>
                    ))}
                  </ContainerBarber>
                )}
              </ContainerBarber>
            </CardBarber>
          ))}
        </ContainerCardBarber>
        <SubTitle>Tipos de serviço</SubTitle>
        <ContainerSpecialties>
          {specialties.map((elem) => (
            <CardSpecialties>{elem.name}</CardSpecialties>
          ))}
        </ContainerSpecialties>

        {/*         <SubTitle>Referenciar especialidades</SubTitle>
        {barber.map((elem) => (
          <>{elem.name}</>
        ))}
        <SubTitle>Liberar horários de serviço</SubTitle> */}
      </Container>
    </Body>
  );
};
