import React from 'react';
import { 
  Users, 
  Clock, 
  Stethoscope, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar as CalendarIcon, 
  Plus,
  UserPlus
} from 'lucide-react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { usePatients } from '../hooks/usePatients';
import { useAppointments } from '../hooks/useAppointments';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';

const STATS_CONFIG = [
  { name: 'Pacientes Hoje', value: '10', icon: Users, color: 'bg-blue-500', trend: '+12%', trendUp: true },
  { name: 'Aguardando', value: '4', icon: Clock, color: 'bg-amber-500', trend: '-2', trendUp: false },
  { name: 'Em atendimento', value: '2', icon: Stethoscope, color: 'bg-indigo-500', trend: 'Estável', trendUp: true },
  { name: 'Tratamentos ativos', value: '24', icon: CheckCircle2, color: 'bg-emerald-500', trend: '+5', trendUp: true },
];

export const DashboardPage = () => {
  const { data: appointments, isLoading: isLoadingAppointments } = useAppointments();

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Olá, Dr Batman!</h1>
          <p className="text-slate-500">Aqui está o resumo da sua clínica hoje.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
            <CalendarIcon size={18} />
            Ver Agenda
          </Button>
          <Button className="gap-2 flex-1 sm:flex-none">
            <Plus size={18} />
            Nova Consulta
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS_CONFIG.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn('p-3 rounded-xl text-white', stat.color)}>
                  <stat.icon size={24} />
                </div>
                <div className={cn(
                  'flex items-center text-xs font-medium px-2 py-1 rounded-full',
                  stat.trendUp ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
                )}>
                  {stat.trendUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                  {stat.trend}
                </div>
              </div>
              <h3 className="text-slate-500 text-sm font-medium">{stat.name}</h3>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card 
          className="lg:col-span-2" 
          title="Agenda do Dia" 
          subtitle="Próximas consultas agendadas para hoje"
          headerAction={<Button variant="ghost" size="sm">Ver todos</Button>}
        >
          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="pb-4 px-6">Paciente</th>
                  <th className="pb-4 px-6">Horário</th>
                  <th className="pb-4 px-6">Procedimento</th>
                  <th className="pb-4 px-6">Status</th>
                  <th className="pb-4 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoadingAppointments ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">Carregando agenda...</td>
                  </tr>
                ) : (
                  appointments?.map((apt) => (
                    <tr key={apt.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                            {apt.patientName.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-slate-900">{apt.patientName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">{apt.time}</td>
                      <td className="py-4 px-6 text-sm text-slate-600">{apt.type}</td>
                      <td className="py-4 px-6">
                        <Badge variant={apt.status === 'Finalizada' ? 'success' : 'warning'}>
                          {apt.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Button variant="ghost" size="sm">Abrir ficha</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <aside className="space-y-8">
          <Card title="Ações Rápidas">
            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" className="justify-start gap-3 h-12 w-full">
                <UserPlus size={18} className="text-indigo-600" />
                Novo Paciente
              </Button>
              <Button variant="outline" className="justify-start gap-3 h-12 w-full">
                <CalendarIcon size={18} className="text-indigo-600" />
                Nova Consulta
              </Button>
              <Button variant="outline" className="justify-start gap-3 h-12 w-full">
                <Stethoscope size={18} className="text-indigo-600" />
                Novo Tratamento
              </Button>
            </div>
          </Card>

          <Card title="Resumo Financeiro" subtitle="Mês atual">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Receita</span>
                <span className="text-sm font-semibold text-emerald-600">{formatCurrency(12450.00)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Despesas</span>
                <span className="text-sm font-semibold text-rose-600">{formatCurrency(4200.00)}</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-base font-bold text-slate-900">Saldo</span>
                <span className="text-base font-bold text-indigo-600">{formatCurrency(8250.00)}</span>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};
