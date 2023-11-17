import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { LoginResponse } from 'src/helpers/type';
import * as userLocalStorage from 'src/helpers/userLocalStorage';

async function getUser(user: LoginResponse | null | undefined): Promise<LoginResponse | null> {
  if (!user) return null;
  const response = await fetch(`users/get/${user.user.id}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  });
  if (!response.ok) throw new ResponseError('Failed on get user request', response);

  return await response.json();
}
interface IUseUser {
  user: LoginResponse | null;
}
export function useUser(): IUseUser {
  const { data: user } = useQuery<LoginResponse | null>(
    ['user'],
    async (): Promise<LoginResponse | null> => getUser(user),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      initialData: userLocalStorage.getUser,
      onSuccess: () => {
        console.log('test', user);
      },
      onError: () => {
        userLocalStorage.removeUser();
      }
    }
  );

  useEffect(() => {
    console.log('test', user);
    if (!user) userLocalStorage.removeUser();
    else userLocalStorage.saveUser(user);
  }, [user]);

  return {
    user: user ?? null
  };
}
