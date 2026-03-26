import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PatientsPage } from '../pages/PatientsPage';

// Placeholder pages for other routes
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
    <h1 className="text-2xl font-bold mb-2">{title}</h1>
    <p>Esta página está em desenvolvimento.</p>
  </div>
);

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<LoginPage />} /> {/* Reusing login for demo */}
        
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/pacientes" element={<PatientsPage />} />
          <Route path="/pacientes/novo" element={<Placeholder title="Novo Paciente" />} />
          <Route path="/agenda" element={<Placeholder title="Agenda" />} />
          <Route path="/consultas" element={<Placeholder title="Painel de Consultas" />} />
          <Route path="/tratamentos" element={<Placeholder title="Painel de Tratamentos" />} />
          <Route path="/historico" element={<Placeholder title="Histórico Geral" />} />
          <Route path="/equipe" element={<Placeholder title="Equipe Clínica" />} />
          <Route path="/financeiro" element={<Placeholder title="Dashboard Financeiro" />} />
          <Route path="/financeiro/relatorios" element={<Placeholder title="Relatórios Financeiros" />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
