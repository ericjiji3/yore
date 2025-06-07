"use client";
import Image from "next/image";
import Folder from "@/public/images/folder-icon.png";
import "./Intro.css";
import { useState } from "react";

export default function Intro() {
    const [hideIntro, setHideIntro] = useState(false);
    const handleClick = () => {
        setHideIntro(true);
    }
  return (
    <div className={`intro-container ${hideIntro ? "hide-intro" : ""}`}>
        <Image src={Folder} alt="folder-icon" width={200} height={163} onClick={handleClick}/>
    </div>
  )
}