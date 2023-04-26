import {
  DivContainer,
  CardList,
  DivTable,
  ContentItemsTable,
  TextTitleTable,
  DataInput,
  TextItems,
  DivFilterAndBtn,
  Button,
  ContainerCard,
} from "./styles";
import { useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import Api from "../../services";
import PopoverCancel from "../popoverCancel";
import PopoverFinished from "../../popoverFinished";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ConsultAppointments = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState([]);
  const token = JSON.parse(localStorage.getItem("@UserAuthorization:token"));

  const updateItem = useCallback(
    (id, updatedItem) => {
      setList((prevItems) => {
        return prevItems.map((item) => {
          if (item.id === id) {
            return { ...item, ...updatedItem };
          } else {
            return item;
          }
        });
      });
    },
    [setList]
  );

  const searchSchedule = (data) => {
    const dd = data.slice(8, 10);
    const mm = data.slice(5, 7);
    const yyyy = data.slice(0, 4);
    const fullDate = `${dd}-${mm}-${yyyy}`;

    Api.get(`/schedule/get/filter/${fullDate}`)
      .then((res) => {
        setList(res.data);
        return toast.success("Consulta gerada!", {
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

  const cancelAppointment = (id) => {
    Api.patch(`/schedule/cancel/${id}`)
      .then((res) => {
        updateItem(id, res.data);
        return toast.success("Cancelado!", {
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

  const finishAppointment = (id) => {
    Api.patch(`/schedule/finished/${id}`)
      .then((res) => {
        updateItem(id, res.data);
        return toast.success("Concluído!", {
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

  function extractDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  }
  return (
    <DivContainer>
      <DivFilterAndBtn>
        <DataInput
          type="date"
          id="date"
          name="date"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => searchSchedule(search)}>
          <FaSearch />
        </Button>
      </DivFilterAndBtn>

      <DivTable>
        <ContentItemsTable>
          <TextTitleTable>Barbeiro/Serviço</TextTitleTable>
        </ContentItemsTable>
        <ContentItemsTable>
          <TextTitleTable>Cliente</TextTitleTable>
        </ContentItemsTable>
        <ContentItemsTable>
          <TextTitleTable>Data</TextTitleTable>
        </ContentItemsTable>
        <ContentItemsTable>
          <TextTitleTable>Status</TextTitleTable>
        </ContentItemsTable>
      </DivTable>
      <ContainerCard>
        {list.map((elem, index) => {
          return (
            <CardList number={index}>
              <ContentItemsTable>
                <TextItems>
                  {elem.barber.name} - {elem.specialty.name}
                </TextItems>
              </ContentItemsTable>
              <ContentItemsTable>
                <TextItems>{elem.user.name}</TextItems>
              </ContentItemsTable>
              <ContentItemsTable>
                <TextItems>{extractDateTime(elem.date_time)}</TextItems>
              </ContentItemsTable>
              <ContentItemsTable>
                <>
                  {elem.status === "Concluído" ||
                  elem.status === "Cancelado" ? (
                    <TextItems>{elem.status}</TextItems>
                  ) : (
                    <>
                      <TextItems>{elem.status}</TextItems>
                      <PopoverCancel
                        onClick={() => cancelAppointment(elem.id)}
                      />
                      <PopoverFinished
                        onClick={() => finishAppointment(elem.id)}
                      />
                    </>
                  )}
                </>
              </ContentItemsTable>
            </CardList>
          );
        })}
      </ContainerCard>
      <ToastContainer />
    </DivContainer>
  );
};
