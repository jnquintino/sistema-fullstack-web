import React, {useEffect, useState} from 'react';
import {createUser, updateUser} from "../api/users";
import {User} from "../models/User";

interface UserFormProps {
    user: User | null;
    onSubmitSuccess: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmitSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPassword('');
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userData = {name, email, password, profile: 'User'};
            if (user) {
                const update = await updateUser(user._id, userData);
                console.log('Usuário atualizado:', update);
            } else {
                const newUser = await createUser(userData);
                console.log('Novo usuário criado:', newUser);
            }
            setName('');
            setEmail('');
            setPassword('');
            onSubmitSuccess();
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{ user ? 'Atualizar' : 'Cadastrar'}</h2>
            <div>
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">Senha:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit">{ user ? 'Atualizar' : 'Cadastrar'}</button>
            <button onClick={() => onSubmitSuccess()}>Fechar</button>
        </form>
    );
};

export default UserForm;
