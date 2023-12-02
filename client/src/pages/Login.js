import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Handle inputs of the form
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://blog-backend-fwlq.onrender.com/api/v1/user/login",
        {
          email: inputs.email,
          password: inputs.password,
        }
      );
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User logged in successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={"50px"}
          boxShadow={"10px 10px 20px #ccc"}
          borderRadius={"10px"}
          padding={3}
        >
          <Typography variant="h3" textAlign={"center"} padding={3}>
            Login
          </Typography>
          <TextField
            placeholder="email"
            value={inputs.email}
            onChange={handleChange}
            name="email"
            margin="normal"
            type="email"
            required
          />
          <TextField
            placeholder="password"
            value={inputs.password}
            onChange={handleChange}
            name="password"
            margin="normal"
            type="password"
            required
          />
          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not a User? Please Register!
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
