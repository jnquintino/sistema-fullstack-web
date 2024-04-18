import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "../axiosInstance";

interface ViewsProps {
    postId: any;
    onSubmitSuccess: () => void;
}

const PostPage: React.FC<ViewsProps> = ({ postId, onSubmitSuccess }) => {
    const [post, setPost] = useState<any>(null);
    const [likes, setLikes] = useState<any>(null);
    const [dislikes, setDislikes] = useState<any>(null);

    const fetchPost = async () => {
        try {
            const postData = await axiosInstance.get(`/api/posts/${postId}`);
            setPost(postData.data);
            setLikes(postData.data.likes);
            setDislikes(postData.data.dislikes);
        } catch (error) {
            console.error('Erro ao obter post:', error);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [postId]);

    const handleLike = async () => {
        post.likes++;
        setPost(post);
        setLikes(likes + 1);
        await axiosInstance.get(`/api/posts/like/${postId}`);
    };

    const handleDislike = async () => {
        post.dislikes++;
        setPost(post);
        setDislikes(dislikes + 1);
        await axiosInstance.get(`/api/posts/dislike/${postId}`);
    };

    if (!post) {
        return <div>Carregando post...</div>;
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>Views: {post.views}</p>
            <p>Likes: {likes}</p>
            <p>Dislikes: {dislikes}</p>
            <button onClick={handleLike}>Like</button>
            <button onClick={handleDislike}>Dislike</button>
            <button onClick={() => onSubmitSuccess()}>Fechar</button>
        </div>
    );
};

export default PostPage;
