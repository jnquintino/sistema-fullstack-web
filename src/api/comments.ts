import axiosInstance from '../axiosInstance';

export const getComments = async (postId: number) => {
    try {
        const response = await axiosInstance.get('/api/comments/post/' + postId);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar comentarios:', error);
        throw error;
    }
};

export const deleteComment = async (commentId: number) => {
    try {
        await axiosInstance.delete(`/api/comments/${commentId}`);
    } catch (error) {
        console.error('Erro ao excluir comentario:', error);
        throw error;
    }
};

export const createComment = async (commentData: any) => {
    try {
        const response = await axiosInstance.post('/api/comments', commentData);
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao criar comentario: ${error}`);
    }
};

export const updateComment = async (commentId: number, commentData: any) => {
    try {
        const response = await axiosInstance.put(`/api/comments/${commentId}`, commentData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar o comentario:', error);
        throw error;
    }
};
