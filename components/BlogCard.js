import Link from "next/link";
import styles from "../styles/BlogCard.module.css";
// import LikeButton from "./likeButton/LikeButton";

export default function BlogPost({
    title,
    author, 
    photo,
    datePublished, 
    slug,
}) {
    return(
        <div className={styles.card}>
            <Link href={"/posts/" + slug}>
                <div className={styles.imgContainer}>
                    <img src={photo.url} alt="" />
                </div>
            </Link>
            <div className={styles.text}>
                <h2>{title}</h2>
                <div className={styles.details}>
                    <div className={styles.author}>
                        <img src={author.avatar.url} alt="" />
                        <h3>{author.name}</h3>
                    </div>
                    
                    <div className={styles.date}>
                        <h3>{datePublished}</h3>
                    </div>
                    {/* <LikeButton/> */}   
                </div>
            </div>
        </div>
    )
}