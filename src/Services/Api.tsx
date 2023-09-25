import axios from "axios";
import IAutenticacao from "../Interfaces/IAutenticao";
import StorageUtils from "../utils/StorageUtils";

const api = axios.create({
  baseURL: "http://localhost:5062/api",
  withCredentials: true,
});


api.interceptors.request.use(

  async (config: any) => {
    if (config.url.toLowerCase().indexOf("autenticacao") < 0 && config.url.toLowerCase().indexOf("refreshtoken") < 0) {
      if (new Date().getTime() > StorageUtils.getAccessExpireIn()) {
        return {
          ...config,
          cancelToken: new axios.CancelToken((cancel) => cancel("Sessão Expirada")),
        };
      }
    }

    await StorageUtils.updateAccessExpireIn();

    if (config.url.toLowerCase().indexOf("refreshtoken") >= 0) {
      delete config.headers.Authorization;
      delete config.headers.common["Authorization"];
    } else {
      const accessToken = await StorageUtils.getToken();

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (err: any) => Promise.reject(err)
);

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error && error.response && error.response.status === 498) {
      originalRequest._retry = true;

      let ip = '';

      try {
        const resultado = await (await fetch('https://api.ipify.org?format=json')).json();
        ip = await resultado.ip;
      } catch (error) {
        console.log(error);
        const resultado = await (await fetch('https://v4.ident.me')).text();
        ip = resultado;
      }

      let { data: result } = await api.post<IAutenticacao>('Autenticacao/RefreshToken', { ip });


      StorageUtils.setToken(result.token);

      api.defaults.headers.common["Authorization"] = "Bearer " + result.token;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
