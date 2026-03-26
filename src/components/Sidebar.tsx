import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserPlus, 
  Calendar, 
  Users, 
  ClipboardList, 
  Stethoscope, 
  History, 
  UserRound, 
  FileText, 
  PieChart,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuthStore } from '../store/useAuthStore';

const menuItems = [
  {
    title: 'Recepção',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
      { name: 'Novo Paciente', icon: UserPlus, path: '/pacientes/novo' },
      { name: 'Agenda', icon: Calendar, path: '/agenda' },
      { name: 'Lista de Pacientes', icon: Users, path: '/pacientes' },
      { name: 'Painel de Consultas', icon: ClipboardList, path: '/consultas' },
      { name: 'Painel de Tratamentos', icon: Stethoscope, path: '/tratamentos' },
    ],
  },
  {
    title: 'Gestão Interna',
    items: [
      { name: 'Histórico Geral', icon: History, path: '/historico' },
      { name: 'Equipe Clínica', icon: UserRound, path: '/equipe' },
    ],
  },
  {
    title: 'Financeiro',
    items: [
      { name: 'Relatórios', icon: FileText, path: '/financeiro/relatorios' },
      { name: 'Dashboard Financeiro', icon: PieChart, path: '/financeiro' },
    ],
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
          <Stethoscope size={24} />
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">OdontoSaaS</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-8">
        {menuItems.map((section) => (
          <div key={section.title}>
            <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      'flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-all',
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                      {item.name}
                    </div>
                    {isActive && <ChevronRight size={14} />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2.5 w-full text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
        >
          <LogOut size={18} />
          Sair do Sistema
        </button>
      </div>
    </aside>
  );
};
