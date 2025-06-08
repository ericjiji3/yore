'use client';
import "./Blogs.css";
import Image from "next/image";
import BlogIcon from '@/public/images/blog-icon.png';
import ExitIcon from '@/public/images/exit-sign.png';
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Blogs({blogs}) {
    const [showBlogs, setShowBlogs] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const shouldShowBlogs = searchParams.get('showBlogs') === 'true';
        if (shouldShowBlogs) {
            setShowBlogs(true);
        }
    }, [searchParams]);

    const handleClick = () => {
        setShowBlogs(!showBlogs);
        if (showBlogs) {
            // Remove the query parameter when closing
            router.push('/', { scroll: false });
        }
    }

    return (
        <div className="blog-comp icon-container">
            <Image src={BlogIcon} alt="blog-icon" width={250} onClick={handleClick}/>
            <div className={`blogs-container ${showBlogs ? 'show' : ''}`}>
                <Image className="exit-icon" src={ExitIcon} alt="exit-icon" width={400} height={294} onClick={handleClick}/>
                <div className="blogs-list">
                    {blogs.map((blog) => (
                        <Link className="blog-item" key={blog.sys.id} href={"/blogs/" + blog.fields.slug}>
                            <h2>{blog.fields.blogTitle}</h2>
                            <p>{new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }).format(new Date(blog.sys.updatedAt))}</p>
                            <Image src={'https:' + blog.fields.thumbnail.fields.file.url} alt={blog.fields.thumbnail.fields.title} width={blog.fields.thumbnail.fields.file.details.image.width} height={blog.fields.thumbnail.fields.file.details.image.height} />
                        </Link>
                    ))}
                </div>
            </div>
      </div>
    )
}