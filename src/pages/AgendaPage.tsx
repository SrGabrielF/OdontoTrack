import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, User, Clock } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { cn } from '../lib/utils';

const days = [
  { date: 15, name: 'Dom' },
  { date: 16, name: 'Seg' },
  { date: 17, name: 'Ter' },
  { date: 18, name: 'Qua' },
  { date: 19, name: 'Qui' },
  { date: 20, name: 'Sex', active: true },
  { date: 21, name: 'Sáb' },
];

const appointments = [
  { time: '09:00', patient: 'Maria Oliveira', dentist: 'Dr. Carlos Silva', status: 'Confirmado' },
  { time: '10:30', patient: 'João Pedro Santos', dentist: 'Dra. Ana Santos', status: 'Aguardando' },
  { time: '14:00', patient: 'Ana Carolina Lima', dentist: 'Dr. Roberto Lima', status: 'Confirmado' },
];

export const AgendaPage = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Agenda</h1>
        <Button onClick={() => navigate('/consultas/novo')} className="gap-2">
          <Plus size={18} />
          Novo Agendamento
        </Button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex p-1 bg-slate-100 rounded-lg">
            <button className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900">Dia</button>
            <button className="px-4 py-1.5 text-sm font-medium bg-white text-indigo-600 shadow-sm rounded-md">Semana</button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"><ChevronLeft size={20} /></button>
              <Button variant="outline" size="sm">Hoje</Button>
              <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"><ChevronRight size={20} /></button>
            </div>
            <h2 className="text-lg font-bold text-slate-900">Março 2026</h2>
          </div>
        </div>

        <div className="grid grid-cols-7 border-t border-slate-100">
          {days.map((day) => (
            <div key={day.date} className={cn(
              "p-4 border-r border-slate-100 text-center space-y-1",
              day.active && "bg-indigo-50/30"
            )}>
              <p className="text-xs font-semibold text-slate-400 uppercase">{day.name}</p>
              <p className={cn(
                "text-xl font-bold",
                day.active ? "text-indigo-600" : "text-slate-900"
              )}>{day.date}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 min-h-[500px] border-t border-slate-100">
          {days.map((day) => (
            <div key={day.date} className={cn(
              "border-r border-slate-100 p-2 space-y-3",
              day.active ? "bg-indigo-50/10" : "bg-white"
            )}>
              {day.active ? (
                appointments.map((apt, i) => (
                  <div key={i} className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm space-y-2 hover:border-indigo-300 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-indigo-600">
                        <Clock size={12} />
                        <span className="text-[10px] font-bold">{apt.time}</span>
                      </div>
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        apt.status === 'Confirmado' ? "bg-emerald-500" : "bg-amber-500"
                      )} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 truncate">{apt.patient}</p>
                      <p className="text-[10px] text-slate-500 truncate">{apt.dentist}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[10px] text-slate-300 text-center mt-4">Sem agendamentos</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 border-t border-slate-100 pt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-500">Confirmado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-xs text-slate-500">Aguardando</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="text-xs text-slate-500">Cancelado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <span className="text-xs text-slate-500">Concluído</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
