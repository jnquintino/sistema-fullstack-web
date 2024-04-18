import React, { useEffect, useState } from 'react';
import {deletePost, getPosts} from '../api/posts';
import Menu from "../components/Menu";
import {Post} from "../models/Post";
import PostForm from "../forms/PostForm";
import axiosInstance from '../axiosInstance';
import CommentsList from "./CommentsList";
import PostPage from "../pages/PostPage";

const PostsList: React.FC = () => {
    const [loggedUser, setLoggedUser] = useState<any[]>([]);
    const [posts, setPosts] = useState<any[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showCommentsList, setShowCommentsList] = useState<boolean>(false);
    const [showView, setShowView] = useState<boolean>(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [postId, setPostId] = useState<Post | null>(null);

    const fetchPosts = async () => {
        getPosts().then((data) => {
            setPosts(data);
        });
    };

    useEffect(() => {
        fetchPosts();
        const token = localStorage.getItem('token');
        axiosInstance.post('/api/users/identity', {}).then((response) => {
            setLoggedUser(response.data.userId);
        });
    }, []);

    const handleDeletePost = async (postId: number) => {
        try {
            await deletePost(postId);
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            console.error('Erro ao excluir post:', error);
        }
    };

    const handleFormSubmit = () => {
        setShowForm(false);
        setSelectedPost(null);
        fetchPosts();
    };

    const handleCommentsSubmit = () => {
        setShowCommentsList(false);
        setPostId(null);
    };

    const handleViewSubmit = () => {
        setShowView(false);
        setPostId(null);
        fetchPosts();
    };

    const handleEditPost = (post: Post) => {
        setSelectedPost(post);
        setShowForm(true);
    };

    const handleComments = (postId: any) => {
        setPostId(postId);
        setShowCommentsList(true);
    };

    const handleView = (postId: any) => {
        setPostId(postId);
        setShowView(true);
    };

    return (
        <div>
            <Menu />
            {!postId && <div>
                <h2>Lista de Posts</h2>
                <table>
                    <thead>
                    <tr>
                        <th>T&iacute;tulo</th>
                        <th>Views</th>
                        <th>Likes</th>
                        <th>Dislikes</th>
                        <th>Status</th>
                        <th>A&ccedil;&otilde;es</th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td>{post.title}</td>
                            <td>{post.views}</td>
                            <td>{post.likes}</td>
                            <td>{post.dislikes}</td>
                            <td>{post.enabled ? 'Ativo' : 'Inativo'}</td>
                            <td>
                                <button onClick={() => handleEditPost(post)} disabled={loggedUser !== post.user}>Editar</button>
                                <button onClick={() => handleDeletePost(post._id)} disabled={!post.enabled || loggedUser !== post.user}>Excluir</button>
                                <button onClick={() => handleComments(post._id)}>Coment&aacute;rios</button>
                                <button onClick={() => handleView(post._id)}>Visualizar</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div> }
            {showForm && <PostForm userId={loggedUser} post={selectedPost} onSubmitSuccess={handleFormSubmit} />}
            {(!showForm && !showCommentsList && !showView) && <button onClick={() => setShowForm(true)}>Adicionar</button> }
            {showCommentsList && <CommentsList postId={postId} onSubmitSuccess={handleCommentsSubmit} />}
            {showView && <PostPage postId={postId} onSubmitSuccess={handleViewSubmit} />}
        </div>
    );
};

export default PostsList;
