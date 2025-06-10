'use client';
import { useState } from "react";
import "./Contact.css";
import Image from "next/image";
import MailIcon from '@/public/images/mail-icon.png';
import ContactHome from '@/public/images/contact-home.jpg';
import ContactInstagram from '@/public/images/contact-ig.png';
import ContactYouTube from '@/public/images/contact-youtube.png';

export default function Contact() {
    const [showContact, setShowContact] = useState(false);
    return (
      <div className="mail-container icon-container">
        <Image src={MailIcon} alt="mail-icon" width={400} onClick={() => setShowContact(!showContact)}/>
        <div className={`contact-form ${showContact ? "active" : ""}`}>
            <div className="top-bar">
                <div className="red-circle"></div>
                <div className="yellow-circle"></div>
                <div className="green-circle"></div>
            </div>
            <div className="form-container">
                <div className="icon-links">
                    <div className="contact-icon-container">
                        <div className="shiny-bar"></div>
                        <Image src={ContactHome} alt="mail-icon" width={40} height={40}/>
                        <p>Home</p>
                    </div>
                    <div className="contact-icon-container">
                    <div className="shiny-bar"></div>
                        <Image src={ContactInstagram} alt="mail-icon" width={40} height={40}/>
                        <p>Instagram</p>
                    </div>
                    <div className="contact-icon-container">
                    <div className="shiny-bar"></div>
                        <Image src={ContactYouTube} alt="mail-icon" width={40} height={40}/>
                        <p>YouTube</p>
                    </div>
                </div>
                <form>
                    <div className="input-group">
                        <label>To</label>
                        <input type="text" placeholder="To" />
                    </div>
                    <div className="input-group">
                        <label>Name</label>
                        <input type="text" placeholder="Name" />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" placeholder="Email" />
                    </div>
                    
                    <div className="input-group">
                    <label>Subject</label>
                    <input type="email" placeholder="Subject" value="yoreartisanworks@gmail.com"/>
                    </div>
                    <textarea rows="4" cols="50">
                    Enter Message Here...
                    </textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
            
        </div>
      </div>
    )
}