import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, UserRole } from '../store/useAuthStore';
import { AlertCircle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <AlertCircle size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Acesso Restrito</h1>
        <p className="text-slate-500 max-w-md text-center">
          Você não tem permissão para acessar esta funcionalidade. 
          Entre em contato com o administrador se acreditar que isso é um erro.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
