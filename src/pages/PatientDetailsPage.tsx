import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Search, Filter, Download, Printer, Calendar, Clock, User, 
  MoreHorizontal, ChevronRight, Stethoscope, ClipboardList, 
  FileText, CheckCircle2, Clock3, Phone, Mail, MapPin, 
  AlertCircle, Activity, Heart, ArrowLeft, Plus
} from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';
import { cn } from '../lib/utils';
import { usePatients } from '../hooks/usePatients';

const mockTreatments = [
  { id: '1', patientId: '1', date: '20/03/2026', procedure: 'Limpeza e Profilaxia', status: 'Finalizada', value: 250.00, dentist: 'Dr. Carlos Silva' },
  { id: '2', patientId: '1', date: '15/03/2026', procedure: 'Avaliação Ortodôntica', status: 'Finalizada', value: 150.00, dentist: 'Dra. Ana Santos' },
  { id: '3', patientId: '1', date: '10/03/2026', procedure: 'Restauração Resina', status: 'Finalizada', value: 350.00, dentist: 'Dr. Roberto Lima' },
  { id: '4', patientId: '2', date: '18/03/2026', procedure: 'Extração', status: 'Finalizada', value: 450.00, dentist: 'Dr. Carlos Silva' },
];

const mockConsultations = [
  { id: '1', patientId: '1', date: '20/03/2026', time: '09:00', professional: 'Dr. Carlos Silva', status: 'Finalizada', notes: 'Paciente apresenta boa higiene bucal.' },
  { id: '2', patientId: '1', date: '15/03/2026', time: '14:30', professional: 'Dra. Ana Santos', status: 'Finalizada', notes: 'Início do planejamento ortodôntico.' },
  { id: '3', patientId: '1', date: '10/03/2026', time: '10:00', professional: 'Dr. Roberto Lima', status: 'Finalizada', notes: 'Restauração realizada no dente 24.' },
  { id: '4', patientId: '2', date: '18/03/2026', time: '11:00', professional: 'Dr. Carlos Silva', status: 'Finalizada', notes: 'Extração do dente 38 realizada com sucesso.' },
];

export const PatientDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: patients } = usePatients();
  const [activeTab, setActiveTab] = React.useState<'overview' | 'treatments' | 'consultations' | 'anamnesis'>('overview');

  const patient = patients?.find(p => p.id === id) || {
    name: 'Carregando...',
    email: '-',
    phone: '-',
    cpf: '-',
    createdAt: new Date().toISOString()
  };

  const patientTreatments = mockTreatments.filter(t => t.patientId === id);
  const patientConsultations = mockConsultations.filter(c => c.patientId === id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Prontuário do Paciente</h1>
            <p className="text-slate-500">Histórico clínico e informações detalhadas.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-white">
            <Printer size={18} />
            Imprimir Prontuário
          </Button>
          <Button className="gap-2">
            <Plus size={18} />
            Nova Evolução
          </Button>
        </div>
      </div>

      {/* Patient Header Card */}
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-indigo-600 h-24 -mx-6 -mt-6 mb-12 relative">
          <div className="absolute -bottom-10 left-8">
            <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-xl">
              <div className="w-full h-full rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl font-bold border-2 border-white">
                {patient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-6 pt-2">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">{patient.name}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Mail size={14} className="text-slate-400" />
                {patient.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={14} className="text-slate-400" />
                {patient.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <FileText size={14} className="text-slate-400" />
                CPF: {patient.cpf}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="success" className="h-fit">Paciente Ativo</Badge>
            <Badge variant="warning" className="h-fit">Ortodontia</Badge>
          </div>
        </div>
      </Card>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl w-fit overflow-x-auto max-w-full">
        <button
          onClick={() => setActiveTab('overview')}
          className={cn(
            "px-4 py-2 text-sm font-bold rounded-lg transition-all whitespace-nowrap",
            activeTab === 'overview' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
          )}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setActiveTab('anamnesis')}
          className={cn(
            "px-4 py-2 text-sm font-bold rounded-lg transition-all whitespace-nowrap",
            activeTab === 'anamnesis' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
          )}
        >
          Anamnese
        </button>
        <button
          onClick={() => setActiveTab('treatments')}
          className={cn(
            "px-4 py-2 text-sm font-bold rounded-lg transition-all whitespace-nowrap",
            activeTab === 'treatments' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
          )}
        >
          Tratamentos
        </button>
        <button
          onClick={() => setActiveTab('consultations')}
          className={cn(
            "px-4 py-2 text-sm font-bold rounded-lg transition-all whitespace-nowrap",
            activeTab === 'consultations' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
          )}
        >
          Consultas
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="border-l-4 border-l-rose-500">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                      <AlertCircle size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900">Alertas Médicos</h3>
                  </div>
                  <p className="text-sm text-slate-600">Alérgico a Penicilina. Hipertenso controlado.</p>
                </Card>
                <Card className="border-l-4 border-l-indigo-500">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <Activity size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900">Última Evolução</h3>
                  </div>
                  <p className="text-sm text-slate-600">Paciente relatou sensibilidade no dente 16 após profilaxia.</p>
                </Card>
              </div>

              <Card title="Linha do Tempo" subtitle="Atividades recentes do paciente">
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  {[
                    { type: 'consulta', title: 'Consulta de Retorno', date: '20/03/2026', icon: <Calendar size={14} />, color: 'bg-indigo-500' },
                    { type: 'tratamento', title: 'Limpeza e Profilaxia', date: '20/03/2026', icon: <Stethoscope size={14} />, color: 'bg-emerald-500' },
                    { type: 'documento', title: 'Raio-X Panorâmico Anexado', date: '15/03/2026', icon: <FileText size={14} />, color: 'bg-amber-500' },
                  ].map((item, i) => (
                    <div key={i} className="relative flex items-center gap-6 pl-10">
                      <div className={cn("absolute left-0 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm z-10", item.color)}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {activeTab === 'anamnesis' && (
            <Card title="Ficha de Anamnese" subtitle="Informações de saúde geral">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Saúde Geral</h4>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-700">Está sob tratamento médico?</p>
                      <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">Sim, para hipertensão.</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-700">Toma algum medicamento?</p>
                      <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">Losartana 50mg.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Hábitos</h4>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-700">Fumante?</p>
                      <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">Não.</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-700">Pratica esportes?</p>
                      <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">Caminhada 3x por semana.</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <Button variant="outline" className="w-full gap-2">
                    <Edit2 size={16} />
                    Editar Anamnese
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'treatments' && (
            <Card title="Histórico de Tratamentos" subtitle="Procedimentos realizados e em aberto">
              <div className="overflow-x-auto -mx-6">
                <table className="w-full text-left min-w-[400px]">
                  <thead>
                    <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      <th className="pb-4 px-6">Data</th>
                      <th className="pb-4 px-6">Procedimento</th>
                      <th className="pb-4 px-6">Dentista</th>
                      <th className="pb-4 px-6">Status</th>
                      <th className="pb-4 px-6 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {patientTreatments.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-500 italic">Nenhum tratamento registrado para este paciente.</td>
                      </tr>
                    ) : (
                      patientTreatments.map((item) => (
                        <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-6 text-sm font-semibold text-slate-900">{item.date}</td>
                          <td className="py-4 px-6 text-sm text-slate-600">{item.procedure}</td>
                          <td className="py-4 px-6 text-sm text-slate-600">{item.dentist}</td>
                          <td className="py-4 px-6">
                            <Badge variant="success">{item.status}</Badge>
                          </td>
                          <td className="py-4 px-6 text-right text-sm font-bold text-slate-900">
                            R$ {item.value.toFixed(2)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeTab === 'consultations' && (
            <Card title="Histórico de Consultas" subtitle="Registro de todas as visitas">
              <div className="space-y-4">
                {patientConsultations.length === 0 ? (
                  <div className="py-8 text-center text-slate-500 italic">Nenhuma consulta registrada para este paciente.</div>
                ) : (
                  patientConsultations.map((item) => (
                    <div key={item.id} className="p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all group">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-sm">
                            <Calendar size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{item.date} às {item.time}</p>
                            <p className="text-xs text-slate-500">{item.professional}</p>
                          </div>
                        </div>
                        <Badge variant="success">{item.status}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 bg-white/50 p-3 rounded-lg border border-slate-100 italic">
                        "{item.notes}"
                      </p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card title="Próxima Consulta">
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-600 text-white rounded-lg">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Agendado para</p>
                  <p className="text-sm font-bold text-slate-900">25/03/2026 às 10:00</p>
                </div>
              </div>
              <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200">
                Ver na Agenda
              </Button>
            </div>
          </Card>

          <Card title="Documentos">
            <div className="space-y-3">
              {[
                { name: 'Raio-X Panorâmico', size: '2.4 MB', date: '15/03/2026' },
                { name: 'Contrato de Prestação', size: '1.1 MB', date: '10/03/2026' },
                { name: 'Termo de Consentimento', size: '0.8 MB', date: '10/03/2026' },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-lg transition-all">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{doc.name}</p>
                      <p className="text-[10px] text-slate-500">{doc.size} • {doc.date}</p>
                    </div>
                  </div>
                  <Download size={14} className="text-slate-300 group-hover:text-indigo-600" />
                </div>
              ))}
              <Button variant="outline" className="w-full gap-2 mt-2 border-dashed">
                <Plus size={16} />
                Anexar Arquivo
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Edit2 = ({ size }: { size: number }) => <FileText size={size} />;
