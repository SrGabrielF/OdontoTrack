import React from 'react';
import { Search, Filter, Download, Printer, Calendar, Clock, User, MoreHorizontal, ChevronRight, Stethoscope, ClipboardList, FileText, CheckCircle2, Clock3 } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';
import { cn } from '../lib/utils';

const mockTreatments = [
  { id: '1', date: '20/03/2026', patient: 'Maria Oliveira', procedure: 'Limpeza e Profilaxia', status: 'Finalizada', value: 250.00 },
  { id: '2', date: '15/03/2026', patient: 'Maria Oliveira', procedure: 'Avaliação Ortodôntica', status: 'Finalizada', value: 150.00 },
  { id: '3', date: '10/03/2026', patient: 'Maria Oliveira', procedure: 'Restauração Resina', status: 'Finalizada', value: 350.00 },
];

const mockConsultations = [
  { id: '1', date: '20/03/2026', time: '09:00', professional: 'Dr. Carlos Silva', status: 'Finalizada' },
  { id: '2', date: '15/03/2026', time: '14:30', professional: 'Dra. Ana Santos', status: 'Finalizada' },
  { id: '3', date: '10/03/2026', time: '10:00', professional: 'Dr. Roberto Lima', status: 'Finalizada' },
];

export const TreatmentConsultationDetailsPage = () => {
  const [activeTab, setActiveTab] = React.useState<'treatments' | 'consultations'>('treatments');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tratamento e Consultas</h1>
          <p className="text-slate-500">Visualize o histórico detalhado de tratamentos e consultas de um paciente.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-white">
            <Download size={18} />
            Exportar
          </Button>
          <Button variant="outline" className="gap-2 bg-white">
            <Printer size={18} />
            Imprimir
          </Button>
        </div>
      </div>

      <div className="flex items-center p-1 bg-slate-200 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('treatments')}
          className={cn(
            "px-6 py-2 text-sm font-bold rounded-lg transition-all",
            activeTab === 'treatments' ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 hover:text-slate-900"
          )}
        >
          Histórico de Tratamentos
        </button>
        <button
          onClick={() => setActiveTab('consultations')}
          className={cn(
            "px-6 py-2 text-sm font-bold rounded-lg transition-all",
            activeTab === 'consultations' ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 hover:text-slate-900"
          )}
        >
          Histórico de Consultas
        </button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Buscar por paciente..." 
              className="pl-10"
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 bg-white">
              <Calendar size={18} />
              Período
            </Button>
            <Button variant="outline" className="gap-2 bg-white">
              <Filter size={18} />
              Filtros
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-8">
        {activeTab === 'treatments' ? (
          <div className="space-y-6">
            <Card title="Histórico de Tratamentos" subtitle="Últimos tratamentos realizados">
              <div className="overflow-x-auto -mx-6">
                <table className="w-full text-left min-w-[400px]">
                  <thead>
                    <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      <th className="pb-4 px-6">Data</th>
                      <th className="pb-4 px-6">Procedimento</th>
                      <th className="pb-4 px-6">Status</th>
                      <th className="pb-4 px-6 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {mockTreatments.map((item) => (
                      <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 text-sm font-semibold text-slate-900">{item.date}</td>
                        <td className="py-4 px-6 text-sm text-slate-600">{item.procedure}</td>
                        <td className="py-4 px-6">
                          <Badge variant="success">{item.status}</Badge>
                        </td>
                        <td className="py-4 px-6 text-right text-sm font-bold text-slate-900">
                          R$ {item.value.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <Card title="Histórico de Consultas" subtitle="Últimas consultas realizadas">
              <div className="overflow-x-auto -mx-6">
                <table className="w-full text-left min-w-[400px]">
                  <thead>
                    <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      <th className="pb-4 px-6">Data/Hora</th>
                      <th className="pb-4 px-6">Profissional</th>
                      <th className="pb-4 px-6">Status</th>
                      <th className="pb-4 px-6 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {mockConsultations.map((item) => (
                      <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-900">{item.date}</span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Clock size={12} />
                              {item.time}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600">{item.professional}</td>
                        <td className="py-4 px-6">
                          <Badge variant="success">{item.status}</Badge>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <Button variant="ghost" size="sm" className="text-indigo-600">Ver Detalhes</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
