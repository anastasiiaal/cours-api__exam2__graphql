import { useQuery, gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      author
      text
      url
      createdAt
      comments {
        id
        author
        content
      }
    }
  }
`;

export default function Post() {
    const { id } = useParams(); // Get the post ID from the URL
    const navigate = useNavigate(); // For redirection
    const { loading, error, data } = useQuery(GET_POST, {
        variables: { id },
    });

    // Redirect to "/" if the post is not found
    useEffect(() => {
        if (!loading && !error && !data?.post) {
            navigate('/');
        }
    }, [loading, error, data, navigate]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const post = data.post;

    return (
        <div className="section">
            <div className="container p-4 bg-white rounded shadow">
                <h3 className="text-xl font-bold mb-2">{post.text}</h3>
                {post.url && (
                    <a href={post.url.startsWith('http') ? post.url : `https://${post.url}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-500 hover:underline"
                    >
                        {post.url}
                    </a>
                )}
                <p className="text-sm text-gray-500 mt-2">
                    By {post.author} • { new Date(post.createdAt).toLocaleString()  }
                </p>
                <h2 className="text-xl font-semibold mt-6">Comments</h2>
                {post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                        <div key={comment.id} className="border-t border-gray-300 mt-4 pt-4">
                            <p className="font-semibold">{comment.author} • <span className="font-normal text-slate-400">{ new Date(Date.parse(post.createdAt)).toLocaleString() }</span></p>
                            <p>{comment.content}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 mt-2">No comments yet.</p>
                )}
            </div>
        </div>
    );
}
