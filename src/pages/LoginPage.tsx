import React, {useEffect} from 'react';
import LoginForm from '../forms/LoginForm';

const LoginPage: React.FC = () => {
    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    return (
        <div>
            <h2>Login</h2>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
