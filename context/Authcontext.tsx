// context/AuthContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/apis/auth/auth';
import { FormValues, PostAuthLoginRes, UserInfo } from '@/apis/auth/auth.type';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

interface ErrorMessage {
  message: string;
}

interface AuthContextProps {
  user: PostAuthLoginRes | null;
  signIn: (data: FormValues) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<PostAuthLoginRes | null>(null);
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    if (accessToken) {
      auth
        .getUser()
        .then((data) => {
          setUser({
            accessToken: accessToken as string,
            refreshToken: refreshToken as string,
            user: data as UserInfo,
          });
        })
        .catch(() => {
          setUser(null);
        });
    }
  }, []);

  const signInMutation = useMutation({
    mutationFn: (data: FormValues) => auth.login(data),
    mutationKey: ['signIn'],
    onSuccess: (data: PostAuthLoginRes) => {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      if (data.accessToken) {
        Cookies.set('accessToken', data.accessToken, {
          expires: 7,
        });
        Cookies.set('refreshToken', data.refreshToken, { expires: 7 }); // 7일 동안 유효
        Cookies.set('userID', data.user.id.toString(), { expires: 7 }); // userID를 쿠키에 설정
        setUser(data);
        router.push('/');
      }
    },
    onError: (error: AxiosError<ErrorMessage>) => {
      console.error(error);
      throw error;
    },
  });

  const signIn = async (data: FormValues) => {
    try {
      await signInMutation.mutateAsync(data); // 비동기로 실행하고 성공하지 않으면 자동으로 에러를 던짐
    } catch (error) {
      throw error; // 에러를 던짐
    }
  };

  const signOut = () => {
    setUser(null);
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('userID');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
