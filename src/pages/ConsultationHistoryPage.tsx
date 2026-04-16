import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download, Printer, Calendar, Clock, User, MoreHorizontal, ChevronRight, FileText, Edit2, Trash2 } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';
import { Dropdown } from '../components/Dropdown';

import { useAppointments } from '../hooks/useAppointments';

export const ConsultationHistoryPage = () => {
  const navigate = useNavigate();
  const { data: appointments, isLoading } = useAppointments();

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
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">Carregando histórico...</td>
                </tr>
              ) : (
                appointments?.map((item) => (
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
                        <span className="text-sm font-medium text-slate-900">{item.patientName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">{item.dentistName || 'Dr. Carlos Silva'}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{item.type || 'Consulta'}</td>
                    <td className="py-4 px-6">
                      <Badge variant={item.status === 'Finalizada' ? 'success' : 'warning'}>{item.status}</Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-indigo-600 gap-1"
                          onClick={() => navigate(`/pacientes/${item.patientId}`)}
                        >
                          Ver Prontuário
                          <ChevronRight size={14} />
                        </Button>
                        <Dropdown
                          trigger={
                            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                              <MoreHorizontal size={18} />
                            </button>
                          }
                          items={[
                            { label: 'Ver Prontuário', icon: <FileText size={14} />, onClick: () => navigate(`/pacientes/${item.patientId}`) },
                            { label: 'Editar Registro', icon: <Edit2 size={14} />, onClick: () => console.log('Edit', item.id) },
                            { label: 'Excluir', icon: <Trash2 size={14} />, onClick: () => console.log('Delete', item.id), variant: 'danger' },
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
