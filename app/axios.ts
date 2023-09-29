import axios, { AxiosInstance, AxiosResponse } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

interface RefreshTokenResponse {
  newAccessToken: string;
}

export const setAccessToken = (accessToken: string | undefined): void => {
  if (accessToken) {
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

//this is unused
export const refreshAccessToken = async (
  refreshToken: string
): Promise<string> => {
  try {
    const response: AxiosResponse<RefreshTokenResponse> = await axios.post(
      `api/refresh-token`,
      {
        refreshToken,
      }
    );
    const { newAccessToken } = response.data;

    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

export default api;