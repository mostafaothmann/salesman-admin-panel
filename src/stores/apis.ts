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



//for Assistant
export const apiAssistant = axios.create({
  baseURL: `${url}/assistant`,
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



//for Order
export const apiOrder = axios.create({
  baseURL: `${url}/order`,
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



//for Online Order
export const apiOnlineOrder = axios.create({
  baseURL: `${url}/online-order`,
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



//for Product
export const apiProduct = axios.create({
  baseURL: `${url}/product`,
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



//for Online Product
export const apiOnlineProduct = axios.create({
  baseURL: `${url}/online-product`,
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




//for Product
export const apiOffer = axios.create({
  baseURL: `${url}/offer`,
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



//for Online Product
export const apiOnlineOffer = axios.create({
  baseURL: `${url}/online-offer`,
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




//for Online Product
export const apiBaseOffer = axios.create({
  baseURL: `${url}/base-offer`,
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






//for Online Product
export const apiOnlineCustomer = axios.create({
  baseURL: `${url}/online-customer`,
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



//for Hospital Doctor
export const apiHospitalDoctor = axios.create({
  baseURL: `${url}/hospital-doctor`,
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





//for Hospital Pharmacist
export const apiHospitalPharmacist = axios.create({
  baseURL: `${url}/hospital-pharmacist`,
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






//for Sample Pharmacist
export const apiSamplePharmacist = axios.create({
  baseURL: `${url}/hospital-pharmacist`,
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





//for Sample Doctor
export const apiSampleDoctor = axios.create({
  baseURL: `${url}/hospital-pharmacist`,
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






//for Association Pharmacist
export const apiِAssociationPharmacist = axios.create({
  baseURL: `${url}/hospital-pharmacist`,
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





//for Association Doctor
export const apiِAssociationDoctor = axios.create({
  baseURL: `${url}/hospital-pharmacist`,
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












