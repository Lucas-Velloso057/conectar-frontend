import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from 'src/contexts/AuthContext';
import { mockUsers } from 'src/data/mockUsers';
import { mockClients } from 'src/data/mockClients';
import { IUser } from 'src/interfaces/IUser';
import { MultiSelectClients } from './components/multiSelectClients/MultiSelectClients';
import styles from './UserFormPage.module.css';

export function UserFormPage() {
  const [formData, setFormData] = useState<Partial<IUser>>({
    name: '',
    email: '',
    role: 'user',
    assignedClientIds: [],
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user: loggedInUser } = useAuth();
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const userToEdit = mockUsers.find(u => u.id === id);
      if (userToEdit) {
        setFormData(userToEdit);
      }
    }
  }, [id, isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClientAssignmentChange = (clientId: string) => {
    setFormData(prev => {
      const assignedIds = prev.assignedClientIds || [];
      const newAssignedIds = assignedIds.includes(clientId)
        ? assignedIds.filter(id => id !== clientId)
        : [...assignedIds, clientId];
      return { ...prev, assignedClientIds: newAssignedIds };
    });
  };

  const handleSave = async () => {
    setIsProcessing(true);
    console.log('Simulando salvamento do usuário:', formData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert(`Usuário ${isEditMode ? 'atualizado' : 'criado'} com sucesso!`);
    setIsProcessing(false);
    navigate('/usuarios');
  };

  if (loggedInUser?.role !== 'admin') {
    return <div>Acesso negado.</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.formHeader}>
        <h2>{isEditMode ? 'Editar Usuário' : 'Novo Usuário'}</h2>
        <div className={styles.actions}>
          <button type="button" className={styles.cancelButton} onClick={() => navigate('/usuarios')}>
            Cancelar
          </button>
          <button type="button" className={styles.saveButton} onClick={handleSave} disabled={isProcessing}>
            {isProcessing ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </header>
      <div className={styles.formContent}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Nome Completo</label>
          <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="role">Nível de Acesso</label>
          <select id="role" name="role" value={formData.role} onChange={handleInputChange}>
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        {formData.role === 'user' && (
          <div className={styles.clientAssignmentSection}>
            <h3>Clientes Atribuídos</h3>
            <MultiSelectClients
              allClients={mockClients}
              selectedClientIds={formData.assignedClientIds || []}
              onChange={handleClientAssignmentChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
