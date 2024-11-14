import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      author
      text
      url
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
                    {data.posts.map((post) => (
                        <div key={post.id} className="p-4 bg-white rounded shadow">
                            <h3 className="font-semibold text-lg">{post.author}</h3>
                            <p>{post.text}</p>
                            {post.url && (
                                <a href={post.url} className="text-blue-500 hover:underline">
                                    Read more
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}