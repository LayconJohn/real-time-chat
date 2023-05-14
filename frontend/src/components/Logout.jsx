import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { BiPowerOff } from "react-icons/bi"

export default function Logout() {
    const navigate = useNavigate();
    
    async function handleLogout() {
        localStorage.clear();
        navigate("/sign-in")
    }

    return(
        <Button onClick={handleLogout}>
            <BiPowerOff />
        </Button>
    )
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    cursor: pounter;
    border: none;
    &:hover{
        scale: 1.1;
    }
    &:active{
        transform: translateY(0.4rem);
    }
    svg{
        font-size: 1.3rem;
        color: #ebe7ff;
    }
`;