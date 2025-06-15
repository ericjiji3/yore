'use client';
import { useState, useRef, useEffect } from 'react';
import "./Contact.css";
import Image from "next/image";
import MailIcon from '@/public/images/mail-icon.png';
import ContactHome from '@/public/images/contact-home.jpg';
import ContactInstagram from '@/public/images/contact-ig.png';
import ContactYouTube from '@/public/images/contact-youtube.png';
import RedCircle from '@/public/images/red-circle.png';
import YellowCircle from '@/public/images/yellow-circle.png';
import GreenCircle from '@/public/images/green-circle.png';
import SendButton from '@/public/images/send-button.png';

export default function Contact() {
    const [showContact, setShowContact] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const formRef = useRef(null);

    const centerForm = () => {
        if (formRef.current) {
            const formRect = formRef.current.getBoundingClientRect();
            const centerX = Math.max(0, (window.innerWidth - formRect.width) / 2);
            const centerY = Math.max(0, (window.innerHeight - formRect.height) / 2);
            setPosition({ x: centerX, y: centerY });
        }
    };

    // Initial centering
    useEffect(() => {
        const initialCenter = () => {
            // Wait for the form to be rendered
            setTimeout(() => {
                if (formRef.current) {
                    const formRect = formRef.current.getBoundingClientRect();
                    const centerX = Math.max(0, (window.innerWidth - formRect.width) / 2);
                    const centerY = Math.max(0, (window.innerHeight - formRect.height) / 2);
                    setPosition({ x: centerX, y: centerY });
                }
            }, 0);
        };
        initialCenter();
    }, []);

    // Resize handling
    useEffect(() => {
        const handleResize = () => {
            if (showContact) {
                centerForm();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [showContact]);

    // Center form when it becomes visible
    useEffect(() => {
        if (showContact) {
            setTimeout(centerForm, 0);
        }
    }, [showContact]);

    const handleMouseDown = (e) => {
        if (e.target.closest('.top-bar')) {
            setIsDragging(true);
            setDragOffset({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleRedCircleClick = (e) => {
        e.stopPropagation(); // Prevent the click from triggering the form's mouseDown
        setShowContact(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    return (
      <div className="mail-container icon-container">
        <Image src={MailIcon} alt="mail-icon" width={400} onClick={() => setShowContact(!showContact)}/>
        <div 
            className={`contact-form ${showContact ? "active" : ""}`}
            ref={formRef}
            style={{
                position: 'fixed',
                left: `${position.x}px`,
                top: `${position.y}px`
              
            }}
            onMouseDown={handleMouseDown}
        >
            <div className="top-bar">
                <div className="red-circle circle" onClick={handleRedCircleClick}><Image src={RedCircle} alt="red-circle" width={15} height={15}/></div>
                <div className="yellow-circle circle"><Image src={YellowCircle} alt="yellow-circle" width={15} height={15}/></div>
                <div className="green-circle circle"><Image src={GreenCircle} alt="green-circle" width={15} height={15}/></div>
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
                    <div className="input-container">
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
                    
                    <div className="input-group last">
                        <label>Subject</label>
                        {/* value="yoreartisanworks@gmail.com" */}
                        <input type="email" placeholder="Subject"/>
                    </div>
                    </div>
                    <div className="input-group">
                        <textarea rows="4" cols="50" placeholder="Enter Message Here...">
                        
                        </textarea>
                    </div>
                    <div className="bottom-bar">
                        <button type="submit">Send</button>
                        <div className="progress-bar"></div>
                    </div>
                    
                </form>
            </div>
            
        </div>
      </div>
    )
}