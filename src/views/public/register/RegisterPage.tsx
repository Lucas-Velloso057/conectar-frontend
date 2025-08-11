import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from 'src/views/public/login/LoginPage.module.css';
import logo from '/conecta_logo.png';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsRegistering(true);
    console.log('Simulando cadastro com:', { name, email });

    await new Promise(resolve => setTimeout(resolve, 1500));

    alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
    setIsRegistering(false);
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="Conecta Logo" />
      </div>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleRegister}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Nome Completo</label>
            <input
              id="name"
              type="text"
              placeholder="Digite seu nome completo"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu melhor email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Crie uma senha forte"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton} disabled={isRegistering}>
            {isRegistering ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        <p className={styles.registerLink}>
          Já tem uma conta? <Link to="/login">Faça o login</Link>
        </p>
      </div>
    </div>
  );
}
