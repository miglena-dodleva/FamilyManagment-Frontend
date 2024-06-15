import axios from "axios";

const axiosApiInstance = axios.create({
  baseURL: "https://localhost:44383/",
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (error) => {
    // Returns an object that is rejected with the given reason
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (originalRequest.url !== "/api/Auth/token"  && error.response) {
      // expire access token
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const { data } = await axiosApiInstance.post("/refresh", {
            refreshToken: localStorage.getItem("refreshToken"),
          });

          const { accessToken, refreshToken, userId } = data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("userId", userId);

          return axiosApiInstance(originalRequest);
        } catch (exception) {
          return Promise.reject(exception);
        }
      }
    } 
    
    else if (originalRequest.url === "/revoke") {
      try {
        await axiosApiInstance.post("/revoke", {
          accessToken: localStorage.getItem("accessToken"),
          refreshToken: localStorage.getItem("refreshToken"),
          userId: localStorage.getItem("userId")
        });

        localStorage.clear();

        return axiosApiInstance(originalRequest);
      } catch (exception) {
        return Promise.reject(exception);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosApiInstance;
