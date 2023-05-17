import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRouter } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import ChatInput from "../components/ChatInput";

export default function Chat() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if(!localStorage.getItem("chat-app-user")) {
        navigate("/sign-in");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
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

  function handleChatChange(chat) {
    setCurrentChat(chat);
  }

  return(
    <Container>
      <div className="container">
        <Contacts 
          contacts={contacts} 
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {
          isLoaded && currentChat === undefined ?
            <Welcome 
              currentUser={currentUser}
            /> 
          :
            <ChatContainer 
              currentChat={currentChat}
            />
        }
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