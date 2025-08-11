import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from 'src/contexts/AuthContext';
import { InfoCadastraisForm } from './components/infoCadastrais/InfoCadastraisForm';
import { mockClients } from 'src/data/mockClients';
import { IClient } from 'src/interfaces/IClient';
import styles from './ClientFormPage.module.css';

type ActiveTab = 'dadosCadastrais' | 'informacoesInternas' | 'usuarios';

export function ClientFormPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dadosCadastrais');
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientData, setClientData] = useState<Partial<IClient> | null>(null);
  
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const clientToEdit = mockClients.find(client => client.id === id);
      if (clientToEdit) {
        setClientData(clientToEdit);
      } else {
        alert('Cliente não encontrado!');
        navigate('/gerenciar-clientes');
      }
    }
  }, [id, isEditMode, navigate]);

  const handleSave = async () => {
    setIsProcessing(true);
    const action = isEditMode ? 'PUT' : 'POST';
    console.log(`1. Iniciando simulação de chamada ${action} /clients...`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    try {
      console.log('2. Sucesso! Cliente salvo (mock).');
      alert(`Cliente ${isEditMode ? 'atualizado' : 'salvo'} com sucesso!`);
      navigate('/gerenciar-clientes');
    } catch (error) {
      console.error('2. Erro! Falha ao salvar cliente (mock).');
      alert('Houve um erro ao salvar o cliente. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.')) {
      return;
    }

    setIsProcessing(true);
    console.log(`1. Iniciando simulação de chamada DELETE /clients/${id}...`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    try {
      console.log('2. Sucesso! Cliente excluído (mock).');
      alert('Cliente excluído com sucesso!');
      navigate('/gerenciar-clientes');
    } catch (error) {
      console.error('2. Erro! Falha ao excluir cliente (mock).');
      alert('Houve um erro ao excluir o cliente. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.formHeader}>
        <h2>{isEditMode ? 'Editar Cliente' : 'Novo Cliente'}</h2>
        <div className={styles.actions}>
          {isEditMode && user?.role === 'admin' && (
            <button
              type="button"
              className={styles.deleteButton}
              onClick={handleDelete}
              disabled={isProcessing}
            >
              Excluir
            </button>
          )}
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => navigate('/gerenciar-clientes')}
            disabled={isProcessing}
          >
            Cancelar
          </button>
          <button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processando...' : 'Salvar'}
          </button>
        </div>
      </header>

      <nav className={styles.tabNav}>
        <button
          onClick={() => setActiveTab('dadosCadastrais')}
          className={`${styles.tabButton} ${activeTab === 'dadosCadastrais' ? styles.active : ''}`}
        >
          Dados Cadastrais
        </button>
        <button
          onClick={() => setActiveTab('informacoesInternas')}
          className={`${styles.tabButton} ${activeTab === 'informacoesInternas' ? styles.active : ''}`}
        >
          Informações internas
        </button>
        <button
          onClick={() => setActiveTab('usuarios')}
          className={`${styles.tabButton} ${activeTab === 'usuarios' ? styles.active : ''}`}
        >
          Usuários
        </button>
      </nav>

      <div className={styles.tabContent}>
        {activeTab === 'dadosCadastrais' && <InfoCadastraisForm initialData={clientData} />}
      </div>
    </div>
  );
}
