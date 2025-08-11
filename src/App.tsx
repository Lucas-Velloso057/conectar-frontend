import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'src/contexts/AuthContext';

import { PrivateRoute } from 'src/routes/PrivateRoutes';
import { PublicRoute } from 'src/routes/PublicRoutes';

import { LoginPage } from 'src/views/public/login/LoginPage';
import { RegisterPage } from 'src/views/public/register/RegisterPage';
import { privateRoutesList } from 'src/routes/PrivateRoutes.config';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            {privateRoutesList.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>

          <Route path="*" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
