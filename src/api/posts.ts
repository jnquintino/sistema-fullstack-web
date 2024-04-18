import axiosInstance from '../axiosInstance';

export const getPosts = async () => {
    try {
        const response = await axiosInstance.get('/api/posts');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        throw error;
    }
};

export const deletePost = async (postId: number) => {
    try {
        await axiosInstance.delete(`/api/posts/${postId}`);
    } catch (error) {
        console.error('Erro ao excluir posts:', error);
        throw error;
    }
};

export const createPost = async (postData: any) => {
    try {
        const response = await axiosInstance.post('/api/posts', postData);
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao criar post: ${error}`);
    }
};

export const updatePost = async (postId: number, postData: any) => {
    try {
        const response = await axiosInstance.put(`/api/posts/${postId}`, postData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar o post:', error);
        throw error;
    }
};
