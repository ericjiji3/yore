'use client';
import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import "./Contact.css";
import Image from "next/image";
import MailIcon from '@/public/images/mail-icon.png';
import ContactHome from '@/public/images/contact-home.png';
import ContactInstagram from '@/public/images/contact-ig.png';
import ContactYouTube from '@/public/images/contact-youtube.png';
import RedCircle from '@/public/images/red-circle.png';
import YellowCircle from '@/public/images/yellow-circle.png';
import GreenCircle from '@/public/images/green-circle.png';
import SendButton from '@/public/images/send-button.png';

export default function Contact() {
    const [showContact, setShowContact] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [initial, setInitial] = useState({
        position: 'fixed',
        left: `50%`,
        top: `${position.y}px`
      
    });
    const [isDragging, setIsDragging] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const formRef = useRef(null);
    const buttonRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({
        name: false,
        email: false
    });

    const centerForm = () => {
        if (formRef.current) {
            const formRect = formRef.current.getBoundingClientRect();
            console.log(formRect.width);
            if(window.innerWidth < 768){
                const centerX = ((window.innerWidth - (formRect.width ))/2);
                const centerY = ((window.innerHeight - formRect.height) / 2);
                setPosition({ x: centerX, y: centerY });
            }else{
                const centerX = ((window.innerWidth - (formRect.width ))/2);
                const centerY = ((window.innerHeight - formRect.height) / 2);
                setPosition({ x: centerX, y: centerY });
            }
           
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update the formData state
        setFormData((prevData) => {
            const updatedData = { ...prevData, [name]: value };

            return updatedData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('buitton submitted');
        emailjs.sendForm(process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID, process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID, formRef.current, {
            publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
        })
        .then(
            (result) => {
                console.log('SUCCESS!', result.text);
                setSubmitted(true);
            },
            (error) => {
                console.log('FAILED...', error);
            },
        );
    };


    // Initial centering
    // useEffect(() => {
    //     const initialCenter = () => {
    //         // Wait for the form to be rendered
    //         setTimeout(() => {
    //             if (formRef.current) {
    //                 const formRect = formRef.current.getBoundingClientRect();
    //                 const centerX = Math.max(0, (window.innerWidth - formRect.width) / 2);
    //                 const centerY = Math.max(0, (window.innerHeight - formRect.height) / 2);
    //                 setPosition({ x: centerX, y: centerY });
    //             }
    //         }, 0);
    //     };
    //     initialCenter();
    // }, []);

    useEffect(() => {
        const handleResize = () => {
            if (showContact) {
                centerForm();
            }
        };

        window.addEventListener('resize', centerForm);
        return () => {
            window.removeEventListener('resize', centerForm);
        };
    }, [showContact]);

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
            centerForm();
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
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="input-container">
                    <div className="input-group">
                        <label>To</label>
                        <input type="text" placeholder="To" value="yoreartisanworks@gmail.com" readOnly/>
                    </div>
                    <div className="input-group">
                        <label>Name</label>
                        <input type="text" placeholder="Name" name="name" onChange={handleInputChange} required/>
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" placeholder="Email" name="email" onChange={handleInputChange} required/>
                    </div>
                    
                    <div className="input-group last">
                        <label>Subject</label>
                        {/* value="yoreartisanworks@gmail.com" */}
                        <input type="text" placeholder="Subject" name="subject" onChange={handleInputChange} required/>
                    </div>
                    </div>
                    <div className="input-group">
                        <textarea rows="4" cols="50" placeholder="Enter Message Here..." name="message" onChange={handleInputChange}>
                        
                        </textarea>
                    </div>
                    <div className="bottom-bar">
                        <button className={submitted ? "disabled" : ""} disabled={submitted} type="submit" ref={buttonRef}>Send</button>
                        <div className={submitted ? "status-success active" : "status-success"}>Email Sent</div>
                    </div>
                    
                </form>
            </div>
            
        </div>
      </div>
    )
}