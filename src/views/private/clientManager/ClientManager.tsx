import { useState, useEffect, useMemo } from 'react';
import { Filters } from './components/filters/Filters';
import { ClientTable } from './components/clientTable/ClientTable';
import { mockClients } from 'src/data/mockClients';
import { IClient } from 'src/interfaces/IClient';
import { useAuth } from 'src/contexts/AuthContext';
import styles from './ClientManager.module.css';

export interface FilterState {
  nome: string;
  cnpj: string;
  status: string;
  conectaPlus: string;
}

function ClientManager() {
  const { user } = useAuth();
  
  const visibleClients = useMemo(() => {
    if (user?.role === 'admin') {
      return mockClients;
    }
    if (user?.role === 'user') {
      return mockClients.filter(client => 
        user.assignedClientIds.includes(client.id)
      );
    }
    return [];
  }, [user]);

  const [filteredClients, setFilteredClients] = useState<IClient[]>(visibleClients);
  const [filters, setFilters] = useState<FilterState>({
    nome: '',
    cnpj: '',
    status: '',
    conectaPlus: '',
  });

  useEffect(() => {
    let clients = [...visibleClients];

    if (filters.nome) {
      clients = clients.filter(c =>
        c.razaoSocial.toLowerCase().includes(filters.nome.toLowerCase()) ||
        c.nomeFantasia.toLowerCase().includes(filters.nome.toLowerCase())
      );
    }
    if (filters.cnpj) {
      const cleanedCnpj = filters.cnpj.replace(/[^\d]/g, '');
      clients = clients.filter(c => c.cnpj.replace(/[^\d]/g, '').includes(cleanedCnpj));
    }
    if (filters.status) {
      clients = clients.filter(c => c.status === filters.status);
    }
    if (filters.conectaPlus) {
      clients = clients.filter(c => c.conectaPlus === filters.conectaPlus);
    }

    setFilteredClients(clients);
  }, [filters, visibleClients]);

  const handleClearFilters = () => {
    setFilters({ nome: '', cnpj: '', status: '', conectaPlus: '' });
  };

  return (
    <div className={styles.contentWrapper}>
      <h1 className={styles.pageTitle}>Dados Básicos</h1>
      <Filters
        filters={filters}
        onFilterChange={setFilters}
        onClear={handleClearFilters}
      />
      <ClientTable clients={filteredClients} />
    </div>
  );
}

export default ClientManager;
