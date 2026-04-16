import React, { useState } from 'react';
import { Plus, MoreHorizontal, User, Mail, Phone, Edit2, Trash2, Shield } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Dropdown } from '../components/Dropdown';

import { useStaff } from '../hooks/useStaff';

export const StaffPage = () => {
  const { data: staff, isLoading } = useStaff();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestão de equipe clínica</h1>
          <p className="text-slate-500">Gerencie os profissionais e colaboradores da clínica.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="gap-2"
        >
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
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">Carregando equipe...</td>
                </tr>
              ) : (
                staff?.map((item) => (
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
                        <span className="font-medium text-slate-900">{item.role === 'dentist' ? 'Dentista' : 'Recepcionista'}</span>
                        <span className="text-slate-500 text-xs">{item.role === 'dentist' ? 'Clínico Geral' : '-'}</span>
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
                        Ativo
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
                          { label: 'Editar', icon: <Edit2 size={14} />, onClick: () => console.log('Edit', item.id) },
                          { label: 'Permissões', icon: <Shield size={14} />, onClick: () => console.log('Permissions', item.id) },
                          { label: 'Excluir', icon: <Trash2 size={14} />, onClick: () => console.log('Delete', item.id), variant: 'danger' },
                        ]}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Adicionar Profissional"
      >
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input label="Nome Completo" placeholder="Ex: Dr. João Silva" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Cargo</label>
              <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all">
                <option value="dentist">Dentista</option>
                <option value="receptionist">Recepcionista</option>
              </select>
            </div>
            <Input label="Especialidade" placeholder="Ex: Ortodontia" />
          </div>
          <Input label="E-mail" type="email" placeholder="email@exemplo.com" />
          <Input label="Telefone" placeholder="(00) 00000-0000" />
          
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button className="flex-1" onClick={() => setIsModalOpen(false)}>Salvar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
