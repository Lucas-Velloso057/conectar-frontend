import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import styles from './Filters.module.css';
import { FilterState } from '../../ClientManager';
import { useState } from 'react';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: React.Dispatch<React.SetStateAction<FilterState>>;
  onClear: () => void;
}

export function Filters({ filters, onFilterChange, onClear }: FiltersProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleChange = (field: keyof FilterState, value: string) => {
    onFilterChange(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className={styles.filtersContainer}>
      <header
        className={styles.filterHeader}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={styles.headerTitle}>
          <Search size={20} />
          <h3>Filtros</h3>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </header>

      {isExpanded && (
        <div className={styles.filterBody}>
          <div className={styles.inputGroup}>
            <label htmlFor="search-name">Buscar por nome</label>
            <input
              id="search-name"
              type="text"
              placeholder="Filtre e busque itens na página"
              value={filters.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="search-cnpj">Buscar por CNPJ</label>
            <input
              id="search-cnpj"
              type="text"
              value={filters.cnpj}
              onChange={(e) => handleChange('cnpj', e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="search-status">Buscar por status</label>
            <select
              id="search-status"
              value={filters.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="search-conecta">Buscar por conectar+</label>
            <select
              id="search-conecta"
              value={filters.conectaPlus}
              onChange={(e) => handleChange('conectaPlus', e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.clearButton} onClick={onClear}>
              Limpar campos
            </button>
            <button type="button" className={styles.filterButton}>
              Filtrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
