import React from 'react';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">P&aacute;gina Inicial</Link>
                </li>
                <li>
                    <Link to="/users">Usu&aacute;rios</Link>
                </li>
                <li>
                    <Link to="/posts">Postagens</Link>
                </li>
                <li>
                    <Link to="/reports">Relat&oacute;rios</Link>
                </li>
                <li>
                    <Link to="/logout">Sair</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
