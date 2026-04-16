import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Plus, Trash2, User, FileText, DollarSign } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { formatCurrency } from '../lib/utils';

export const TreatmentFormPage = () => {
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState('2');
  const [procedures, setProcedures] = useState([
    { id: '1', name: 'Tratamento de Canal', tooth: '-', specialty: 'Endodontia', value: 800 },
    { id: '2', name: 'Extração Complexa', tooth: '-', specialty: 'Cirurgia', value: 350 },
    { id: '3', name: 'Clareamento', tooth: '-', specialty: 'Estética', value: 600 },
  ]);

  const totalValue = procedures.reduce((acc, curr) => acc + curr.value, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving treatment plan:', { patientId, procedures, totalValue });
    navigate('/tratamentos');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Novo Plano de Tratamento</h1>
            <p className="text-slate-500">Crie um orçamento com os procedimentos necessários.</p>
          </div>
        </div>
        <div className="flex p-1 bg-slate-200 rounded-xl">
          <Button type="button" variant="ghost" size="sm" className="rounded-lg text-slate-600">Gerar uma consulta</Button>
          <Button type="button" variant="primary" size="sm" className="rounded-lg">Gerar um tratamento</Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card title="Paciente">
          <div className="max-w-md">
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Selecione o paciente para o plano de tratamento</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select 
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="2">João Pedro Santos - 987.654.321-00</option>
                <option value="1">Maria Oliveira - 123.456.789-00</option>
              </select>
            </div>
          </div>
        </Card>

        <Card title="Adicionar Procedimento">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Procedimento</label>
              <select className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Selecione o procedimento</option>
                <option value="1">Limpeza</option>
                <option value="2">Restauração</option>
                <option value="3">Extração</option>
              </select>
            </div>
            <div>
              <Input label="Dente" placeholder="Ex: 16" />
            </div>
            <Button type="button" className="gap-2">
              <Plus size={18} />
              Adicionar
            </Button>
          </div>
        </Card>

        <Card title="Procedimentos do Tratamento" subtitle={`${procedures.length} procedimento(s) adicionado(s)`}>
          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="pb-4 px-6">Procedimento</th>
                  <th className="pb-4 px-6">Dente</th>
                  <th className="pb-4 px-6">Especialidade</th>
                  <th className="pb-4 px-6">Valor</th>
                  <th className="pb-4 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {procedures.map((proc) => (
                  <tr key={proc.id} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-slate-900">{proc.name}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{proc.tooth}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{proc.specialty}</td>
                    <td className="py-4 px-6">
                      <div className="relative max-w-[120px]">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input 
                          type="number" 
                          defaultValue={proc.value}
                          className="w-full h-9 rounded-lg border border-slate-200 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 min-w-[240px]">
              <div className="flex items-center justify-between text-lg font-bold">
                <span className="text-slate-600">Valor Total:</span>
                <span className="text-indigo-600">{formatCurrency(totalValue)}</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)} className="gap-2">
            Cancelar
          </Button>
          <Button type="button" variant="outline" onClick={handleSubmit} className="gap-2">
            <FileText size={18} />
            Salvar Rascunho
          </Button>
          <Button type="submit" className="gap-2 px-8">
            <Save size={18} />
            Enviar para Aprovação
          </Button>
        </div>
      </form>
    </div>
  );
};
