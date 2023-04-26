import {
  DivContainer,
  CardList,
  DivTable,
  ContentItemsTable,
  TextTitleTable,
  TextItems,
} from "./styles";
import { useState, useEffect, useCallback } from "react";
import Api from "../../services";
import PopoverCancel from "../popoverCancel";
import PopoverFinished from "../../popoverFinished";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SeeAppointments = () => {
  const [list, setList] = useState([]);
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

  useEffect(() => {
    Api.get(`schedule/${token.user.id}`)
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
        toast.error(
          "Não é possível cancelar antes de 2 horas de antecedência!",
          {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
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
    let minutes = date.getMinutes();
    if (minutes === 0) {
      minutes = "00";
    }

    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  }
  return (
    <DivContainer>
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
      {list.map((elem, index) => {
        return (
          <>
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
          </>
        );
      })}
      <ToastContainer />
    </DivContainer>
  );
};
