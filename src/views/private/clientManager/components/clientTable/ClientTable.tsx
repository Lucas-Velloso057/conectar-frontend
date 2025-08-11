import { useNavigate } from 'react-router-dom';
import styles from './ClientTable.module.css';
import { IClient } from 'src/interfaces/IClient';
import { useAuth } from 'src/contexts/AuthContext';

interface ClientTableProps {
  clients: IClient[];
}

export function ClientTable({ clients }: ClientTableProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNewClient = () => {
    navigate('/novo');
  };

  const handleEditClient = (clientId: string) => {
    navigate(`/editar/${clientId}`);
  };

  return (
    <section className={styles.tableContainer}>
      <header className={styles.tableHeader}>
        <div className={styles.titleGroup}>
          <h3>Clientes</h3>
          <p>Selecione um usuário para editar suas informações</p>
        </div>
        {user?.role === 'admin' && (
          <button className={styles.novoButton} onClick={handleNewClient}>
            Novo
          </button>
        )}
      </header>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Razão social</th>
              <th>CNPJ</th>
              <th>Nome na fachada</th>
              <th>Tags</th>
              <th>Status</th>
              <th>Conecta Plus</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} onClick={() => handleEditClient(client.id)}>
                <td>{client.razaoSocial}</td>
                <td>{client.cnpj}</td>
                <td>{client.nomeFantasia}</td>
                <td>{client.tags.join(', ')}</td>
                <td>
                  <span className={`${styles.status} ${client.status === 'Ativo' ? styles.statusAtivo : styles.statusInativo}`}>
                    {client.status}
                  </span>
                </td>
                <td>{client.conectaPlus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
