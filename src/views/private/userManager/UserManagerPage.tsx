import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/contexts/AuthContext';
import { mockUsers } from 'src/data/mockUsers';
import styles from './UserManagerPage.module.css';

export function UserManagerPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Apenas admins podem acessar esta página
  if (user?.role !== 'admin') {
    return <div>Acesso negado.</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>Gerenciamento de Usuários</h1>
      <div className={styles.tableContainer}>
        <header className={styles.tableHeader}>
          <div className={styles.titleGroup}>
            <h3>Usuários do Sistema</h3>
            <p>Adicione, edite ou remova usuários</p>
          </div>
          <button className={styles.novoButton} onClick={() => navigate('/usuarios/novo')}>
            Novo Usuário
          </button>
        </header>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Nível de Acesso</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((u) => (
              <tr key={u.id} onClick={() => navigate(`/usuarios/editar/${u.id}`)}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
