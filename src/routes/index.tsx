import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PatientsPage } from '../pages/PatientsPage';
import { PatientFormPage } from '../pages/PatientFormPage';
import { AppointmentFormPage } from '../pages/AppointmentFormPage';
import { TreatmentFormPage } from '../pages/TreatmentFormPage';
import { TreatmentsPage } from '../pages/TreatmentsPage';
import { AppointmentsPage } from '../pages/AppointmentsPage';
import { AgendaPage } from '../pages/AgendaPage';
import { StaffPage } from '../pages/StaffPage';
import { ConsultationHistoryPage } from '../pages/ConsultationHistoryPage';
import { TreatmentConsultationDetailsPage } from '../pages/TreatmentConsultationDetailsPage';
import { ProtectedRoute } from '../components/ProtectedRoute';

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
        <Route path="/cadastro" element={<SignupPage />} />
        
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          
          {/* Pacientes */}
          <Route path="/pacientes" element={<ProtectedRoute allowedRoles={['receptionist', 'dentist']}><PatientsPage /></ProtectedRoute>} />
          <Route path="/pacientes/novo" element={<ProtectedRoute allowedRoles={['receptionist']}><PatientFormPage /></ProtectedRoute>} />
          
          {/* Agenda e Consultas */}
          <Route path="/agenda" element={<ProtectedRoute allowedRoles={['receptionist']}><AgendaPage /></ProtectedRoute>} />
          <Route path="/consultas" element={<ProtectedRoute allowedRoles={['receptionist', 'dentist']}><AppointmentsPage /></ProtectedRoute>} />
          <Route path="/consultas/novo" element={<ProtectedRoute allowedRoles={['receptionist', 'dentist']}><AppointmentFormPage /></ProtectedRoute>} />
          
          {/* Tratamentos */}
          <Route path="/tratamentos" element={<ProtectedRoute allowedRoles={['dentist']}><TreatmentsPage /></ProtectedRoute>} />
          <Route path="/tratamentos/novo" element={<ProtectedRoute allowedRoles={['dentist']}><TreatmentFormPage /></ProtectedRoute>} />
          
          {/* Gestão Interna */}
          <Route path="/historico" element={<ProtectedRoute allowedRoles={['dentist']}><ConsultationHistoryPage /></ProtectedRoute>} />
          <Route path="/tratamento-consultas" element={<ProtectedRoute allowedRoles={['dentist']}><TreatmentConsultationDetailsPage /></ProtectedRoute>} />
          <Route path="/equipe" element={<ProtectedRoute allowedRoles={['dentist']}><StaffPage /></ProtectedRoute>} />
          
          {/* Financeiro */}
          <Route path="/financeiro" element={<ProtectedRoute allowedRoles={['dentist']}><Placeholder title="Dashboard Financeiro" /></ProtectedRoute>} />
          <Route path="/financeiro/relatorios" element={<ProtectedRoute allowedRoles={['dentist']}><Placeholder title="Relatórios Financeiros" /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
