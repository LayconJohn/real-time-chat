import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRouter } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";

export default function Chat() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      if(!localStorage.getItem("chat-app-user")) {
        navigate("/sign-in");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        console.log(currentUser);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const { data } = await axios.get(`${allUsersRouter}/${currentUser.id}`);
          setContacts(data)
        } else {
          navigate("/set-avatar");
        }
      }
    }
    fetchData();
  }, [currentUser]);

  return(
    <Container>
      <div className="container">
        <Contacts 
          contacts={contacts} 
          currentUser={currentUser}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;

  .container{
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    } 
  }
`;