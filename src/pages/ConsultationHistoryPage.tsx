import React from 'react';
import { Search, Filter, Download, Printer, Calendar, Clock, User, MoreHorizontal, ChevronRight } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';

const mockHistory = [
  { id: '1', date: '20/03/2026', time: '09:00', patient: 'Maria Oliveira', professional: 'Dr. Carlos Silva', procedure: 'Limpeza e Profilaxia', status: 'Finalizada' },
  { id: '2', date: '19/03/2026', time: '14:30', patient: 'João Pedro Santos', professional: 'Dra. Ana Santos', procedure: 'Avaliação Ortodôntica', status: 'Finalizada' },
  { id: '3', date: '18/03/2026', time: '10:00', patient: 'Ana Carolina Lima', professional: 'Dr. Roberto Lima', procedure: 'Restauração Resina', status: 'Finalizada' },
  { id: '4', date: '17/03/2026', time: '16:00', patient: 'Lucas Ferreira', professional: 'Dr. Carlos Silva', procedure: 'Extração Simples', status: 'Finalizada' },
  { id: '5', date: '15/03/2026', time: '11:00', patient: 'Beatriz Costa', professional: 'Dra. Ana Santos', procedure: 'Manutenção Aparelho', status: 'Finalizada' },
];

export const ConsultationHistoryPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Histórico Geral de Consultas</h1>
          <p className="text-slate-500">Visualize o registro completo de todos os atendimentos realizados.</p>
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

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Buscar por paciente ou profissional..." 
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

      <Card>
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="pb-4 px-6">Data/Hora</th>
                <th className="pb-4 px-6">Paciente</th>
                <th className="pb-4 px-6">Profissional</th>
                <th className="pb-4 px-6">Procedimento</th>
                <th className="pb-4 px-6">Status</th>
                <th className="pb-4 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockHistory.map((item) => (
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
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200">
                        <User size={14} />
                      </div>
                      <span className="text-sm font-medium text-slate-900">{item.patient}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">{item.professional}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{item.procedure}</td>
                  <td className="py-4 px-6">
                    <Badge variant="success">{item.status}</Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="text-indigo-600 gap-1">
                        Ver Prontuário
                        <ChevronRight size={14} />
                      </Button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
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
