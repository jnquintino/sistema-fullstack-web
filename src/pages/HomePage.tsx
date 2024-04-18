import React from 'react';
import Menu from '../components/Menu';

const HomePage: React.FC = () => {
    return (
        <div>
            <Menu />
            <h1>Bem-vindo &agrave; P&aacute;gina Inicial</h1>
            <p>Aqui voc&ecirc; pode adicionar o conte&uacute;do da sua p&aacute;gina inicial.</p>
        </div>
    );
};

export default HomePage;
