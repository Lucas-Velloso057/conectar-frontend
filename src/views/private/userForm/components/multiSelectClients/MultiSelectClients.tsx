import { useState, useMemo } from 'react';
import styles from './MultiSelectClients.module.css';
import { IClient } from 'src/interfaces/IClient';

interface MultiSelectClientsProps {
  allClients: IClient[];
  selectedClientIds: string[];
  onChange: (clientId: string) => void;
}

export function MultiSelectClients({ allClients, selectedClientIds, onChange }: MultiSelectClientsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const selectedClients = useMemo(
    () => allClients.filter(client => selectedClientIds.includes(client.id)),
    [allClients, selectedClientIds]
  );

  const availableClients = useMemo(
    () => allClients.filter(client =>
      !selectedClientIds.includes(client.id) &&
      client.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [allClients, selectedClientIds, searchTerm]
  );

  return (
    <div className={styles.multiSelectContainer}>
      <div className={styles.selectedItems}>
        {selectedClients.map(client => (
          <div key={client.id} className={styles.pill}>
            {client.nomeFantasia}
            <button type="button" onClick={() => onChange(client.id)}>×</button>
          </div>
        ))}
      </div>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Pesquisar e adicionar clientes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        {isOpen && (
          <div className={styles.dropdown}>
            {availableClients.length > 0 ? (
              availableClients.map(client => (
                <div
                  key={client.id}
                  className={styles.dropdownItem}
                  onClick={() => {
                    onChange(client.id);
                    setSearchTerm('');
                  }}
                >
                  {client.nomeFantasia}
                </div>
              ))
            ) : (
              <div className={styles.noResults}>Nenhum cliente encontrado</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
