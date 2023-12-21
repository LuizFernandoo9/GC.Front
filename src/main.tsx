import React, { Fragment, lazy } from 'react'
import { createRoot } from 'react-dom/client';
import './Init';
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import Loader from './Components/Layouts/Loader/Loader';

import { AuthProvider } from './Context/AuthProvider';
import ColaboradorPage from './Pages/ColaboradorPage/ColaboradorPage';

const Indexpage = lazy(() => import('./Components/indexpage/Indexpage'));
const Auth = lazy(() => import('./Authentication/Auth'));
const LoginColaborador = lazy(() => import('./Authentication/LoginColaborador'));
//const LoginPaciente = lazy(() => import('./Authentication/LoginPaciente'));


const CargoPage = lazy(() => import('./Pages/CargoPage/CargoPage'));


const container: any = document.getElementById('root'); 

const root = createRoot(container);

root.render(
  <Fragment>
    <BrowserRouter>
      <AuthProvider>
        <React.Suspense fallback={<Loader />}>
          <Routes>

            {/* Authentication Routes */}
            <Route path={`${import.meta.env.BASE_URL}loginColaborador`} element={<Auth />}>
              <Route index element={<LoginColaborador />} />
            </Route>

            {/* Authentication Routes */}
            <Route path={`${import.meta.env.BASE_URL}loginPaciente`} element={<Auth />}>
            </Route>

            <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
              <Route index element={<Indexpage />} />
              <Route path={`${import.meta.env.BASE_URL}indexpage`} element={<Indexpage />} />

              {/* Pages - Cadastro */}
              <Route>
                <Route path={`${import.meta.env.BASE_URL}cargo`} element={<CargoPage />} />
              </Route>

              <Route>
                <Route path={`${import.meta.env.BASE_URL}colaborador`} element={<ColaboradorPage />} />
              </Route>
            </Route>

          </Routes>

        </React.Suspense>
      </AuthProvider>
    </BrowserRouter>
  </Fragment>
)
