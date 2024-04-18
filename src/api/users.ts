import axiosInstance from '../axiosInstance';

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get('/api/users');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
};

export const deleteUser = async (userId: number) => {
    try {
        await axiosInstance.delete(`/api/users/${userId}`);
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        throw error;
    }
};

export const createUser = async (userData: any) => {
    try {
        const response = await axiosInstance.post('/api/users', userData);
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao criar usuário: ${error}`);
    }
};

export const updateUser = async (userId: number, userData: any) => {
    try {
        const response = await axiosInstance.put(`/api/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar o usuário:', error);
        throw error;
    }
};
