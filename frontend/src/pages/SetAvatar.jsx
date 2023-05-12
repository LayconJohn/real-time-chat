import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import loader from "../assets/loader.gif";
import { setAvatarRouter } from "../utils/APIRoutes";
import { Buffer } from "buffer";

export default function SetAvatar() {
    const api = `https://api.multiavatar.com`;
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

    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    async function setProfilePicture() {
        if(selectedAvatar===undefined) {
            toast.error("Por favor selecione um avatar");
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const { data } = await axios.post(`${setAvatarRouter}/${user._id}`,{
                image: avatars[selectedAvatar],
            });

            if(data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate("/");
            } else {
                toast.error("Erro ao selecionar o avatar. Por favor, tente novamente", toastOptions);
            }
        }
    }

    useEffect(() => {
        async function fetchData() {
            const data = [];
            for(let i = 0; i<4;i++) {
                //const images = ["7dfcbb86a8404459a6", "f9df3b008a8fea8af4", "dcca6052cc824552d9", "0caa4cbffd2694e651"]
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                //const image = await axios.get(`${api}/${images[i]}`);
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return (
        <>
            {
                isLoading 
                ? 
                <Container>
                    <img src={loader} alt="loader" className="loader"/>
                </Container>
                :
                <Container>
                    <div className="title-container">
                        <h1>Escolha um avatar para a seu perfil</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((avatar, i) => {
                            return (
                                <div className={`avatar ${selectedAvatar === i ? "selected" : ""}`}  key={i}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" 
                                        onClick={() => setSelectedAvatar(i)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <button className="submit-button" onClick={setProfilePicture}>Escolher avatar</button>
                </Container>
            }

           <ToastContainer />
        </>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324; 
    height: 100vh;
    width: 100vw;

    .loader{
        max-inline-size: 100%;

    }

    .title-container{
        h1{
            color: white;
        }
    }

    .avatars{
        display: flex;
        gap: 2rem;
        .avatar{
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img{
                height:6rem;
            }
        }
        .selected{
            border: 0.4rem solid #4e0eff;
        }
    }

    .submit-button{
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
`;