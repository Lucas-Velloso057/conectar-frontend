import ClientManager from 'src/views/private/clientManager/ClientManager';
import { ClientFormPage } from 'src/views/private/clientForm/ClientFormPage';
import { UserProfilePage } from 'src/views/private/userProfile/UserProfilePage';
import { UserManagerPage } from 'src/views/private/userManager/UserManagerPage';
import { UserFormPage } from 'src/views/private/userForm/UserFormPage';
import { RouteConfig } from 'src/interfaces/IPrivateRoute';

export const privateRoutesList: RouteConfig[] = [
  {
    path: '/',
    component: ClientManager,
  },
  {
    path: '/gerenciar-clientes',
    component: ClientManager,
  },
  {
    path: '/novo',
    component: ClientFormPage,
    adminOnly: true,
  },
  {
    path: '/editar/:id',
    component: ClientFormPage,
  },
  {
    path: '/perfil',
    component: UserProfilePage,
  },
  {
    path: '/usuarios',
    component: UserManagerPage,
    adminOnly: true,
  },
  {
    path: '/usuarios/novo',
    component: UserFormPage,
    adminOnly: true,
  },
  {
    path: '/usuarios/editar/:id',
    component: UserFormPage,
    adminOnly: true,
  },
];
