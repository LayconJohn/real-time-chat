import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function SignUp() {
    //const [username, setUsername] = useState(undefined);

    function handleSubmit(e) {
        e.preventDefault()
    }

    function handleChange(e) {

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
                        name="usuário"
                        onChange={e => setChange(e)}
                    />
                    <input 
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={e => setChange(e)}
                    />
                    <input 
                        type="password"
                        placeholder="Senha"
                        name="password"
                        onChange={e => setChange(e)}
                    />
                    <input 
                        type="password"
                        placeholder="Confirmar Senha"
                        name="confirmPassword"
                        onChange={e => setChange(e)}
                    />
                    <button type="submit">Criar Usuário</button>
                    <span>Já possui uma conta? <Link to="/sign-in">Login</Link>  </span>
                </form>
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







