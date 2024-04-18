import React, {useEffect, useState} from 'react';
import {Post} from "../models/Post";
import {createPost, updatePost} from "../api/posts";

interface PostFormProps {
    post: Post | null;
    userId: any;
    onSubmitSuccess: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ post, onSubmitSuccess, userId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setDescription(post.description);
            setImage(post.image);
        }
    }, [post]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const postData = {title, description, image, user: userId};
            if (post) {
                const update = await updatePost(post._id, postData);
                console.log('Post atualizado:', update);
            } else {
                const newPost = await createPost(postData);
                console.log('Novo post criado:', newPost);
            }
            setTitle('');
            setDescription('');
            setImage('');
            onSubmitSuccess();
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{ post ? 'Atualizar' : 'Cadastrar'}</h2>
            <div>
                <label htmlFor="title">T&iacute;tulo:</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="description">Descri&ccedil;&atilde;o:</label>
                <textarea rows={5} id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="image">Imagem:</label>
                <input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)}/>
            </div>
            <button type="submit">{ post ? 'Atualizar' : 'Cadastrar'}</button>
            <button onClick={() => onSubmitSuccess()}>Fechar</button>
        </form>
    );
};

export default PostForm;
