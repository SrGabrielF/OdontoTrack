import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, FileText, ArrowLeft, Save, X } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useCreatePatient } from '../hooks/usePatients';

export const PatientFormPage = () => {
  const navigate = useNavigate();
  const createPatient = useCreatePatient();
  const [formData, setFormData] = React.useState({
    name: '',
    cpf: '',
    birthDate: '',
    gender: 'Masculino',
    phone: '',
    email: '',
    address: {
      cep: '',
      street: '',
      number: '',
      city: '',
      state: '',
    },
    medicalHistory: '',
    observations: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPatient.mutateAsync(formData);
    navigate('/pacientes');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Novo Paciente</h1>
            <p className="text-slate-500">Cadastre um novo paciente no sistema.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dados Pessoais */}
        <Card title="Dados Pessoais" className="overflow-visible">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input 
                label="Nome Completo *" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Digite o nome completo" 
                required 
              />
            </div>
            <Input 
              label="CPF *" 
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="000.000.000-00" 
              required 
            />
            <Input 
              label="Data de Nascimento *" 
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              type="date" 
              required 
            />
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Sexo *</label>
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Contato */}
        <Card title="Contato">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Telefone *" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(00) 00000-0000" 
              required 
              icon={<Phone size={16} />} 
            />
            <Input 
              label="E-mail" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email" 
              placeholder="email@exemplo.com" 
              icon={<FileText size={16} />} 
            />
          </div>
        </Card>

        {/* Endereço */}
        <Card title="Endereço">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input 
              label="CEP" 
              name="address.cep"
              value={formData.address.cep}
              onChange={handleChange}
              placeholder="00000-000" 
            />
            <div className="md:col-span-2">
              <Input 
                label="Rua" 
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                placeholder="Nome da rua" 
              />
            </div>
            <Input 
              label="Número" 
              name="address.number"
              value={formData.address.number}
              onChange={handleChange}
              placeholder="Nº" 
            />
            <Input 
              label="Cidade" 
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              placeholder="Cidade" 
            />
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Estado</label>
              <select 
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Selecione</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
                <option value="ES">Espírito Santo</option>
                <option value="PR">Paraná</option>
                <option value="SC">Santa Catarina</option>
                <option value="RS">Rio Grande do Sul</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Informações Adicionais */}
        <Card title="Informações Adicionais">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Histórico Médico</label>
              <textarea 
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                className="w-full min-h-[100px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Doenças, alergias, medicamentos em uso..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Observações</label>
              <textarea 
                name="observations"
                value={formData.observations}
                onChange={handleChange}
                className="w-full min-h-[100px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Observações gerais sobre o paciente..."
              />
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)} className="gap-2">
            <X size={18} />
            Cancelar
          </Button>
          <Button type="submit" className="gap-2 px-8">
            <Save size={18} />
            Salvar Paciente
          </Button>
        </div>
      </form>
    </div>
  );
};
