// src/pages/ReportList.tsx

import React, { useEffect, useState } from 'react';
import { getSmallReport } from '../api/reports';
import Menu from "../components/Menu"; // Supondo que você tenha uma função para obter o relatório pequeno no arquivo de API

const ReportList: React.FC = () => {
    const [report, setReport] = useState<any[]>([]);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const reportData = await getSmallReport();
                setReport(reportData);
            } catch (error) {
                console.error('Erro ao obter relatório:', error);
            }
        };
        fetchReport();
    }, []);

    return (
        <div>
            <Menu />
            <h2>Relat&oacute;rio de Posts</h2>
            <table>
                <thead>
                <tr>
                    <th>T&iacute;tulo</th>
                    <th>N&uacute;mero de Coment&aacute;rios</th>
                    <th>Visualiza&ccedil;&otilde;es</th>
                    <th>Curtidas</th>
                    <th>N&atilde;o Curtidas</th>
                </tr>
                </thead>
                <tbody>
                {report.map((item, index) => (
                    <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.commentsSize}</td>
                        <td>{item.views}</td>
                        <td>{item.likes}</td>
                        <td>{item.dislikes}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportList;
