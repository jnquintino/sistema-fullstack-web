import axiosInstance from '../axiosInstance';

export const getSmallReport = async () => {
    try {
        const response = await axiosInstance.get(`/api/reports/small`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao obter relatório pequeno');
    }
};
