import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const ADD_POST = gql`
    mutation AddPost($author: String!, $text: String!, $url: String!) {
        createPost(author: $author, text: $text, url: $url) {
            id
            author
            text
            url
        }
    }
`;

export default function NewPost() {
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [url, setUrl] = useState('');
    const [addPost, { loading, error }] = useMutation(ADD_POST);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPost({
                variables: { author, text, url },
            });
            setAuthor('');
            setText('');
            setUrl('');
            alert('Post added successfully!');
            navigate('/');
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert('Failed to add post.');
        }
    };

    return (
        <div className="section">
            <div className="container">
                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Author"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Post content"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter post URL"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-600"
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Post'}
                    </button>
                </form>

                {error && <p className="text-red-500 mt-4">Error: {error.message}</p>}
            </div>
        </div>
    );
}
