import { useState, useEffect } from "react";
import {
  Container,
  DivRow,
  Title,
  SubTitle,
  Text,
  DivHorary,
  DataInput,
  Button,
  ButtonCalendary,
  DivTimes,
  BtnReset,
} from "./styles";
import Api from "../../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Schedule = () => {
  const token = JSON.parse(localStorage.getItem("@UserAuthorization:token"));

  const [servicesState, setServicesState] = useState(true);
  const [barberState, setBarberState] = useState(false);
  const [horaryState, setHoraryState] = useState(false);

  const [service, setService] = useState("");
  const [barbers, setBarbers] = useState("");
  const [barberId, setBarberId] = useState("");
  const [barber, setBarber] = useState([]);

  const [listSpecialties, setListSpecialties] = useState([]);
  const [dateList, SetDateList] = useState([]);
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [idAvaliable, setIdAvaliable] = useState("");

  const filter = listSpecialties.filter((elem) => elem.attributed === true);

  useEffect(() => {
    Api.get("specialty")
      .then((res) => {
        setListSpecialties(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getBarbers = (specialty) => {
    console.log(specialty);
    Api.get(`/barber/${specialty}`)
      .then((res) => {
        setBarber(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getDate = (date) => {
    const arr = [];
    Api.get(`/avaliable-times/${date}`)
      .then((res) => {
        const result = res.data[0];
        setIdAvaliable(result.id);
        Object.entries(result).map(([key, value]) => {
          if (value === true) {
            arr.push(key);
          }
        });
        SetDateList(arr);
      })
      .catch((err) => console.log(err));
  };

  const resetStates = () => {
    setServicesState(true);
    setBarberState(false);
    setHoraryState(false);
    SetDateList([]);
    setService("");
    setBarbers("");
    setDate("");
    setHour("");
  };

  const request = () => {
    const dateReq = `${date}T${hour}`;

    const req = new Object();
    req.user_email = token.user.email;
    req.barber_id = barberId;
    req.specialty_id = service.id;
    req.avaliable_time_id = idAvaliable;
    req.date_time = dateReq;
    console.log(req);

    Api.post("/schedule", req)
      .then((res) => {
        resetStates();
        setHoraryState(false);
        return toast.success("Agendado!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error("Ops, algo deu errado!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <Container>
      <Title>Faça um novo agendamento</Title>

      {servicesState ? (
        <Container>
          <SubTitle>Escolha o serviço:</SubTitle>
          <DivRow>
            {filter.map((elem) => {
              return (
                <Button
                  onClick={() => {
                    setServicesState(false);
                    setBarberState(true);
                    setService(elem);
                    getBarbers(elem.name);
                  }}
                >
                  {elem.name}
                </Button>
              );
            })}
          </DivRow>
        </Container>
      ) : barberState ? (
        <Container>
          <SubTitle>Serviço escolhido:</SubTitle>

          <Text>{service.name}</Text>

          <SubTitle>Escolha o Barbeiro:</SubTitle>
          <DivRow>
            {barber.map((elem) => {
              return (
                <Button
                  onClick={() => {
                    setBarberState(false);
                    setHoraryState(true);
                    setBarbers(elem.name);
                    setBarberId(elem.id);
                  }}
                >
                  {elem.name}
                </Button>
              );
            })}
          </DivRow>
        </Container>
      ) : horaryState ? (
        <Container>
          <SubTitle>Serviço escolhido:</SubTitle>
          <Text>{service.name}</Text>

          <SubTitle>Barbeiro Escolhido:</SubTitle>
          <Text>{barbers}</Text>

          <SubTitle>Selecione a data do serviço:</SubTitle>

          <DivHorary>
            <DataInput
              type="date"
              id="data"
              name="data"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <ButtonCalendary
              onClick={() => {
                getDate(date);
              }}
            >
              Verificar horários
            </ButtonCalendary>
          </DivHorary>
          <SubTitle>Escolha o horário:</SubTitle>
          <DivTimes>
            {dateList.length === 0 ? (
              <h4>Nenhum horário disponível</h4>
            ) : (
              <>
                {" "}
                {dateList.map((elem) => {
                  return (
                    <Button
                      onClick={() => {
                        setHour(elem);
                        setHoraryState(false);
                      }}
                    >
                      {elem}
                    </Button>
                  );
                })}
              </>
            )}
          </DivTimes>
        </Container>
      ) : (
        <Container>
          <SubTitle>Serviço escolhido:</SubTitle>
          <Text>{service.name}</Text>

          <SubTitle>Barbeiro Escolhido:</SubTitle>
          <Text>{barbers}</Text>

          <SubTitle>Data escolhida:</SubTitle>
          <Text>{`${hour}hrs ${date.slice(8, 10)}/${date.slice(5, 7)}`}</Text>

          <div className="btnconfirm">
            <Button onClick={() => request()}>Agendar</Button>
          </div>
        </Container>
      )}
      <BtnReset
        onClick={() => {
          resetStates();
        }}
      >
        Resetar
      </BtnReset>
      <ToastContainer />
    </Container>
  );
};
