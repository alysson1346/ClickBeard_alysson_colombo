import styled from "styled-components";

export const Body = styled.body`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
`;

export const SubTitle = styled.h2`
  text-align: left;
`;

export const CardBarber = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e7e7e7;
  margin-bottom: 20px;
  padding-bottom: 10px;
  max-width: 300px;
  min-width: 300px;
`;

export const ContainerBarber = styled.div`
  display: flex;
  flex-direction: row;
`;

export const NameBarber = styled.p`
  margin: 0;
  padding: 10px;
  font-size: 20px;
  font-weight: 700;
  border-bottom: 1px solid black;
`;

export const SubTitleInfoBarber = styled.p`
  margin: 0;
  padding: 10px 10px 0 10px;
  font-weight: 600;
`;

export const InfoBarber = styled.p`
  margin: 0;
  padding: 0 0 0 10px;
`;

export const Specialties = styled.p`
  margin: 0;
  margin-left: 10px;
  padding: 5px;
  border-radius: 10px;
  background-color: #c5c5c5;
`;

export const ContainerCardBarber = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

export const CardSpecialties = styled.div`
  padding: 10px;
  background-color: #e7e7e7;
`;
export const ContainerSpecialties = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
`;
