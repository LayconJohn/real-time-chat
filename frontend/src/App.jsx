import React from "react";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Chat from "./pages/Chat";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SetAvatar from "./pages/SetAvatar";

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/set-avatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
      </Routes>

    </BrowserRouter>
  );
}