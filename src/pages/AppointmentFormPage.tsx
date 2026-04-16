import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Calendar, Clock, User, Stethoscope } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export const AppointmentFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    patientId: '',
    dentistId: '',
    date: '',
    time: '',
    observations: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would call a service here
    console.log('Saving appointment:', formData);
    navigate('/consultas');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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
            <h1 className="text-2xl font-bold text-slate-900">Nova Consulta</h1>
            <p className="text-slate-500">Registre uma nova consulta e avaliação.</p>
          </div>
        </div>
        <div className="flex p-1 bg-slate-200 rounded-xl">
          <Button type="button" variant="primary" size="sm" className="rounded-lg">Gerar uma consulta</Button>
          <Button type="button" variant="ghost" size="sm" className="rounded-lg text-slate-600">Gerar um tratamento</Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card title="Dados da Consulta">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Paciente *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <select 
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  required
                  className="flex h-10 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Selecione um paciente</option>
                  <option value="1">Maria Oliveira - 123.456.789-00</option>
                  <option value="2">João Pedro Santos - 987.654.321-00</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Profissional Responsável *</label>
              <select 
                name="dentistId"
                value={formData.dentistId}
                onChange={handleChange}
                required
                className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Selecione o profissional</option>
                <option value="d1">Dr. Carlos Silva</option>
                <option value="d2">Dra. Ana Santos</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Data *" 
                name="date"
                type="date" 
                value={formData.date}
                onChange={handleChange}
                required 
              />
              <Input 
                label="Hora *" 
                name="time"
                type="time" 
                value={formData.time}
                onChange={handleChange}
                required 
                icon={<Clock size={16} />} 
              />
            </div>
          </div>
        </Card>

        <Card title="Observações Clínicas">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Anotações e observações sobre a consulta</label>
            <textarea 
              name="observations"
              value={formData.observations}
              onChange={handleChange}
              className="w-full min-h-[120px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Descreva as observações clínicas, sintomas relatados, etc."
            />
          </div>
        </Card>

        <div className="flex items-center justify-between pt-4">
          <Button type="button" variant="outline" className="gap-2">
            Avaliação Odontológica
            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs">Adicionar Odontograma</span>
          </Button>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="gap-2">
              <X size={18} />
              Cancelar
            </Button>
            <Button type="submit" className="gap-2 px-8">
              <Save size={18} />
              Salvar Consulta
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
