import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add JWT Token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Global Errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Unauthorized: Logout user
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }

      if (status === 500) {
        console.error('Internal Server Error. Please try again later.');
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Mock API for development purposes.
 * In a real production environment, this would be replaced by actual backend calls.
 */
let localMockData: any = null;

const getLocalMockData = async () => {
  if (!localMockData) {
    const data = await import('../mocks/odontotrack-db.json');
    
    // Enrich data to match app types
    const enrichedPatients = data.patients.map((p: any) => ({
      ...p,
      id: String(p.id),
      gender: 'Feminino', // Default for mock
      address: { cep: '00000-000', street: 'Rua Exemplo', number: '123', city: 'Cidade', state: 'UF' },
      medicalHistory: '',
      observations: '',
    }));

    const enrichedAppointments = data.appointments.map((a: any) => {
      const patient = enrichedPatients.find((p: any) => p.id === String(a.patientId));
      return {
        ...a,
        id: String(a.id),
        patientId: String(a.patientId),
        patientName: patient?.name || 'Paciente Desconhecido',
        dentistId: 'd1',
        type: 'Consulta',
        status: a.status === 'scheduled' ? 'Agendada' : a.status === 'in_progress' ? 'Em andamento' : 'Finalizada',
      };
    });

    const enrichedTreatments = data.treatments.map((t: any) => {
      const patient = enrichedPatients.find((p: any) => p.id === String(t.patientId));
      return {
        ...t,
        id: String(t.id),
        patientId: String(t.patientId),
        patientName: patient?.name || 'Paciente Desconhecido',
        description: t.name,
        value: t.price,
        date: t.createdAt,
        status: t.status === 'approved' ? 'Aprovado' : t.status === 'in_progress' ? 'Em andamento' : t.status === 'sent' ? 'Enviado' : 'Reprovado',
        procedures: [{ name: t.name, specialty: 'Geral', value: t.price }],
      };
    });

    localMockData = {
      patients: enrichedPatients,
      appointments: enrichedAppointments,
      treatments: enrichedTreatments,
      staff: data.users.map((u: any) => ({ ...u, id: String(u.id), phone: '(00) 00000-0000' })),
      financial: [],
    };
  }
  return localMockData;
};

export const mockApi = {
  get: async <T>(url: string): Promise<{ data: T }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const data = await getLocalMockData();
    
    if (url.includes('patients')) return { data: data.patients as unknown as T };
    if (url.includes('appointments')) return { data: data.appointments as unknown as T };
    if (url.includes('treatments')) return { data: data.treatments as unknown as T };
    if (url.includes('staff')) return { data: data.staff as unknown as T };
    if (url.includes('financial')) return { data: data.financial as unknown as T };
    
    throw new Error('Endpoint not found in mock');
  },
  post: async <T>(url: string, payload: any): Promise<{ data: T }> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const data = await getLocalMockData();
    const newItem = { 
      ...payload, 
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (url.includes('patients')) data.patients.push(newItem);
    if (url.includes('appointments')) data.appointments.push(newItem);
    if (url.includes('treatments')) data.treatments.push(newItem);
    if (url.includes('staff')) data.staff.push(newItem);
    if (url.includes('financial')) data.financial.push(newItem);

    return { data: newItem as T };
  },
};

export default api;
