import { useQuery } from '@tanstack/react-query';
import { staffService } from '../services/staffService';

export const useStaff = () => {
  return useQuery({
    queryKey: ['staff'],
    queryFn: staffService.getAll,
  });
};
