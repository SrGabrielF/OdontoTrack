import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { 
  Users, 
  Clock, 
  Stethoscope, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar as CalendarIcon, 
  Plus,
  UserPlus,
  Search,
  FilePlus,
  ChevronLeft,
  ChevronRight,
  Lock
} from 'lucide-react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { usePatients } from '../hooks/usePatients';
import { useAppointments } from '../hooks/useAppointments';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';

const stats = [
  { name: 'Pacientes', value: '124', change: '+12%', trend: 'up', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Consultas Hoje', value: '12', change: '+4', trend: 'up', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  { name: 'Tratamentos', value: '45', change: '+8%', trend: 'up', icon: Stethoscope, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { name: 'Concluídos', value: '89', change: '+15%', trend: 'up', icon: CheckCircle2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
];

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: patients } = usePatients();
  const { data: appointments, isLoading: isLoadingAppointments } = useAppointments();

  const isReceptionist = user?.role === 'receptionist';
  const isDentist = user?.role === 'dentist';

  return (
    <div className="space-y-8">
      {/* Seção FIXO - Busca e Ações Rápidas */}
      <Card className="p-4 bg-slate-50 border-slate-200">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="flex-1 w-full">
            <p className="text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Buscar Paciente</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Digite o CPF do paciente..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <Button 
              onClick={() => isReceptionist && navigate('/pacientes/novo')} 
              className={cn(
                "gap-2 flex-1 lg:flex-none",
                !isReceptionist && "opacity-50 cursor-not-allowed"
              )}
              variant={isReceptionist ? "default" : "secondary"}
            >
              <UserPlus size={18} />
              Novo Paciente
              {!isReceptionist && <Lock size={14} />}
            </Button>

            <Button 
              onClick={() => isDentist && navigate('/tratamentos/novo')} 
              variant="outline" 
              className={cn(
                "gap-2 flex-1 lg:flex-none bg-white",
                !isDentist && "opacity-50 cursor-not-allowed"
              )}
            >
              <FilePlus size={18} />
              Nova Ordem de Serviço
              {!isDentist && <Lock size={14} />}
            </Button>

            <Button 
              onClick={() => isReceptionist && navigate('/agenda')} 
              variant="outline" 
              className={cn(
                "gap-2 flex-1 lg:flex-none bg-white",
                !isReceptionist && "opacity-50 cursor-not-allowed"
              )}
            >
              <CalendarIcon size={18} />
              Visualizar agenda
              {!isReceptionist && <Lock size={14} />}
            </Button>
          </div>
        </div>
      </Card>

      {/* Indicadores do dia */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          Indicadores do dia
          <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Hoje, 20 Mar</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-md transition-shadow cursor-default group">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn('p-3 rounded-xl transition-colors', stat.bg, stat.color)}>
                    <stat.icon size={24} />
                  </div>
                  <div className={cn(
                    'flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg',
                    stat.trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
                  )}>
                    {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{stat.value}</p>
                  <h3 className="text-slate-500 text-sm font-medium">{stat.name}</h3>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Agenda Clínica */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Agenda Clínica" subtitle="Agendamentos para hoje">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Mini Calendário Mock */}
              <div className="w-full md:w-64 space-y-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-sm font-bold text-slate-900">Março 2026</span>
                  <div className="flex gap-1">
                    <button className="p-1 hover:bg-slate-100 rounded text-slate-400"><ChevronLeft size={16} /></button>
                    <button className="p-1 hover:bg-slate-100 rounded text-slate-400"><ChevronRight size={16} /></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                    <span key={`${d}-${i}`} className="text-[10px] font-bold text-slate-400">{d}</span>
                  ))}
                  {Array.from({ length: 31 }).map((_, i) => (
                    <button 
                      key={i} 
                      className={cn(
                        "h-8 w-8 text-xs rounded-lg flex items-center justify-center transition-all",
                        i + 1 === 20 ? "bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200" : "hover:bg-slate-50 text-slate-600"
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lista de Agendamentos */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">Consultas (3)</h4>
                  <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50">Ver todos</Button>
                </div>
                <div className="space-y-3">
                  {[
                    { time: '09:00', patient: 'Maria Oliveira', procedure: 'Limpeza', status: 'Confirmado' },
                    { time: '10:30', patient: 'João Pedro Santos', procedure: 'Avaliação', status: 'Aguardando' },
                    { time: '14:00', patient: 'Ana Carolina Lima', procedure: 'Restauração', status: 'Confirmado' },
                  ].map((apt, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer group">
                      <div className="text-center min-w-[50px]">
                        <p className="text-xs font-bold text-indigo-600">{apt.time}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{apt.patient}</p>
                        <p className="text-xs text-slate-500">{apt.procedure}</p>
                      </div>
                      <Badge variant={apt.status === 'Confirmado' ? 'success' : 'warning'}>{apt.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Fluxo de atendimento */}
          <Card 
            title="Fluxo de atendimento" 
            subtitle="Pacientes em atendimento no momento"
          >
            <div className="overflow-x-auto -mx-6">
              <table className="w-full text-left min-w-[500px]">
                <thead>
                  <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="pb-4 px-6">Paciente</th>
                    <th className="pb-4 px-6">Hora Chegada</th>
                    <th className="pb-4 px-6">Status</th>
                    <th className="pb-4 px-6 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isLoadingAppointments ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400">Carregando fluxo...</td>
                    </tr>
                  ) : (
                    appointments?.slice(0, 5).map((apt) => (
                      <tr key={apt.id} className="group hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6">
                          <div 
                            className={cn(
                              "flex items-center gap-3 group/name cursor-pointer",
                              !isDentist && "opacity-60 cursor-not-allowed"
                            )}
                            onClick={() => isDentist && navigate('/tratamento-consultas')}
                            title={!isDentist ? "Acesso restrito ao Dentista" : ""}
                          >
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200 group-hover/name:bg-indigo-50 group-hover/name:text-indigo-600 group-hover/name:border-indigo-200 transition-all">
                              {isDentist ? <Users size={16} /> : <Lock size={14} />}
                            </div>
                            <span className="text-sm font-medium text-slate-900 group-hover/name:text-indigo-600 transition-colors">{apt.patientName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600">{apt.time}</td>
                        <td className="py-4 px-6">
                          <Badge variant={apt.status === 'Finalizada' ? 'success' : 'warning'}>
                            {apt.status === 'Finalizada' ? 'Em Atendimento' : 'Aguardando'}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={cn(
                              "text-indigo-600",
                              !isDentist && "opacity-50 cursor-not-allowed"
                            )}
                            onClick={() => isDentist && navigate('/tratamento-consultas')}
                          >
                            Ver Detalhes
                            {!isDentist && <Lock size={12} className="ml-1" />}
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Sidebar de Resumo Financeiro */}
        <aside className="space-y-6">
          {isDentist && (
            <Card title="Resumo Financeiro" subtitle="Últimos 30 dias">
              <div className="space-y-6">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <p className="text-xs font-bold text-emerald-600 uppercase mb-1">Receita Total</p>
                  <p className="text-2xl font-bold text-emerald-700">{formatCurrency(12450.00)}</p>
                  <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
                    <ArrowUpRight size={14} />
                    <span>+12.5% em relação ao mês anterior</span>
                  </div>
                </div>

                <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
                  <p className="text-xs font-bold text-rose-600 uppercase mb-1">Despesas</p>
                  <p className="text-2xl font-bold text-rose-700">{formatCurrency(4200.00)}</p>
                  <div className="flex items-center gap-1 text-xs text-rose-600 mt-2">
                    <ArrowDownRight size={14} />
                    <span>+2.1% em relação ao mês anterior</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Tratamentos Pendentes</span>
                    <span className="text-sm font-bold text-slate-900">15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Valor Estimado</span>
                    <span className="text-sm font-bold text-indigo-600">{formatCurrency(8250.00)}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <Card title="Lembretes" subtitle="Notas rápidas">
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl">
                <p className="text-xs font-medium text-amber-800">Repor estoque de luvas e máscaras até sexta-feira.</p>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-xl">
                <p className="text-xs font-medium text-blue-800">Reunião com a equipe clínica às 18:00.</p>
              </div>
              <Button variant="ghost" size="sm" className="w-full text-slate-500 hover:text-indigo-600 gap-2">
                <Plus size={14} />
                Adicionar Lembrete
              </Button>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};
