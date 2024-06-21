import getUserInfo from './getUserInfo';
import { useQuery } from '@tanstack/react-query';
import { UserInformation } from '@/hooks/useUserProfile';

export const useGetProfile = () => {
  return useQuery<UserInformation>({
    queryKey: ['user'],
    queryFn: getUserInfo,
    refetchOnWindowFocus: true,
  });
};
