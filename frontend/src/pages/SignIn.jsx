import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function SignIn() {
    //const [username, setUsername] = useState(undefined);

    function handleSubmit(e) {
        e.preventDefault()
    }

    function handleChange(e) {

    }
  
    return(
        <>
            <formConteiner>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div> 
                        <img src="" alt="" />
                    </div>
                    <h1>Fala comigo BB</h1>
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

                    <button type="submit">Criar Usuário</button>
                    <span>Já possui uma conta? <Link to="/sign-in">Login</Link>  </span>
                </form>
            </formConteiner>
        </>
  );
}

const formConteiner = styled.div`

`;