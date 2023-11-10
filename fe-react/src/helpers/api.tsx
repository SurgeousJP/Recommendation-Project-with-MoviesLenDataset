export const buildApiUrl = (endpoint: string, params?: Record<string, string>): string => {
  const baseUrl = 'http://localhost:9090/v1';
  let url = `${baseUrl}/${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }
  return url;
};
