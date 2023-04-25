import styled from "styled-components";

export const CardList = styled.div`
  display: flex;
  width: 90%;
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
