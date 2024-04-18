import React, { useEffect, useState } from 'react';
import {deleteUser, getUsers} from '../api/users';
import Menu from "../components/Menu";
import UserForm from "../forms/UserForm";
import {User} from "../models/User";

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const fetchUsers = () => {
        getUsers().then((data) => {
            setUsers(data);
        });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId: number) => {
        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    };

    const handleFormSubmit = () => {
        setShowForm(false);
        setSelectedUser(null);
        fetchUsers();
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setShowForm(true);
    };

    return (
        <div>
            <Menu />
            <h2>Lista de Usu&aacute;rios</h2>
            <table>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>A&ccedil;&otilde;es</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.enabled ? 'Ativo' : 'Inativo'}</td>
                        <td>
                            <button onClick={() => handleEditUser(user)}>Editar</button>
                            <button onClick={() => handleDeleteUser(user._id)} disabled={!user.enabled}>Excluir</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showForm && <UserForm user={selectedUser} onSubmitSuccess={handleFormSubmit} />}
            {!showForm && <button onClick={() => setShowForm(true)}>Adicionar</button> }
        </div>
    );
};

export default UsersList;
