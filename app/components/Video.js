"use client";
import "./Video.css";
import VideoIcon from "@/public/images/video-icon.png";
import VideoIconOn from "@/public/images/video-icon-on.png";
import Image from "next/image";
import { useState } from "react";

export default function Video() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="video-container icon-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
          <Image 
            src={isHovered ? VideoIconOn : VideoIcon} 
            alt="video-icon" 
            width={300} 
          />
        </div>
    )
}