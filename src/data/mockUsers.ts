import { IUser } from 'src/interfaces/IUser';

export const mockUsers: IUser[] = [
  {
    id: 'user-01',
    name: 'Administrador Conecta',
    email: 'admin@conecta.com',
    password: '123',
    role: 'admin',
    assignedClientIds: [],
  },
  {
    id: 'user-02',
    name: 'Usuário Padrão',
    email: 'user@conecta.com',
    password: '123',
    role: 'user',
    assignedClientIds: ['2', '5'], 
  },
];
