import { LoginResponse } from 'src/helpers/type';

const USER_LOCAL_STORAGE_KEY = 'USER';

export function saveUser(user: LoginResponse): void {
  console.log('user', user);
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
}

export function getUser(): LoginResponse | undefined {
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return user ? JSON.parse(user) : undefined;
}

export function removeUser(): void {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}
