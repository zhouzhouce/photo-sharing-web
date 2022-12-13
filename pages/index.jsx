import { userService } from 'services';
import { Link } from 'components';
import styles from '../styles/Home.module.css';
import {GraphQLClient, gql} from 'graphql-request';
import BlogCard from '../components/BlogCard';

const graphqlcms = new GraphQLClient(
  'https://api-ca-central-1.hygraph.com/v2/clb8qv6251jr601uk4h0t501f/master'
);

const QUERY = gql`
  {
    posts{
      id,
      title,
      datePublished,
      slug,
      content {
        html
      }
      author{
        name,
        avatar{
          url
        }
      }
      photo{
        url
      }
    }
  }
`;

export async function getStaticProps(){
    const {posts} = await graphqlcms.request(QUERY);
    // console.log(posts);
    return {
      props: {
        posts,
      },
      revalidate: 10,
    };
  }

export default Home;

function Home({posts}) {
    return (
        <div className={styles.container}>
            <div className="p-4">
                <div className="container">
                    <h1>Hi {userService.userValue?.firstName}!</h1>
                    <p>You&apos;re logged in!</p>
                    <p><Link href="/users">Manage Users</Link></p>
                </div>
            </div>
            <main className={styles.main}>
                {posts.map((post) => (
                <BlogCard 
                    title={post.title} 
                    author={post.author} 
                    photo={post.photo} 
                    key={post.id} 
                    datePublished={post.datePublished} 
                    slug={post.slug}
                />
                
                ))}
            </main>
        </div>
        
    );
}
