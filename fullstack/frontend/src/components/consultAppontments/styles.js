import styled from "styled-components";

export const CardList = styled.div`
  display: flex;
  width: 100%;
  background-color: ${(props) =>
    props.number % 2 === 0
      ? props.theme.colors.column.even
      : props.theme.colors.column.odd};
  flex-direction: row;
  justify-content: space-between;
`;

export const DivContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const DivTable = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.secondary};
`;

export const ContentItemsTable = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
`;

export const TextTitleTable = styled.h3``;

export const TextItems = styled.p`
  padding: 5px;
  margin: 0;
`;

export const DataInput = styled.input`
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #0077cc;
    box-shadow: 0 0 0 2px rgba(0, 119, 204, 0.2);
  }
`;

export const DivFilterAndBtn = styled.div`
  justify-content: flex-start;
  display: flex;
  flex-direction: row;
`;
export const Button = styled.button`
  background-color: black;
  color: white;
`;

export const ContainerCard = styled.div`
  width: 90% !important;
`;
