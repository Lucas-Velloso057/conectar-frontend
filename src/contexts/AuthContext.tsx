import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { mockUsers } from 'src/data/mockUsers';
import { IUser } from 'src/interfaces/IUser';

interface AuthContextType {
  isAuthenticated: boolean;
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // NOTA DE ARQUITETURA:
    // Em um ambiente de produção, o token JWT não seria armazenado no localStorage
    // devido a vulnerabilidades de XSS. A abordagem ideal seria usar cookies HttpOnly,
    // configurados pelo backend, que não são acessíveis via JavaScript no frontend.
    // Para este desafio, como estamos simulando o frontend de forma isolada,
    // o localStorage é utilizado para persistir a sessão do usuário entre recargas.
    const token = localStorage.getItem('conecta:token');
    if (token) {
      try {
        const decodedUser: IUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        logout();
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          const token = `header.${btoa(JSON.stringify(foundUser))}.signature`;
          localStorage.setItem('conecta:token', token);
          setUser(foundUser);
          navigate('/');
          resolve();
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('conecta:token');
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
