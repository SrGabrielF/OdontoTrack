import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit2, Lock, Trash2, FileText } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Dropdown } from '../components/Dropdown';
import { usePatients } from '../hooks/usePatients';
import { formatCPF, cn } from '../lib/utils';

export const PatientsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: patients, isLoading } = usePatients();

  const isReceptionist = user?.role === 'receptionist';

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pacientes</h1>
          <p className="text-slate-500">Gerencie todos os pacientes cadastrados na clínica.</p>
        </div>
        <Button 
          onClick={() => navigate('/pacientes/novo')} 
          className="gap-2 w-full sm:w-auto"
          variant={isReceptionist ? "primary" : "secondary"}
          disabled={!isReceptionist}
          title={!isReceptionist ? "Acesso restrito à Recepção" : ""}
        >
          <Plus size={18} />
          Novo Paciente
          {!isReceptionist && <Lock size={14} />}
        </Button>
      </header>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nome, CPF ou telefone..."
              icon={<Search size={18} />}
            />
          </div>
          <Button variant="outline" className="gap-2 w-full md:w-auto">
            <Filter size={18} />
            Filtros
          </Button>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="pb-4 px-6">Paciente</th>
                <th className="pb-4 px-6">CPF</th>
                <th className="pb-4 px-6">Contato</th>
                <th className="pb-4 px-6">Cadastro</th>
                <th className="pb-4 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">Carregando pacientes...</td>
                </tr>
              ) : (
                patients?.map((patient) => (
                  <tr key={patient.id} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div 
                        className={cn(
                          "flex items-center gap-3 group/name cursor-pointer",
                          isReceptionist && "opacity-60 cursor-not-allowed"
                        )}
                        onClick={() => !isReceptionist && navigate(`/pacientes/${patient.id}`)}
                        title={isReceptionist ? "Acesso restrito ao Dentista" : ""}
                      >
                        <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold border border-slate-200 group-hover/name:bg-indigo-50 group-hover/name:text-indigo-600 group-hover/name:border-indigo-200 transition-all">
                          {!isReceptionist ? patient.name.split(' ').map(n => n[0]).join('').substring(0, 2) : <Lock size={16} />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 group-hover/name:text-indigo-600 transition-colors">{patient.name}</p>
                          <p className="text-xs text-slate-500">{patient.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">{formatCPF(patient.cpf)}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{patient.phone}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{new Date(patient.createdAt).toLocaleDateString('pt-BR')}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => !isReceptionist && navigate(`/pacientes/${patient.id}`)}
                          className={cn(
                            "p-2 rounded-lg transition-all",
                            !isReceptionist 
                              ? "text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" 
                              : "text-slate-300 cursor-not-allowed opacity-50"
                          )}
                          title={isReceptionist ? "Acesso restrito ao Dentista" : "Visualizar Histórico"}
                        >
                          {isReceptionist ? <Lock size={18} /> : <Eye size={18} />}
                        </button>
                        <button 
                          onClick={() => isReceptionist && navigate('/pacientes/novo')}
                          className={cn(
                            "p-2 rounded-lg transition-all",
                            isReceptionist 
                              ? "text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" 
                              : "text-slate-300 cursor-not-allowed opacity-50"
                          )}
                          title={!isReceptionist ? "Acesso restrito à Recepção" : "Editar"}
                        >
                          {isReceptionist ? <Edit2 size={18} /> : <Lock size={18} />}
                        </button>
                        <Dropdown
                          trigger={
                            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all" title="Mais opções">
                              <MoreHorizontal size={18} />
                            </button>
                          }
                          items={[
                            { label: 'Prontuário', icon: <FileText size={14} />, onClick: () => navigate(`/pacientes/${patient.id}`) },
                            { label: 'Nova Consulta', icon: <Plus size={14} />, onClick: () => console.log('New appointment', patient.id) },
                            { label: 'Excluir', icon: <Trash2 size={14} />, onClick: () => console.log('Delete', patient.id), variant: 'danger' },
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
