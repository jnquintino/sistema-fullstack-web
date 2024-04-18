import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import {useNavigate} from "react-router-dom";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/users/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Entrar</button>
        </form>
    );
};

export default LoginForm;
