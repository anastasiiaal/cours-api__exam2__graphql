import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_POSTS = gql`
    query GetPosts {
        posts {
            id
            author
            text
            url
            createdAt
        }
    }
`;

export default function Home() {
    const { loading, error, data } = useQuery(GET_POSTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="section">
            <div className="container">
                <h2 className="text-2xl font-bold mb-4">All Posts</h2>
                <div className="grid gap-6">
                    {data.posts.length > 0 ? (
                        data.posts.map((post) => (
                            <div key={post.id} className="p-4 bg-white rounded shadow">
                                <h3 className="font-semibold text-lg">
                                    {post.text}
                                    {post.url && (
                                        <a
                                            href={post.url.startsWith('http') ? post.url : `https://${post.url}`}
                                            className="font-normal text-slate-400 ml-2"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            ({post.url})
                                        </a>
                                    )}
                                </h3>
                                <p className="">
                                    By {post.author} <span className="mx-2">•</span>
                                    { new Date(post.createdAt).toLocaleString() } <span className="mx-2">•</span>
                                    <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline">
                                        See comments
                                    </Link>
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No posts yet</p>
                    )}
                </div>
            </div>

        </div>
    );
}