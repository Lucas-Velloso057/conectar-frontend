import { useState } from 'react';
import { useAuth } from 'src/contexts/AuthContext';
import styles from './UserProfilePage.module.css';

export function UserProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
  });

  if (!user) {
    return <div>Carregando perfil...</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    console.log('Simulando atualização do perfil:', { name: formData.name });
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('Perfil atualizado com sucesso!');
    setIsProcessing(false);
    setIsEditing(false);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Meu Perfil</h1>
        {!isEditing && (
          <button className={styles.editButton} onClick={() => setIsEditing(true)}>
            Editar
          </button>
        )}
      </div>

      <form className={styles.profileCard} onSubmit={handleSave}>
        <div className={styles.infoGroup}>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className={styles.infoGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            disabled
          />
        </div>
        <div className={styles.infoGroup}>
          <label>Nível de Acesso</label>
          <p className={styles.role}>{user.role}</p>
        </div>

        {isEditing && (
          <>
            <div className={styles.divider}></div>
            <div className={styles.infoGroup}>
              <label htmlFor="newPassword">Nova Senha</label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Deixe em branco para não alterar"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}

        {isEditing && (
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setIsEditing(false)}
              disabled={isProcessing}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={isProcessing}
            >
              {isProcessing ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
