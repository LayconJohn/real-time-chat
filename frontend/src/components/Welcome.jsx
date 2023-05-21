import React from "react";
import styled from "styled-components";
import robot from "../assets/robot.gif";

export default function Welcome({ currentUser }) {
    return(
        <Container>
            <img src={robot} alt="Hello" />
            <h1>
                Welcome, <span>{currentUser ? currentUser.username : ""}</span>
            </h1>
            <h3>
                Por favor, selecione um chat para começar...
            </h3>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img {
        height: 20rem;
    }
    span {
        color: #4e00ff;
    }
`;