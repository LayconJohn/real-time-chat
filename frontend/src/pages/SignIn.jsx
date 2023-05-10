import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { signInRouter } from "../utils/APIRoutes";

export default function SignIn() {

    const navigate = useNavigate();
    const toastOptions = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };
  
    const [valuesForm, setValuesForm] = useState({
      username: "",
      password: ""
    });
  
    async function handleSubmit(e) {
      e.preventDefault();
      if(handleValidation()) {
        const {username, password} = valuesForm;
        const { data } = await axios.post(signInRouter, {
          username, password
        })
        if (!data) {
          toast.error(data.message, toastOptions);
        }
        localStorage.setItem("chat-app-user", JSON.stringify({ username: data.username, email: data.email }))
        toast("Login Realizado!", toastOptions);
        navigate("/")
        //console.log(data);
      }
      
    }

    function handleChange(e) {
      setValuesForm({...valuesForm, [e.target.name]: e.target.value});
    }

    function handleValidation() {
      const {username, password} = valuesForm;
      if (password === "") { 
        toast.error('Usuário e senha são obrigatóriosv', toastOptions);
        return false;
      }
      if (username === "") {
        toast.error('Usuário e senha são obrigatórios', toastOptions);
        return false;
      }
      return true;
    }
  
    return(
        <>
          <FormConteiner>
              <form onSubmit={(event) => handleSubmit(event)}>
                  <div className="brand"> 
                      <img src={Logo} alt="Logo" />
                  </div>
                  <input 
                      type="text"
                      placeholder="Usuário"
                      name="username"
                      onChange={e => handleChange(e)}
                      min="3"
                  />
                  <input 
                      type="password"
                      placeholder="Senha"
                      name="password"
                      onChange={e => handleChange(e)}
                  />
                  <button type="submit">Entrar</button>
                  <span>Não possui uma conta? <Link to="/sign-up">Cadastre-se</Link>  </span>
              </form>
              <ToastContainer />
          </FormConteiner>

        </>
  );
}

const FormConteiner = styled.div`
  height:100vh;
  width:100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    
    img {
      height: 15rem;
      border-radius: 2rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    margin-bottom: 4rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem; 
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;

      &:focus{
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
      &:active{
        scale: 1.1;
      }
    }

    span {
      color: white;
      text-transform: uppercase;
      a{
        color: #4e0eff;
        text-transform: none;
        font-weight: bold;
      }
    }

  }
`;