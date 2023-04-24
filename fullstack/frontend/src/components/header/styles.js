import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const Logo = styled.h1`
  max-width: 150px;
  color: white;
`;
