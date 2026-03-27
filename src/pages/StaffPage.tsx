import React from 'react';
import { Plus, MoreHorizontal, User, Mail, Phone, Stethoscope } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

const mockStaff = [
  { id: '1', name: 'Dr. Carlos Silva', role: 'Dentista', specialty: 'Endodontia', email: 'carlos@odonto.com', phone: '(11) 99999-0001', status: 'Ativo' },
  { id: '2', name: 'Dra. Ana Santos', role: 'Dentista', specialty: 'Ortodontia', email: 'ana@odonto.com', phone: '(11) 99999-0002', status: 'Ativo' },
  { id: '3', name: 'Dr. Roberto Lima', role: 'Dentista', specialty: 'Estética', email: 'roberto@odonto.com', phone: '(11) 99999-0004', status: 'Ativo' },
  { id: '4', name: 'Juliana Lima', role: 'Recepcionista', specialty: '-', email: 'juliana@odonto.com', phone: '(11) 99999-0003', status: 'Ativo' },
];

export const StaffPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestão de equipe clínica</h1>
          <p className="text-slate-500">Gerencie os profissionais e colaboradores da clínica.</p>
        </div>
        <Button className="gap-2">
          <Plus size={18} />
          Adicionar
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="pb-4 px-6">Profissional</th>
                <th className="pb-4 px-6">Cargo/Especialidade</th>
                <th className="pb-4 px-6">Contato</th>
                <th className="pb-4 px-6">Status</th>
                <th className="pb-4 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockStaff.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200">
                        <User size={18} />
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col text-sm">
                      <span className="font-medium text-slate-900">{item.role}</span>
                      <span className="text-slate-500 text-xs">{item.specialty}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col text-xs space-y-1">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail size={12} className="text-slate-400" />
                        {item.email}
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone size={12} className="text-slate-400" />
                        {item.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant="success">
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
