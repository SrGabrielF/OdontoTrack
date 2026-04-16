import { useQuery } from '@tanstack/react-query';
import { treatmentService } from '../services/treatmentService';

export const useTreatments = () => {
  return useQuery({
    queryKey: ['treatments'],
    queryFn: treatmentService.getAll,
  });
};
