'use client';
import Blogs from "./components/Blogs";
import { useState } from "react";
import Image from "next/image";
import ShoppingIcon from '@/public/images/shopping-icon.png';
import BlogIcon from '@/public/images/blog-icon.png';
import MailIcon from '@/public/images/mail-icon.png';
import LightIcon from '@/public/images/light-icon.png';
import styles from './home.css';

export default function Home() {
  const [showBlogs, setShowBlogs] = useState(false);
  const handleClick = () => {
    setShowBlogs(true);
  }
  return (
    <div className="home-container">
      <div className="icons-container">
        <div className="shopping-container icon-container">
          <Image src={ShoppingIcon} alt="shopping-icon" width={300} />
        </div>
        <div className="blog-container icon-container">
          <Image src={BlogIcon} alt="blog-icon" width={250} onClick={handleClick}/>
        </div>
        <div className="video-container icon-container">
          <Image src={BlogIcon} alt="blog-icon" width={250}/>
        </div>
        <div className="light-container icon-container">
          <Image src={LightIcon} alt="mail-icon" width={250}/>
        </div>  
        <div className="mail-container icon-container">
          <Image src={MailIcon} alt="mail-icon" width={400}/>
        </div>
      </div>
      {showBlogs && <Blogs />}
      

    </div>
  );
}
