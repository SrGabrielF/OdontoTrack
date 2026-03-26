import { Patient, Appointment, Treatment, StaffMember, FinancialRecord } from '../types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Maria Oliveira',
    cpf: '123.456.789-00',
    birthDate: '1990-05-15',
    gender: 'Feminino',
    phone: '(11) 98765-4321',
    email: 'maria@email.com',
    address: {
      cep: '01001-000',
      street: 'Praça da Sé',
      number: '100',
      city: 'São Paulo',
      state: 'SP',
    },
    medicalHistory: 'Nenhuma alergia conhecida.',
    observations: 'Paciente prefere horários matutinos.',
    createdAt: '2024-01-09',
  },
  {
    id: '2',
    name: 'João Pedro Santos',
    cpf: '987.654.321-00',
    birthDate: '1985-10-20',
    gender: 'Masculino',
    phone: '(11) 91234-5678',
    email: 'joao@email.com',
    address: {
      cep: '04571-010',
      street: 'Av. Engenheiro Luís Carlos Berrini',
      number: '500',
      city: 'São Paulo',
      state: 'SP',
    },
    medicalHistory: 'Hipertenso.',
    observations: '',
    createdAt: '2024-02-14',
  },
  {
    id: '3',
    name: 'Ana Carolina Lima',
    cpf: '456.789.123-00',
    birthDate: '1995-03-12',
    gender: 'Feminino',
    phone: '(11) 95555-1234',
    email: 'anacarolina@email.com',
    address: {
      cep: '01310-100',
      street: 'Av. Paulista',
      number: '1500',
      city: 'São Paulo',
      state: 'SP',
    },
    medicalHistory: '',
    observations: '',
    createdAt: '2024-01-19',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Maria Oliveira',
    dentistId: 'd1',
    dentistName: 'Dr. Carlos Silva',
    date: '2026-03-20',
    time: '09:00',
    type: 'Avaliação',
    status: 'Em andamento',
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'João Pedro Santos',
    dentistId: 'd2',
    dentistName: 'Dra. Ana Santos',
    date: '2026-03-20',
    time: '10:30',
    type: 'Limpeza',
    status: 'Em andamento',
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Ana Carolina Lima',
    dentistId: 'd3',
    dentistName: 'Dr. Roberto Lima',
    date: '2026-03-20',
    time: '14:00',
    type: 'Ortodontia',
    status: 'Em andamento',
  },
];

export const mockTreatments: Treatment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Maria Oliveira',
    description: 'Tratamento de Canal',
    value: 1750.0,
    date: '2024-02-29',
    status: 'Aprovado',
    procedures: [
      { name: 'Tratamento de Canal', specialty: 'Endodontia', value: 800 },
      { name: 'Extração Complexa', specialty: 'Cirurgia', value: 350 },
      { name: 'Clareamento', specialty: 'Estética', value: 600 },
    ],
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'João Pedro Santos',
    description: 'Implante Dentário',
    value: 2000.0,
    date: '2024-03-04',
    status: 'Enviado',
    procedures: [
      { name: 'Implante', specialty: 'Implantodontia', value: 2000 },
    ],
  },
];

export const mockStaff: StaffMember[] = [
  {
    id: 'd1',
    name: 'Dr. Carlos Silva',
    role: 'Dentista',
    specialty: 'Endodontia',
    email: 'carlos@odonto.com',
    phone: '(11) 99999-0001',
  },
  {
    id: 'd2',
    name: 'Dra. Ana Santos',
    role: 'Dentista',
    specialty: 'Ortodontia',
    email: 'ana@odonto.com',
    phone: '(11) 99999-0002',
  },
  {
    id: 'r1',
    name: 'Juliana Lima',
    role: 'Recepcionista',
    email: 'juliana@odonto.com',
    phone: '(11) 99999-0003',
  },
];

export const mockFinancial: FinancialRecord[] = [
  {
    id: '1',
    type: 'income',
    category: 'Tratamento',
    description: 'Pagamento Maria Oliveira',
    value: 1750.0,
    date: '2024-03-20',
    status: 'paid',
  },
  {
    id: '2',
    type: 'expense',
    category: 'Materiais',
    description: 'Compra de luvas e máscaras',
    value: 450.0,
    date: '2024-03-19',
    status: 'paid',
  },
];
