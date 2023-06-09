import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import Messages from './Messages';
import axios from 'axios';
import { sendMessageRoute } from '../utils/APIRoutes';
import { getAllMessageRouter } from '../utils/APIRoutes';

export default function ChatContainer({ currentChat, currentUser }) {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.post(getAllMessageRouter, {
                from: currentUser._id,
                to: currentChat._id
            });
            setMessages(response.data);
        }
        fetchData();
    }, [currentChat]);

    async function handleSendMessage(message) {
        const data = await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: message
        });
    }

    return(
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentChat ? currentChat.avatarImage : ""}`} alt="avatar" />
                    </div>
                    <div className="username">
                        <h3>{currentChat ? currentChat.username : "Usuário"}</h3>
                    </div>
                </div>
                <Logout />
            </div>
            <div className="chat-messages">
                {
                    messages.map(message => {
                        return (
                            <div>
                                <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                    <div className="content">
                                        <p>
                                            {message.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <ChatInput handleSendMessage={handleSendMessage} />
        </Container>
    );
}

const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 10% 75% 12%;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-auto-rows: 15% 70% 15%;
    } 
    .chat-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem;

        .user-details{
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar{
                img{
                    height: 3rem;
                }
            }
            .username{
                h3{
                    color: white;
                }
            }
        }
    }    

    .chat-messages {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;

        .message{
            display: flex;
            align-items: center;
            .content {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
            }
        }

        .sended {
            justify-content: flex-end;
            .content {
                background-color: #4f04ff21;
            }
        }

        .recieved {
            justify-content: flex-start;
            .content {
                background-color: #9900ff20;
            }
        }
    }
`;