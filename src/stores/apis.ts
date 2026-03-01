import axios from "axios";
const url = `http://192.168.1.125:4000`

//for RohAlarad

//Places Store
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

//Medical Store

//for Specializations
export const apiSpecialization = axios.create({
  baseURL: `${url}/specialization`,
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


//for Associations
export const apiAssociation = axios.create({
  baseURL: `${url}/association `,
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

//for SpecializationTypes
export const apiSpecializationType = axios.create({
  baseURL: `${url}/specialization-type`,
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




//for DoctorPharmacists
export const apiDoctorPharmacist = axios.create({
  baseURL: `${url}/doctor-pharmacist`,
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



//for Doctors
export const apiDoctor = axios.create({
  baseURL: `${url}/doctor`,
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



//for Pharmacists
export const apiPharmacist = axios.create({
  baseURL: `${url}/pharmacist`,
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


//for DoctorVisits
export const apiDoctorVisit = axios.create({
  baseURL: `${url}/doctor-visit`,
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


//for PharmacistVisits
export const apiPharmacistVisit = axios.create({
  baseURL: `${url}/pharmacist-visit`,
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


//for DoctorSamples
export const apiDoctorSample = axios.create({
  baseURL: `${url}/doctor-sample`,
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


//for PharmacistSamples
export const apiPharmacistSample = axios.create({
  baseURL: `${url}/pharmacist-sample`,
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



//APIs for types store


//for GroupTypes
export const apiGroupType = axios.create({
  baseURL: `${url}/group-type`,
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


//for Types
export const apiType = axios.create({
  baseURL: `${url}/type`,
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


//for Ingredient
export const apiIngredient = axios.create({
  baseURL: `${url}/ingredient`,
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



//for TypeIngredients
export const apiTypeIngredient = axios.create({
  baseURL: `${url}/type-ingredient`,
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



//for RecoveryCases
export const apiRecoveryCase = axios.create({
  baseURL: `${url}/recovery-case`,
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



//for RecoveryCaseImages
export const apiRecoveryCaseImage = axios.create({
  baseURL: `${url}/recovery-case-image`,
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


