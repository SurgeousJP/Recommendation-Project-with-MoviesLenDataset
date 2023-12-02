import axios, { AxiosResponse } from 'axios';
import Rating from 'src/types/Rating';
import { PaginatedMovieResponse, User } from './type';
import {
  TokenRefreshRequest,
  IAuthTokens,
  getBrowserLocalStorage,
  applyAuthTokenInterceptor,
  clearAuthTokens,
  setAuthTokens
} from 'axios-jwt';

const BASE_URL = 'http://localhost:9090/v1';

export const authInstance = axios.create({
  baseURL: BASE_URL
});
export const instance = axios.create({
  baseURL: BASE_URL
});

instance.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});
authInstance.interceptors.request.use(request => {
  console.log('Starting Request from auth', JSON.stringify(request, null, 2));
  return request;
});

// 2. Define token refresh function.
const requestRefresh: TokenRefreshRequest = async (
  refreshToken: string
): Promise<IAuthTokens | string> => {
  const response = await axios.post(`${BASE_URL}/v1/refresh_token`, { token: refreshToken });

  return response.data.access_token;
};
const getStorage = getBrowserLocalStorage;

applyAuthTokenInterceptor(authInstance, {
  requestRefresh,
  getStorage, // async function that takes a refreshToken and returns a promise the resolves in a fresh accessToken
  header: 'Authorization', // header name
  headerPrefix: 'Bearer ' // header value prefix
});

export const login = async (Username: string, Password: string) => {
  console.log({ Username, Password });
  const response = await instance.post('/login', { username: Username, password: Password });
  setAuthTokens({
    accessToken: response.data.token,
    refreshToken: response.data.token
  });
  return response.data;
};
export const logout = () => clearAuthTokens();

export const getMoviesByPage = async (
  page: number
): Promise<AxiosResponse<PaginatedMovieResponse>> => {
  const response = await instance.get(`/movie/get/page/${page}`);
  return response.data;
};
export const getMovieCast = async (movieId: string) => {
  const { data } = await instance.get(`cast/get/${movieId}`);
  return data;
};
export const getMovieCrew = async (movieId: string) => {
  const { data } = await instance.get(`crew/get/${movieId}`);
  return data;
};
export const getMovieKeyword = async (movieId: string) => {
  const { data } = await instance.get(`keyword/get/${movieId}`);
  return data.keyword_list;
};
export const getMovieDetail = async (movieId: string) => {
  const { data } = await instance.get(`movie/get/${movieId}`);
  return data;
};

export const getMovieDiscussion = async (movieId: string) => {
  const { data } = await instance.get(`movie_discussion/get-by-movie/${movieId}`);
  return data;
};

export const createMovieRating = async (rating: Rating) => {
  const { data } = await authInstance.post(`rating/create`, {
    movie_id: rating.movie_id,
    user_id: rating.user_id,
    rating: rating.rating,
    timestamp: Math.floor(Date.now() / 1000)
  });
  return data;
};

export const updateMovieRating = async (rating: Rating) => {
  const { data } = await authInstance.patch(`rating/update`, {
    movie_id: rating.movie_id,
    user_id: rating.user_id,
    rating: rating.rating,
    timestamp: Math.floor(Date.now() / 1000)
  });
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await authInstance.get(`currentUser`);
  return data;
};

export const searchMovie = async (query: string, page: string) => {
  const { data } = await instance.get(`movie/search/${query}/${page}`);
  return data;
};

export const getUserRating = async (userId: string) => {
  const { data } = await instance.get(`rating/get/user/${userId}`);
  return data;
};

export const getMovieRatingByUser = async (userId: number, movieId: string) => {
  const { data } = await instance.get(`rating/get/${userId}/${movieId}`);
  return data;
};

export const deleteMovieRating = async (reqData: { userId: number; movieId: string }) => {
  const { data } = await authInstance.delete(`rating/delete/${reqData.userId}/${reqData.movieId}`);
  return data;
};

export const getUserProfile = async (userId: string) => {
  const { data } = await instance.get(`user/get/${userId}`);
  return data;
};

export const updateUserProfile = async (user: User) => {
  const { data } = await authInstance.patch(`user/update`, user);
  return data;
};

export const buildApiUrl = (endpoint: string, params?: Record<string, string>): string => {
  const baseUrl = 'http://localhost:9090/v1';
  let url = `${baseUrl}/${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }
  return url;
};
