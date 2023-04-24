import React, { useState } from "react";
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../../services";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../providers/authenticad";
import { Link, DivButton } from "./styles";

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  width: "300px",
  margin: "auto",
}));

export const CreateAccountForm = () => {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const is_admin = false;
  const data = { name, email, password, is_admin };
  const history = useHistory();

  const handleLogin = (data) => {
    Api.post("user", data)
      .then((res) => {
        return (
          toast.success("Conta criada!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }) &&
          setTimeout(() => {
            history.push("/");
          }, 2000)
        );
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <LoginPaper>
        <Typography variant="h4" align="center" gutterBottom>
          Crie sua conta
        </Typography>
        <TextField
          id="name"
          label="Nome"
          variant="outlined"
          margin="normal"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Senha"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <DivButton>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleLogin(data);
            }}
          >
            Entrar
          </Button>

          <Link
            onClick={() => {
              history.push("/");
            }}
          >
            Fazer Login
          </Link>
        </DivButton>
      </LoginPaper>

      <ToastContainer />
    </Box>
  );
};
