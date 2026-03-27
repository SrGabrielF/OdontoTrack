import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Search, Plus, MoreHorizontal, FileText, CheckCircle2, Clock, Send, XCircle, User } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';

const stats = [
  { name: 'Aprovados', value: '10', icon: CheckCircle2, color: 'bg-emerald-500' },
  { name: 'Em andamento', value: '4', icon: Clock, color: 'bg-amber-500' },
  { name: 'Enviados', value: '2', icon: Send, color: 'bg-indigo-500' },
  { name: 'Reprovados', value: '2', icon: XCircle, color: 'bg-rose-500' },
];

const mockTreatments = [
  { id: '1', patient: 'Maria Oliveira', procedures: '2 procedimento(s)', value: 430.00, date: '29/02/2024', status: 'Aprovado' },
  { id: '2', patient: 'João Pedro Santos', procedures: '2 procedimento(s)', value: 2000.00, date: '04/03/2024', status: 'Enviado' },
];

export const TreatmentsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const isDentist = user?.role === 'dentist';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Lista de tratamentos</h1>
        <p className="text-slate-500">Gerencie os planos de tratamento e orçamentos da clínica.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Visão Geral</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className={cn('p-3 rounded-xl text-white', stat.color)}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <h3 className="text-slate-500 text-sm font-medium">{stat.name}</h3>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <Card 
        title="Planos de Tratamento" 
        subtitle="Gerencie os planos de tratamento e orçamentos"
        headerAction={isDentist ? (
          <Button onClick={() => navigate('/tratamentos/novo')} className="gap-2">
            <Plus size={18} />
            Novo Tratamento
          </Button>
        ) : undefined}
      >
        <div className="mb-6">
          <div className="max-w-md">
            <Input placeholder="Buscar por paciente..." icon={<Search size={18} />} />
          </div>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="pb-4 px-6">Paciente</th>
                <th className="pb-4 px-6">Procedimentos</th>
                <th className="pb-4 px-6">Valor Total</th>
                <th className="pb-4 px-6">Data</th>
                <th className="pb-4 px-6">Status</th>
                <th className="pb-4 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockTreatments.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div 
                      className="flex items-center gap-3 cursor-pointer group/name"
                      onClick={() => navigate('/tratamento-consultas')}
                    >
                      <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover/name:bg-indigo-100 transition-all">
                        <User size={16} />
                      </div>
                      <span className="text-sm font-medium text-slate-900 group-hover/name:text-indigo-600 transition-colors">{item.patient}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-slate-400" />
                      {item.procedures}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-emerald-600">
                    {formatCurrency(item.value)}
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">{item.date}</td>
                  <td className="py-4 px-6">
                    <Badge variant={item.status === 'Aprovado' ? 'success' : 'info'}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
