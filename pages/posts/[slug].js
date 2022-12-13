import styles from '../../styles/Slug.module.css';
import {GraphQLClient, gql} from 'graphql-request';
import LikeButton from 'components/likeButton/LikeButton';
import React from 'react'
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share';

const graphqlcms = new GraphQLClient(
  'https://api-ca-central-1.hygraph.com/v2/clb8qv6251jr601uk4h0t501f/master'
);

const QUERY = gql`
  query Post($slug: String!){
    post (where: {slug: $slug}){
        id,
        title,
        slug,
        datePublished,
        author{
            id,
            name,
            avatar{
                url
            }, 
        }
        content{
          html  
        }
        photo{
            id,
            url
        }
    }
  } 
`;

const SLUGLIST = gql`
    {
        posts {
            slug
        }
    }
`;

export async function getStaticPaths(){
    const {posts} = await graphqlcms.request(SLUGLIST);
    return{
        paths: posts.map((post) => ({params:{slug: post.slug}})),
        fallback: false,
    };
}

export async function getStaticProps({params}){
  const slug = params.slug;
  const data = await graphqlcms.request(QUERY, {slug});
  const post = data.post;
  return {
    props: {
      post
    },
    revalidate: 10,
  };
}

export default function BlogPost({post, like}){
    return(
        <main className={styles.blog}>
            <img src={post.photo.url} className={styles.cover} alt="" />
            <div className={styles.title}>
              <h2>{post.title}</h2>
              <div className={styles.authordetails}>
                <img src={post.author.avatar.url} alt="" />
                <div className={styles.authtext}>
                    <h6>By {post.author.name}</h6>
                    <h6 className={styles.date}>
                        {post.datePublished}
                    </h6>
                    <LikeButton />
                </div>
              </div>
              <div>
              <FacebookShareButton
                url={'http://localhost:3000'} >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <PinterestShareButton
                url={'http://localhost:3000'} >
                <PinterestIcon size={32} round />
              </PinterestShareButton>
              <RedditShareButton
                url={'http://localhost:3000'} >
                <RedditIcon size={32} round />
              </RedditShareButton>
              <WhatsappShareButton
                url={'http://localhost:3000'} >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <LinkedinShareButton
                url={'http://localhost:3000'} >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
              </div>
            </div>
            
            <div className={styles.content} 
              dangerouslySetInnerHTML={{__html: post.content.html}}
            ></div>
        </main>
    )
}