import React, {useEffect, useState} from 'react';
import {Comment} from "../models/Comment";
import {createComment, updateComment} from "../api/comments";

interface CommentFormProps {
    postId: any;
    userId: any;
    comment: Comment | null;
    onSubmitSuccess: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onSubmitSuccess, userId, comment }) => {
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (comment) {
            setDescription(comment.description);
        }
    }, [comment]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const commentData = {description, post: postId, user: userId};
            if (comment) {
                const update = await updateComment(comment._id, commentData);
                console.log('Comentário atualizado:', update);
            } else {
                const newComment = await createComment(commentData);
                console.log('Novo comentário criado:', newComment);
            }
            setDescription('');
            onSubmitSuccess();
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{ comment ? 'Atualizar' : 'Cadastrar'}</h2>
            <div>
                <label htmlFor="description">Descri&ccedil;&atilde;o:</label>
                <textarea rows={5} id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <button type="submit">{ comment ? 'Atualizar' : 'Cadastrar'}</button>
            <button onClick={() => onSubmitSuccess()}>Fechar</button>
        </form>
    );
};

export default CommentForm;
