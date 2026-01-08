import Blogs from "./components/Blogs";
import Image from "next/image";
import ShoppingIcon from '@/public/images/shopping-icon.png';
import LightPole from "./components/LightPole";
import BlogIcon from '@/public/images/blog-icon.png';
import MailIcon from '@/public/images/mail-icon.png';
import LightIcon from '@/public/images/light-icon-off.png';
import VideoIcon from '@/public/images/video-icon.png';
import styles from './home.css';
import client from "./utils/contentful";
import Contact from "./components/Contact";
import Video from "./components/Video";

export default async function Home() {
  const blogs = await client.getEntries({ content_type: 'blogPost' });
  

  return (
    <div className="home-container">
      <div className="icons-container">
        <div className="shopping-container icon-container">
          <a href="https://www.etsy.com/people/io1pvxv84h4u1jh3" target="_blank"><Image src={ShoppingIcon} alt="shopping-icon" width={300} /></a>
        </div>
        <Video />
        < Blogs blogs={blogs.items} />
        <LightPole />
        <Contact />
      </div>

      

    </div>
  );
}
