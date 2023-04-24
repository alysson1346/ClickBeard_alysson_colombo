import styled from "styled-components";

export const ButtonColor = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  border-style: none;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
