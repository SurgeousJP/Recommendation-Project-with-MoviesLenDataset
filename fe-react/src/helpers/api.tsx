import axios, { AxiosResponse } from 'axios';
import Rating from 'src/types/Rating';
import { PaginatedMovieResponse } from './type';

const instance = axios.create({
  baseURL: 'http://localhost:9090/v1'
});

export const login = async (Username: string, Password: string) => {
  console.log({ Username, Password });
  const response = await instance.post('/login', { username: Username, password: Password });
  return response.data;
};

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
export const createMovieRating = async (rating: Rating) => {
  const { data } = await instance.post(`rating/create`, {
    movie_id: rating.movie_id,
    user_id: rating.user_id,
    rating: rating.rating,
    timestamp: Math.floor(Date.now() / 1000)
  });
  return data;
};

export const updateMovieRating = async (rating: Rating) => {
  const { data } = await instance.patch(`rating/update`, {
    movie_id: rating.movie_id,
    user_id: rating.user_id,
    rating: rating.rating,
    timestamp: Math.floor(Date.now() / 1000)
  });
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
  const { data } = await instance.delete(`rating/delete/${reqData.userId}/${reqData.movieId}`);
  return data;
};

export const getUserProfile = async (userId: string) => {
  const { data } = await instance.get(`user/get/${userId}`);
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
