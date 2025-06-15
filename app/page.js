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

export default async function Home() {
  const blogs = await client.getEntries({ content_type: 'blogPost' });
  console.log(blogs.items);

  return (
    <div className="home-container">
      <div className="icons-container">
        <div className="shopping-container icon-container">
          <Image src={ShoppingIcon} alt="shopping-icon" width={300} />
        </div>
        <div className="video-container icon-container">
          <Image src={VideoIcon} alt="video-icon" width={300} />
        </div>
       <Blogs blogs={blogs.items} />
        <LightPole />
        <Contact />
      </div>

      

    </div>
  );
}
