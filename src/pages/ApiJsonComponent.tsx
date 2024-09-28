import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const ApiJsonComponent: React.FC = () => {
    const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState<Post>({
        userId: 1,
        id: 0,
        title: '',
        body: '',
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

    const getPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response: AxiosResponse<Post[]> = await axios.get(`${API_BASE_URL}/posts`);
            setPosts(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al cargar posts');
        } finally {
            setLoading(false);
        }
    };

    const createPost = async () => {
        setLoading(true);
        setError(null);
        try {
            const response: AxiosResponse<Post> = await axios.post(`${API_BASE_URL}/posts`, newPost);
            setPosts([response.data, ...posts]);
        } catch (error) {
            console.error(error);
            setError('Error al crear el post');
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async (_id: number) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${API_BASE_URL}/posts/${_id}`);
            setPosts(posts.filter(post => post.id !== _id));
        } catch (error) {
            console.error(error);
            setError('Error al borrar el post');
        } finally {
            setLoading(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="container mx-auto p-4 dark:bg-gray-900 relative">
            <h1 className="text-2xl font-bold text-center mb-4 dark:text-white">Posts</h1>

            {loading && <p className="text-center text-gray-600 dark:text-gray-300">Cargando...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="mb-6">
                <h2 className="text-xl font-semibold dark:text-white">Crea un nuevo Post</h2>
                <input
                    type="text"
                    placeholder="Titulo"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <textarea
                    placeholder="Contenido"
                    value={newPost.body}
                    onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <button
                    onClick={createPost}
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                    Crear Post
                </button>
            </div>

            <ul className="space-y-4">
                {posts.map(post => (
                    <li key={post.id} className="p-4 border border-gray-300 rounded-md shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <h3 className="text-lg font-bold dark:text-white">{post.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
                        <button
                            onClick={() => deletePost(post.id)}
                            className="mt-2 text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {showScrollButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
                >
                    ⬆️
                </button>
            )}
        </div>
    );
};

export default ApiJsonComponent;
