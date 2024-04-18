import React, { useEffect, useState } from 'react';
import {Comment} from "../models/Comment";
import axiosInstance from '../axiosInstance';
import {deleteComment, getComments} from "../api/comments";
import CommentForm from "../forms/CommentForm";

interface CommentListProps {
    postId: any;
    onSubmitSuccess: () => void;
}

const CommentsList: React.FC<CommentListProps> = ({ postId, onSubmitSuccess }) => {
    const [loggedUser, setLoggedUser] = useState<any[]>([]);
    const [comments, setComments] = useState<any[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

    const fetchComments = async () => {
        getComments(postId).then((data) => {
            console.log('Comments:', data);
            setComments(data);
        });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        axiosInstance.post('/api/users/identity', {}).then((response) => {
            setLoggedUser(response.data.userId);
            fetchComments();
        });
    }, []);

    const handleDeletePost = async (commentId: number) => {
        try {
            await deleteComment(commentId);
            setComments(comments.filter(comment => comment._id !== commentId));
        } catch (error) {
            console.error('Erro ao excluir comentario:', error);
        }
    };

    const handleFormSubmit = () => {
        setShowForm(false);
        setSelectedComment(null);
        fetchComments();
    };

    const handleEditPost = (comment: Comment) => {
        setSelectedComment(comment);
        setShowForm(true);
    };

    return (
        <div>
            <h2>Lista de Coment&aacute;rios</h2>
            <table>
                <thead>
                <tr>
                    <th>Descri&ccedil;&atilde;o</th>
                    <th>Status</th>
                    <th>A&ccedil;&otilde;es</th>
                </tr>
                </thead>
                <tbody>
                {comments.map(comment => (
                    <tr key={comment.id}>
                        <td>{comment.description}</td>
                        <td>{comment.enabled ? 'Ativo' : 'Inativo'}</td>
                        <td>
                            <button onClick={() => handleEditPost(comment)}
                                    disabled={loggedUser !== comment.user || loggedUser !== comment.post.user}>Editar
                            </button>
                            <button onClick={() => handleDeletePost(comment._id)}
                                    disabled={!comment.enabled || loggedUser !== comment.user || loggedUser !== comment.post.user}>Excluir
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showForm && <CommentForm postId={postId} userId={loggedUser} comment={selectedComment} onSubmitSuccess={handleFormSubmit}/>}
            {!showForm && <button onClick={() => setShowForm(true)}>Adicionar</button>}
            {!showForm && <button onClick={() => onSubmitSuccess()}>Fechar</button>}
        </div>
    );
};

export default CommentsList;
