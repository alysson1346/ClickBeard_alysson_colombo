import { ButtonColor } from "./style";

export const Button = ({ children, onClick }) => {
  return (
    <>
      <ButtonColor onClick={onClick}>{children}</ButtonColor>
    </>
  );
};
