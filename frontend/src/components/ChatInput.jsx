import React, { useState } from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({ handleSendMessage }) {
    const [showEmojiPicker, setEmojiPicker] = useState(false);
    const [message, setMessage] = useState("");

    function handleEmojiPicker(){
        setEmojiPicker(!showEmojiPicker);
    }

    function handleEmojiClick(emojiObject, event){
        let msg = message;
        msg += emojiObject.emoji;
        setMessage(msg);
    }

    function handleSendChat(e) {
        e.preventDefault();
        if (message.length > 0) {
            handleSendMessage(message);
            setMessage('');
        }
    }

    return(
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPicker}/>
                    <div className="emoji-picker-react">
                        {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
                    </div>    
                </div>
            </div>
            <form className="input-container" onSubmit={(e) => handleSendChat(e)}>
                <input 
                    type="text" 
                    placeholder="Escreva a sua mensagem..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}    
                />
                <button className="submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #080420;
    padding: 0 2rem;
    padding bottom: 0.3rem;

    .button-container{
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji {
            position: relative;
            svg{
                font-size: 1.5rem;
                color: #ffff00c7;
                cursor: pointer;
            }
            .emoji-picker-react {
                position: absolute;
                top: -470px;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9186f3;
                .emoji-scroll-wrapper::-webkit-scrollbar {
                    background-color: #080420;
                    width: 5px;
                    &-thumb{
                        background-color: #9186f3;
                    }
                }
                .emoji-categories{
                    button{
                        filter: contrast(0);
                    }
                }
                .emoji-search{
                    background-color: transparent;
                    border-color: #9186f3;
                }
                .emoji-group:before{
                    background-color: #080420;
                }
            }
        }
    }

    .input-container{
        width: 100%;
        border-radius: 2rem; 
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: #ffffff34;

        input {
            width: 80%;
            height: 65%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.3rem;
            &::selection {
                background-color: #9186f3;
            }
            &:focus {
                outline: none;
            }
        }

        button{
             padding: 0.3rem 2rem;
             border-radius: 2rem;
             display: flex;
             justify-content: center;
             align-items: center;
             background-color: #9a86f3;
             border: none;
             cursor: pointer;
             svg {
                font-size: 2rem;
                color: white;
             }
        }
    }
`;