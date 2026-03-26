import { Search, Plus, Filter, MoreHorizontal, Eye, Edit2 } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { usePatients } from '../hooks/usePatients';
import { formatCPF } from '../lib/utils';

export const PatientsPage = () => {
  const { data: patients, isLoading } = usePatients();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pacientes</h1>
          <p className="text-slate-500">Gerencie todos os pacientes cadastrados na clínica.</p>
        </div>
        <Button className="gap-2">
          <Plus size={18} />
          Novo Paciente
        </Button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nome, CPF ou telefone..."
              icon={<Search size={18} />}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={18} />
            Filtros
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="pb-4 pl-4">Paciente</th>
                <th className="pb-4">CPF</th>
                <th className="pb-4">Contato</th>
                <th className="pb-4">Cadastro</th>
                <th className="pb-4 text-right pr-4">Ações</th>
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
                    <td className="py-4 pl-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold border border-slate-200">
                          {patient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{patient.name}</p>
                          <p className="text-xs text-slate-500">{patient.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-slate-600">{formatCPF(patient.cpf)}</td>
                    <td className="py-4 text-sm text-slate-600">{patient.phone}</td>
                    <td className="py-4 text-sm text-slate-600">{new Date(patient.createdAt).toLocaleDateString('pt-BR')}</td>
                    <td className="py-4 text-right pr-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreHorizontal size={18} />
                        </button>
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
