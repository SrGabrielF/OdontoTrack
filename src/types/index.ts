export type UserRole = 'receptionist' | 'dentist';

export interface Patient {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  gender: 'Masculino' | 'Feminino' | 'Outro';
  phone: string;
  email: string;
  address: {
    cep: string;
    street: string;
    number: string;
    city: string;
    state: string;
  };
  medicalHistory: string;
  observations: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  dentistId: string;
  dentistName: string;
  date: string;
  time: string;
  type: string;
  status: 'Agendada' | 'Em andamento' | 'Finalizada' | 'Cancelada';
  observations?: string;
}

export interface Treatment {
  id: string;
  patientId: string;
  patientName: string;
  description: string;
  value: number;
  date: string;
  status: 'Aprovado' | 'Em andamento' | 'Enviado' | 'Reprovado';
  procedures: {
    name: string;
    tooth?: string;
    specialty: string;
    value: number;
  }[];
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  specialty?: string;
  email: string;
  phone: string;
}

export interface FinancialRecord {
  id: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  value: number;
  date: string;
  status: 'paid' | 'pending';
}
