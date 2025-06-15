'use client'   

import Image from "next/image";
import LightIcon from '@/public/images/light-icon-off.png';
import { useState } from "react";
import { useEffect } from "react";

export default function LightPole() {
    const [isActive, setIsActive] = useState(false);
    return (
            
        <div className="light-container icon-container">
          <Image src={LightIcon} alt="mail-icon" width={250} onClick={() => setIsActive(!isActive)}/>
          <div className={`light light-1 ${isActive ? 'active' : ''}`}></div>
          <div className={`light light-2 ${isActive ? 'active' : ''}`}></div>
        </div>  
    )
}