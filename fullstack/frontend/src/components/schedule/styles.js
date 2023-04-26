import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .btnconfirm {
    margin-top: 15px;
  }
`;
export const DivRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;

export const Text = styled.p`
  text-align: center;
  background-color: green;
  color: white;
  padding: 8px;
  max-width: 150px;
  margin: 0;
`;

export const Button = styled.button`
  text-align: center;
  background-color: #f000;
  color: black;
  padding: 10px;
  max-width: 150px;
  margin: 0;

  :hover {
    cursor: pointer;
    color: white;
    background-color: black;
  }
`;
export const ButtonCalendary = styled.button`
  background: black;
  color: white;
  :hover {
    cursor: pointer;
  }
`;
export const BtnReset = styled.button`
  background-color: black;
  color: white;
  margin-top: 20px;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const SubTitle = styled.h2`
  text-align: center;
`;

export const DivContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const DataInput = styled.input`
  border: 1px solid gray;
  padding: 10px;
  font-size: 16px;
`;
export const DivHorary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 200px;
  max-width: 500px;
`;

export const DivTimes = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: row;
  width: 500px;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`;
