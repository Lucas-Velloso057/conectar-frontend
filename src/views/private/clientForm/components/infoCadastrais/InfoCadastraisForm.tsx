import { useState, useEffect } from 'react';
import styles from '../FormSections.module.css';
import { IClient } from 'src/interfaces/IClient';

interface InfoCadastraisFormProps {
  initialData: Partial<IClient> | null;
}

export function InfoCadastraisForm({ initialData }: InfoCadastraisFormProps) {
  const [formData, setFormData] = useState<Partial<IClient>>({
    nomeFantasia: '',
    cnpj: '',
    razaoSocial: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  const [loadingCep, setLoadingCep] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length !== 8) return;

    setLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setLoadingCep(false);
    }
  };

  return (
    <form className={styles.formSection}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Informações cadastrais</legend>
        <div className={styles.inputGroup}>
          <label htmlFor="nomeFantasia">Nome na fachada *</label>
          <input id="nomeFantasia" type="text" value={formData.nomeFantasia} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="cnpj">CNPJ *</label>
          <input id="cnpj" type="text" value={formData.cnpj} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="razaoSocial">Razão Social *</label>
          <input id="razaoSocial" type="text" value={formData.razaoSocial} onChange={handleChange} required />
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Endereço</legend>
        <div className={`${styles.inputGroup} ${styles.cepGroup}`}>
          <label htmlFor="cep">CEP *</label>
          <input id="cep" type="text" value={formData.cep} onChange={handleChange} onBlur={handleCepBlur} required />
          {loadingCep && <span className={styles.cepLoading}>Buscando...</span>}
        </div>
        <div className={`${styles.inputGroup} ${styles.streetGroup}`}>
          <label htmlFor="rua">Rua *</label>
          <input id="rua" type="text" value={formData.rua} onChange={handleChange} required />
        </div>
        <div className={`${styles.inputGroup} ${styles.numberGroup}`}>
          <label htmlFor="numero">Número *</label>
          <input id="numero" type="text" value={formData.numero} onChange={handleChange} required />
        </div>
        <div className={`${styles.inputGroup} ${styles.complementGroup}`}>
          <label htmlFor="complemento">Complemento</label>
          <input id="complemento" type="text" value={formData.complemento} onChange={handleChange} />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="bairro">Bairro *</label>
          <input id="bairro" type="text" value={formData.bairro} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="cidade">Cidade *</label>
          <input id="cidade" type="text" value={formData.cidade} onChange={handleChange} required />
        </div>
        <div className={`${styles.inputGroup} ${styles.stateGroup}`}>
          <label htmlFor="estado">Estado *</label>
          <input id="estado" type="text" value={formData.estado} onChange={handleChange} required />
        </div>
      </fieldset>
    </form>
  );
}
