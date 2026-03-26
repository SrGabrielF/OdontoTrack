import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Placeholder for future integration
});

// Mocking API responses with delays
export const mockApi = {
  get: async <T>(url: string): Promise<{ data: T }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Simple routing for mocks
    if (url.includes('patients')) return { data: (await import('../mocks/data')).mockPatients as unknown as T };
    if (url.includes('appointments')) return { data: (await import('../mocks/data')).mockAppointments as unknown as T };
    if (url.includes('treatments')) return { data: (await import('../mocks/data')).mockTreatments as unknown as T };
    if (url.includes('staff')) return { data: (await import('../mocks/data')).mockStaff as unknown as T };
    if (url.includes('financial')) return { data: (await import('../mocks/data')).mockFinancial as unknown as T };
    throw new Error('Not found');
  },
  post: async <T>(url: string, data: any): Promise<{ data: T }> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { data: { ...data, id: Math.random().toString(36).substr(2, 9) } as T };
  },
};

export default api;
