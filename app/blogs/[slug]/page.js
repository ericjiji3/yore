import client from '@/app/utils/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import Image from 'next/image';
import './styles.css';
import Link from 'next/link';
import ExitIcon from '@/public/images/exit-sign.png';
import { Imprima } from 'next/font/google';

const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <span className="font-bold">{text}</span>,
      [MARKS.ITALIC]: (text) => <span className="italic">{text}</span>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-4 text-lg font-pp-light">{children}</p>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-3xl font-clash-regular mb-4 mt-8">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="text-2xl font-clash-regular mb-3 mt-6">{children}</h3>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc ml-6 mb-4 font-pp-light">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal ml-6 mb-4 font-pp-light">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="mb-2">{children}</li>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 font-pp-light">{children}</blockquote>
      ),
      'embedded-asset-block': (node) => (
        <div className="my-8">
          <Image 
            className="w-full" 
            src={`https:${node.data.target.fields.file.url}`}
            alt={node.data.target.fields.description || ''}
            width={node.data.target.fields.file.details.image.width}
            height={node.data.target.fields.file.details.image.height}
          />
        </div>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <a 
          href={node.data.uri}
          className=""
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    }
}

export async function generateStaticParams() {
  const res = await client.getEntries({ 
    content_type: 'blogPost' 
  });

  return res.items.map(item => ({
    slug: item.fields.slug
  }));
}

export async function generateMetadata({ params }) {
  const { items } = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': params.slug
  });

  if (!items.length) {
    return {
      title: 'Blog Not Found'
    }
  }

  return {
    title: items[0].fields.blogTitle,
    description: items[0].fields.description || 'Blog post'
  }
}

export default async function BlogPost({ params }) {
  const { items } = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': params.slug
  });

  if (!items.length) {
    return <div>Blog post not found</div>
  }

  const blogData = items[0];

  return (
    <div className="blog-page-container">
        <Link href="/?showBlogs=true" className="exit-container">
            <Image className="exit-icon" src={ExitIcon} alt="exit-icon" width={400} height={294} />
        </Link>
        
      <article className="article-container">
        <h1 className="article-title">
          {blogData.fields.blogTitle}
        </h1>
        <p className="article-date">{new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }).format(new Date(blogData.sys.updatedAt))}</p>
        <div className="article-thumbnail-container">
          <Image
            src={'https:' + blogData.fields.thumbnail.fields.file.url}
            alt={blogData.fields.thumbnail.fields.title}
            width={blogData.fields.thumbnail.fields.file.details.image.width}
            height={blogData.fields.thumbnail.fields.file.details.image.height}
            className=""
          />
        </div>

        <div className="article-body">
          {documentToReactComponents(blogData.fields.body, options)}
        </div>

        {blogData.fields.images && blogData.fields.images.length > 0 && (
          <div className="">
            {blogData.fields.images.map((image, index) => (
              <div key={index} className="article-image-container">
                <Image
                  src={'https:' + image.fields.file.url}
                  alt={image.fields.description || "Blog image"}
                  fill
                  className=""
                />
              </div>
            ))}
          </div>
        )}
      </article>
    </div>
  );
} 