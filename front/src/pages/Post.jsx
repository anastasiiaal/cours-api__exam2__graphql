import { useQuery, useMutation, gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

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
                createdAt
            }
        }
    }
`;

const ADD_COMMENT = gql`
    mutation AddComment($postId: ID!, $author: String!, $content: String!) {
        createComment(postId: $postId, author: $author, content: $content) {
            id
            author
            content
        }
    }
`;

export default function Post() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_POST, {
        variables: { id },
    });
    const [addComment] = useMutation(ADD_COMMENT);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (!loading && !error && !data?.post) {
            navigate('/');
        }
    }, [loading, error, data, navigate]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const post = data.post;

    const handleAddComment = async (e) => {
        e.preventDefault();
        await addComment({
            variables: { postId: id, author, content },
            refetchQueries: [{ query: GET_POST, variables: { id } }],
        });
        setAuthor('');
        setContent('');
    };

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
                    By {post.author} • { format(new Date(post.createdAt), 'dd MMM yyyy HH:mm') }
                </p>

                <form onSubmit={handleAddComment} className="mt-4">
                    <div className="mb-2">
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Author"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Comment"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-600">
                        Add Comment
                    </button>
                </form>

                <h2 className="text-xl font-semibold mt-6">Comments</h2>
                {post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                        <div key={comment.id} className="border-t border-gray-300 mt-4 pt-4">
                            <p className="font-semibold">{comment.author} • <span className="font-normal text-slate-400"> { format(new Date(comment.createdAt), 'dd MMM yyyy HH:mm') }</span></p>
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
