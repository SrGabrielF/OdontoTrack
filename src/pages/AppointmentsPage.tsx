import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MoreHorizontal, Calendar, Clock, User, Filter, Download, Printer, Stethoscope, Lock, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';
import { Dropdown } from '../components/Dropdown';
import { useAuthStore } from '../store/useAuthStore';
import { cn } from '../lib/utils';

const mockAppointments = [
  { id: '1', patientId: '1', patient: 'Maria Oliveira', phone: '(11) 98765-4321', date: '20/03/2026', time: '09:00', dentist: 'Dr. Carlos Silva', status: 'Em Andamento' },
  { id: '2', patientId: '2', patient: 'João Pedro Santos', phone: '(11) 91234-5678', date: '20/03/2026', time: '10:30', dentist: 'Dra. Ana Santos', status: 'Em Andamento' },
  { id: '3', patientId: '3', patient: 'Ana Carolina Lima', phone: '(11) 95555-1234', date: '20/03/2026', time: '14:00', dentist: 'Dr. Roberto Lima', status: 'Em Andamento' },
];

export const AppointmentsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const isReceptionist = user?.role === 'receptionist';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lista de consultas</h1>
          <p className="text-slate-500">Gerencie todas as consultas e avaliações da clínica.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download size={18} />
            Baixar PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer size={18} />
            Imprimir
          </Button>
        </div>
      </div>

      <Card 
        title="Consultas" 
        subtitle="Gerencie todas as consultas e avaliações"
        headerAction={(
          <Button onClick={() => navigate('/consultas/novo')} className="gap-2">
            <Plus size={18} />
            Nova Consulta
          </Button>
        )}
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input placeholder="Buscar por paciente ou profissional..." icon={<Search size={18} />} />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={18} />
            Filtrar
          </Button>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="pb-4 px-6">Paciente</th>
                <th className="pb-4 px-6">Data/Hora</th>
                <th className="pb-4 px-6">Profissional</th>
                <th className="pb-4 px-6">Status</th>
                <th className="pb-4 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockAppointments.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div 
                      className={cn(
                        "flex items-center gap-3 group/name cursor-pointer",
                        isReceptionist && "opacity-60 cursor-not-allowed"
                      )}
                      onClick={() => !isReceptionist && navigate(`/pacientes/${item.patientId}`)}
                      title={isReceptionist ? "Acesso restrito ao Dentista" : ""}
                    >
                      <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover/name:bg-indigo-100 transition-all">
                        {!isReceptionist ? <User size={18} /> : <Lock size={16} />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 group-hover/name:text-indigo-600 transition-colors">{item.patient}</p>
                        <p className="text-xs text-slate-500">{item.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col text-sm">
                      <div className="flex items-center gap-2 text-slate-900 font-medium">
                        <Calendar size={14} className="text-slate-400" />
                        {item.date}
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock size={14} className="text-slate-400" />
                        {item.time}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Stethoscope size={16} className="text-slate-400" />
                      {item.dentist}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant="warning">
                      {item.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Dropdown
                      trigger={
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreHorizontal size={18} />
                        </button>
                      }
                      items={[
                        { label: 'Finalizar', icon: <CheckCircle2 size={14} />, onClick: () => console.log('Finish', item.id) },
                        { label: 'Editar', icon: <Edit2 size={14} />, onClick: () => console.log('Edit', item.id) },
                        { label: 'Cancelar', icon: <Trash2 size={14} />, onClick: () => console.log('Cancel', item.id), variant: 'danger' },
                      ]}
                    />
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
