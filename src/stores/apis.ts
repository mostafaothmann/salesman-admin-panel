import axios from "axios";
const url = `http://192.168.1.140:3000`

//for RohAlarad
export const apiSalesman = axios.create({
    baseURL: `${url}/salesman`,
    headers: { 'Content-Type': 'application/json' },
});

/*
 // 🧠 Automatically attach the latest token before each request
apiSalesman.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 */


//for Governorate
export const apiGovernorate = axios.create({
    baseURL: `${url}/governorate`,
    headers: { 'Content-Type': 'application/json' },
});

/*
 // 🧠 Automatically attach the latest token before each request
apiSalesman.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 */


//for Cities
export const apiCity = axios.create({
    baseURL: `${url}/city`,
    headers: { 'Content-Type': 'application/json' },
});

/*
 // 🧠 Automatically attach the latest token before each request
apiSalesman.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 */


//for Areas
export const apiArea = axios.create({
    baseURL: `${url}/area`,
    headers: { 'Content-Type': 'application/json' },
});

/*
 // 🧠 Automatically attach the latest token before each request
apiSalesman.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 */


//for Streets
export const apiStreet = axios.create({
    baseURL: `${url}/street`,
    headers: { 'Content-Type': 'application/json' },
});

/*
 // 🧠 Automatically attach the latest token before each request
apiSalesman.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 */


//for Buildings
export const apiBuilding = axios.create({
    baseURL: `${url}/building`,
    headers: { 'Content-Type': 'application/json' },
});

/*
 // 🧠 Automatically attach the latest token before each request
apiSalesman.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 */