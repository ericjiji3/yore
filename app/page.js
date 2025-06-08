import Blogs from "./components/Blogs";
import Image from "next/image";
import ShoppingIcon from '@/public/images/shopping-icon.png';
import BlogIcon from '@/public/images/blog-icon.png';
import MailIcon from '@/public/images/mail-icon.png';
import LightIcon from '@/public/images/light-icon.png';
import VideoIcon from '@/public/images/video-icon.png';
import styles from './home.css';
import client from "./utils/contentful";

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
    
        <div className="light-container icon-container">
          <Image src={LightIcon} alt="mail-icon" width={250}/>
          <div className="light light-1"></div>
          <div className="light light-2"></div>
        </div>  
        <div className="mail-container icon-container">
          <Image src={MailIcon} alt="mail-icon" width={400}/>
        </div>
      </div>
     
      

    </div>
  );
}
