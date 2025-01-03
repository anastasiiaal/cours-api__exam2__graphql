import { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const GET_POSTS = gql`
    query GetPosts($sort: String) {
        posts(sort: $sort) {
            id
            author
            text
            url
            createdAt
        }
    }
`;

const DELETE_POST = gql`
    mutation DeletePost($id: ID!) {
        deletePost(id: $id) {
            id
        }
    }
`;
        
export default function Home() {
    const [sortOrder, setSortOrder] = useState('NEW');
    const { loading, error, data, refetch } = useQuery(GET_POSTS, {
        variables: { sort: sortOrder },
    });

    const handleSortChange = (sort) => {
        setSortOrder(sort);
        refetch({ sort });
    };

    const [deletePost] = useMutation(DELETE_POST, {
        onCompleted: () => {
            refetch();
        },
        onError: (error) => {
            console.error(error.message);
            alert('Failed to delete post.');
        },
    });

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost({ variables: { id } });
                alert('Post deleted successfully!');
            } catch (err) {
                console.error(err.message);
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="section">
            <div className="container">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">All Posts</h2>
                    <Link to="new-post" className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-600">
                        Add new post
                    </Link>
                </div>

                <div className="flex mb-4 space-x-4">
                    <button
                        onClick={() => handleSortChange('NEW')}
                        className={`px-4 py-1 rounded ${
                            sortOrder === 'NEW'
                                ? 'bg-sky-700 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        New
                    </button>
                    <button
                        onClick={() => handleSortChange('OLD')}
                        className={`px-4 py-1 rounded ${
                            sortOrder === 'OLD'
                                ? 'bg-sky-700 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Old
                    </button>
                </div>

                <div className="grid gap-6">
                    {data.posts.length > 0 ? (
                        data.posts.map((post) => (
                            <div key={post.id} className="flex justify-between items-center p-4 bg-white rounded shadow">
                                <div>
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
                                        { format(new Date(post.createdAt), 'dd MMM yyyy HH:mm') } <span className="mx-2">•</span>
                                        <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline">
                                            See comments
                                        </Link>
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="px-4 py-1 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                >
                                    Delete
                                </button>
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