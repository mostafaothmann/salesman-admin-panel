import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { apiDoctor, apiDoctorPharmacist, apiDoctorVisit, apiHospitalDoctor, apiHospitalPharmacist, apiPharmacist, apiPharmacistVisit, apiSampleDoctor, apiSamplePharmacist, apiSpecialization, apiSpecializationType, apiِAssociationDoctor, apiِAssociationPharmacist } from '../apis';
import {
    AddingAssociationDoctor, AddingAssociationPharmacist, AddingDoctor,
    AddingDoctorPharmacist, AddingDoctorVisit, AddingHospitalDoctor,
    AddingHospitalPharmacist, AddingPharmacist, AddingPharmacistVisit,
    AddingSampleDoctor, AddingSamplePharmacist, AddingSpecialization,
    AddingSpecializationType, AssociationDoctor, AssociationPharmacist,
    Doctor, DoctorPharmacist, DoctorVisit, FilterDoctorProps,
    FilterPharmacistProps, HospitalDoctor, HospitalPharmacist, Pharmacist,
    PharmacistVisit, SampleDoctor, SamplePharmacist, Specialization, SpecializationType
} from '../medical-store-interfaces';
import { Type } from '../types-store-interfaces';



interface DataStore {
    dataSpecializations: Specialization[] | undefined;
    specializationD: Specialization,

    dataSpecializationTypes: SpecializationType[] | undefined;
    specializationTypeD: SpecializationType,

    dataDoctors: Doctor[];
    doctorD: Doctor;
    filteredDataDoctors: Doctor[];
    dataTypesForSpecialization: Type[] | undefined;


    dataPharmacists: Pharmacist[];
    pharmacistD: Pharmacist;
    filteredDataPharmacisits: Pharmacist[];

    dataDoctorsVisits: DoctorVisit[] | undefined;
    doctorVisitD: DoctorVisit,

    dataPharmacistsVisits: PharmacistVisit[] | undefined;
    pharmacistVisitD: PharmacistVisit,


    dataAssociationDoctors: AssociationDoctor[] | undefined;
    associationDoctorD: AssociationDoctor,



    dataAssociationPharmacists: AssociationPharmacist[] | undefined;
    associationPharmacistD: AssociationPharmacist,

    dataHospitalDoctors: HospitalDoctor[] | undefined;
    hospitalDoctorD: HospitalDoctor,

    dataHospitalPharmacists: HospitalPharmacist[] | undefined;
    hospitalPharmacistD: HospitalPharmacist,


    dataSamplePharmacists: SamplePharmacist[] | undefined;
    samplePharmacistD: SamplePharmacist,


    dataSampleDoctors: SampleDoctor[] | undefined;
    sampleDoctorD: SampleDoctor,


    dataDoctorPharmacists: DoctorPharmacist[] | undefined;
    doctorPharmacistD: DoctorPharmacist,


    loading: boolean;
    error: string | null;
    total: number,
    filter_total: number,
    lastPage: number,

    //for Specializations
    getSpecializationsData: () => Promise<void>;
    getSpecializationData: (id: number) => Promise<void>;
    getTypesForSpecializationData: (id: number) => Promise<void>;
    addSpecialization: (specialization: AddingSpecialization) => Promise<void>;
    deleteSpecialization: (id: number) => Promise<void>;
    editSpecialization: (id: number, specialization: AddingSpecialization) => Promise<void>;

    // for SpecializationTypes
    getSpecializationTypesData: () => Promise<void>;
    getSpecializationTypeData: (id: number) => Promise<void>;
    addSpecializationType: (specializationType: AddingSpecializationType) => Promise<void>;
    deleteSpecializationType: (id: number) => Promise<void>;
    editSpecializationType: (id: number, specializationType: AddingSpecializationType) => Promise<void>;

    //for Doctors
    getDoctorsData: (page: number, limit: number) => Promise<void>;
    getDoctorData: (id: number) => Promise<void>;
    // getVisitsForDoctor: (id: number) => Promise<void>;
    addDoctor: (doctor: AddingDoctor) => Promise<void>;
    deleteDoctor: (id: number) => Promise<void>;
    editDoctor: (id: number, doctor: AddingDoctor) => Promise<void>;
    getFilteredDataDoctors: (filters: FilterDoctorProps) => Promise<void>;

    //for Pharmacists
    getPharmacistsData: (page: number, limit: number) => Promise<void>;
    getPharmacistData: (id: number) => Promise<void>;
    // getVisitsForDoctor: (id: number) => Promise<void>;
    addPharmacist: (doctor: AddingPharmacist) => Promise<void>;
    deletePharmacist: (id: number) => Promise<void>;
    editPharmacist: (id: number, doctor: AddingPharmacist) => Promise<void>;
    getFilteredDataPharmacists: (filters: FilterPharmacistProps) => Promise<void>;


    // For DoctorVisits
    getDoctorsVisitsData: (page: number, limit: number) => Promise<void>;
    getDoctorVisitData: (id: number) => Promise<void>;
    addDoctorVisit: (doctorVisit: AddingDoctorVisit) => Promise<void>;
    deleteDoctorVisit: (id: number) => Promise<void>;
    editDoctorVisit: (id: number, doctorVisit: AddingDoctorVisit) => Promise<void>;

    // For PharmacistVisits
    getPharmacistsVisitsData: (page: number, limit: number) => Promise<void>;
    getPharmacistVisitData: (id: number) => Promise<void>;
    addPharmacistVisit: (pharmacistVisit: AddingPharmacistVisit) => Promise<void>;
    deletePharmacistVisit: (id: number) => Promise<void>;
    editPharmacistVisit: (id: number, pharmacistVisit: AddingPharmacistVisit) => Promise<void>;

    // AssociationDoctor
    getAssociationDoctorsData: (page: number, limit: number) => Promise<void>;
    getAssociationDoctorData: (id: number) => Promise<void>;
    addAssociationDoctor: (associationDoctor: AddingAssociationDoctor) => Promise<void>;
    deleteAssociationDoctor: (id: number) => Promise<void>;
    editAssociationDoctor: (id: number, associationDoctor: AddingAssociationDoctor) => Promise<void>;

    // AssociationPharmacist
    getAssociationPharmacistsData: (page: number, limit: number) => Promise<void>;
    getAssociationPharmacistData: (id: number) => Promise<void>;
    addAssociationPharmacist: (associationPharmacist: AddingAssociationPharmacist) => Promise<void>;
    deleteAssociationPharmacist: (id: number) => Promise<void>;
    editAssociationPharmacist: (id: number, associationPharmacist: AddingAssociationPharmacist) => Promise<void>;

    // SampleDoctor
    getSampleDoctorsData: (page: number, limit: number) => Promise<void>;
    getSampleDoctorData: (id: number) => Promise<void>;
    addSampleDoctor: (sampleDoctor: AddingSampleDoctor) => Promise<void>;
    deleteSampleDoctor: (id: number) => Promise<void>;
    editSampleDoctor: (id: number, sampleDoctor: AddingSampleDoctor) => Promise<void>;

    // SamplePharmacist
    getSamplePharmacistsData: (page: number, limit: number) => Promise<void>;
    getSamplePharmacistData: (id: number) => Promise<void>;
    addSamplePharmacist: (samplePharmacist: AddingSamplePharmacist) => Promise<void>;
    deleteSamplePharmacist: (id: number) => Promise<void>;
    editSamplePharmacist: (id: number, samplePharmacist: AddingSamplePharmacist) => Promise<void>;

    // HospitalDoctor
    getHospitalDoctorsData: (page: number, limit: number) => Promise<void>;
    getHospitalDoctorData: (id: number) => Promise<void>;
    addHospitalDoctor: (hospitalDoctor: AddingHospitalDoctor) => Promise<void>;
    deleteHospitalDoctor: (id: number) => Promise<void>;
    editHospitalDoctor: (id: number, hospitalDoctor: AddingHospitalDoctor) => Promise<void>;

    // HospitalPharmacist
    getHospitalPharmacistsData: (page: number, limit: number) => Promise<void>;
    getHospitalPharmacistData: (id: number) => Promise<void>;
    addHospitalPharmacist: (hospitalPharmacist: AddingHospitalPharmacist) => Promise<void>;
    deleteHospitalPharmacist: (id: number) => Promise<void>;
    editHospitalPharmacist: (id: number, hospitalPharmacist: AddingHospitalPharmacist) => Promise<void>;

    // DoctorPharmacist
    getDoctorPharmacistsData: (page: number, limit: number) => Promise<void>;
    getDoctorPharmacistData: (id: number) => Promise<void>;
    addDoctorPharmacist: (doctorPharmacist: AddingDoctorPharmacist) => Promise<void>;
    deleteDoctorPharmacist: (id: number) => Promise<void>;
    editDoctorPharmacist: (id: number, doctorPharmacist: AddingDoctorPharmacist) => Promise<void>;
}
//gettig the token from Auth Store 
export const useMedicalStore = create<DataStore>()(
    persist(
        (set, get) => ({

            //Specializations
            dataSpecializations: undefined,
            specializationD: null,
            dataTypesForSpecialization: null,
            loading: false,
            error: null,
            total: 0,
            filter_total: 0,
            lastPage: 1,
            // Get Specializations Data
            getSpecializationsData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSpecialization.get(``);
                    const dataSpecializations = res.data
                    set({ dataSpecializations, loading: false });
                    return dataSpecializations
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Specializations',
                        loading: false,
                    });
                }
            },
            // get One Specialization Data  👈
            getSpecializationData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSpecialization.get(`/${id}`);
                    const specializationD = res.data
                    set({ specializationD, loading: false });
                    return specializationD
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Specialization',
                        loading: false,
                    });
                }
            },

            //getSpecializationWithTypes

            // get One Specialization Data  👈
            getTypesForSpecializationData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSpecialization.get(`/with-types/${id}`);
                    const dataTypesForSpecialization = res.data
                    set({ dataTypesForSpecialization, loading: false });
                    return dataTypesForSpecialization
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || `Error Loading Types for Specialization ${id}`,
                        loading: false,
                    });
                }
            },
            deleteSpecialization: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiSpecialization.delete(`/${id}`);
                    set((state) => ({
                        dataSpecializations: state.dataSpecializations?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Deleting Specialization',
                        loading: false,
                    });
                }
            },
            //Editing Specialization
            editSpecialization: async (id: number, specialization: AddingSpecialization) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSpecialization.patch(`/${id}`, specialization);
                    if (res.status != 201) { }

                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Specialization',
                        loading: false,
                    });
                }
            },
            //Adding New Specialization
            addSpecialization: async (specialization: AddingSpecialization) => {
                set({ loading: true, error: null });
                try {
                    if (specialization !== null) {
                        //   const { authData } = useAuthStore.getState(); // ✅ dynamically get latest auth data
                        //    property.customerId = authData?.id || 0;
                        const res = await apiSpecialization.post(``, specialization);
                        set({ loading: false });
                        if (res.status == 201) {

                        }
                    }
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Specializations',
                        loading: false,
                    });
                }
            },











            //SpecializationTypes
            dataSpecializationTypes: undefined,
            specializationTypeD: null,
            // Get ALL Specialization Types
            getSpecializationTypesData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSpecializationType.get(``);
                    const dataSpecializationTypes = res.data;

                    set({ dataSpecializationTypes, loading: false });
                    return dataSpecializationTypes;
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Loading Specialization Types",
                        loading: false,
                    });
                }
            },

            // Get ONE Specialization Type
            getSpecializationTypeData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSpecializationType.get(`/${id}`);
                    const specializationTypeD = res.data;

                    set({ specializationTypeD, loading: false });
                    return specializationTypeD;
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Loading Specialization Type",
                        loading: false,
                    });
                }
            },


            // Delete Specialization Type
            deleteSpecializationType: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiSpecializationType.delete(`/${id}`);

                    set((state) => ({
                        dataSpecializationTypes: state.dataSpecializationTypes?.filter((a) => a.id !== id
                        ),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Deleting Specialization Type",
                        loading: false,
                    });
                }
            },

            // Edit Specialization Type
            editSpecializationType: async (
                id: number,
                specializationType: AddingSpecializationType
            ) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSpecializationType.patch(
                        `/${id}`,
                        specializationType
                    );

                    if (res.status === 200 || res.status === 201) {
                        set({ loading: false });
                    }
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Editing Specialization Type",
                        loading: false,
                    });
                }
            },

            // Add New Specialization Type
            addSpecializationType: async (
                specializationType: AddingSpecializationType
            ) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSpecializationType.post(
                        ``,
                        specializationType
                    );

                    if (res.status === 201) {
                        set({ loading: false });
                    }
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Adding Specialization Type",
                        loading: false,
                    });
                }
            },











            //SpecializationTypes
            dataDoctors: undefined,
            doctorD: null,
            filteredDataDoctors: undefined,
            // Get ALL Specialization Types
            getDoctorsData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiDoctor.get(``, {
                        params: {
                            page,
                            limit,
                        }
                    });
                    const dataDoctors = res.data.data;
                    const total = res.data.total
                    const lastPage = res.data.lastPage
                    console.log(res.data)
                    set({ dataDoctors, loading: false, total: total, lastPage });
                    return dataDoctors;
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Loading Doctor ",
                        loading: false,
                    });
                }
            },

            // Get ONE Doctor Type
            getDoctorData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiDoctor.get(`/${id}`);
                    const doctorD = res.data;

                    set({ doctorD, loading: false });
                    return doctorD;
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Loading Doctor",
                        loading: false,
                    });
                }
            },


            // Delete Doctor
            deleteDoctor: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiDoctor.delete(`/${id}`);

                    set((state) => ({
                        dataDoctors: state.dataDoctors?.filter((a) => a.id !== id
                        ),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Deleting Doctor Type",
                        loading: false,
                    });
                }
            },

            // Edit Specialization Type
            editDoctor: async (
                id: number,
                doctor: AddingDoctor
            ) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiDoctor.patch(
                        `/${id}`,
                        doctor
                    );

                    if (res.status === 200 || res.status === 201) {
                        set({ loading: false });
                    }
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Editing Specialization Type",
                        loading: false,
                    });
                }
            },

            // Add New Doctor Type
            addDoctor: async (
                doctor: AddingDoctor
            ) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiDoctor.post(
                        ``,
                        doctor
                    );

                    if (res.status === 201) {
                        set({ loading: false });
                    }
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Adding Doctor",
                        loading: false,
                    });
                }
            },

            //Get Filtered Data
            getFilteredDataDoctors: async (
                filters: FilterDoctorProps
            ) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiDoctor.post(
                        `/filter`,
                        filters
                    );
                    if (res.status === 201) {
                        console.log(res.data)

                        const filteredDataDoctors = res.data.data;
                        const filter_total = res.data.total;

                        set({ filteredDataDoctors, loading: false, filter_total });
                        return filteredDataDoctors;
                    }
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Adding Doctor",
                        loading: false,
                    });
                }
            },







            //Pharmacists
            dataPharmacists: undefined,
            pharmacistD: null,
            filteredDataPharmacisits: undefined,
            // Get ALL Pharmacists
            getPharmacistsData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiPharmacist.get(``, {
                        params: {
                            page,
                            limit,
                        }
                    });
                    const dataPharmacists = res.data.data;
                    const total = res.data.total
                    const lastPage = res.data.lastPage
                    console.log(res.data)
                    set({ dataPharmacists, loading: false, total: total, lastPage });
                    return dataPharmacists;
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Loading Pharmacist ",
                        loading: false,
                    });
                }
            },

            // Get ONE Pharmacist Type
            getPharmacistData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiPharmacist.get(`/${id}`);
                    const pharmacistD = res.data;

                    set({ pharmacistD, loading: false });
                    return pharmacistD;
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Loading Pharmacist",
                        loading: false,
                    });
                }
            },


            // Delete Pharmacist
            deletePharmacist: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiPharmacist.delete(`/${id}`);

                    set((state) => ({
                        dataPharmacists: state.dataPharmacists?.filter((a) => a.id !== id
                        ),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Deleting Pharmacist",
                        loading: false,
                    });
                }
            },

            // Edit Pharmacist Type
            editPharmacist: async (
                id: number,
                pharmacist: AddingPharmacist
            ) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiDoctor.patch(
                        `/${id}`,
                        pharmacist
                    );

                    if (res.status === 200 || res.status === 201) {
                        set({ loading: false });
                    }
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Editing Pharmacist ",
                        loading: false,
                    });
                }
            },

            // Add New Pharmacist Type
            addPharmacist: async (
                pharmacist: AddingPharmacist
            ) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiPharmacist.post(
                        ``,
                        pharmacist
                    );

                    if (res.status === 201) {
                        set({ loading: false });
                    }
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Adding Pharmacist",
                        loading: false,
                    });
                }
            },

            //Get Filtered Data
            getFilteredDataPharmacists: async (
                filters: FilterPharmacistProps
            ) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiDoctor.post(
                        `/filter`,
                        filters
                    );
                    if (res.status === 201) {
                        console.log(res.data)
                        const filteredDataPharmacisits = res.data.data;
                        const filter_total = res.data.total;
                        set({ filteredDataPharmacisits, loading: false, filter_total });
                        return filteredDataPharmacisits;
                    }
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Adding Pharmacist",
                        loading: false,
                    });
                }
            },




            // DoctorVisits
            dataDoctorsVisits: undefined,
            doctorVisitD: null,

            getDoctorsVisitsData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiDoctorVisit.get(``, { params: { page, limit } });
                    const dataDoctorsVisits = res.data.data;
                    const total = res.data.total;
                    const lastPage = res.data.lastPage;
                    set({ dataDoctorsVisits, loading: false, total, lastPage });
                    return dataDoctorsVisits;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading DoctorVisits",
                        loading: false,
                    });
                }
            },

            getDoctorVisitData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiDoctorVisit.get(`/${id}`);
                    const doctorVisitD = res.data;
                    set({ doctorVisitD, loading: false });
                    return doctorVisitD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading DoctorVisit",
                        loading: false,
                    });
                }
            },

            deleteDoctorVisit: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiDoctorVisit.delete(`/${id}`);
                    set((state) => ({
                        dataDoctorVisits: state.dataDoctorsVisits?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Deleting DoctorVisit",
                        loading: false,
                    });
                }
            },

            editDoctorVisit: async (id: number, doctorVisit: AddingDoctorVisit) => {
                set({ loading: true, error: null });
                try {
                    await apiDoctorVisit.patch(`/${id}`, doctorVisit);
                    set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Editing DoctorVisit",
                        loading: false,
                    });
                }
            },

            addDoctorVisit: async (doctorVisit: AddingDoctorVisit) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiDoctorVisit.post(``, doctorVisit);
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding DoctorVisit",
                        loading: false,
                    });
                }
            },

            // PharmacistVisits
            dataPharmacistsVisits: undefined,
            pharmacistVisitD: null,

            getPharmacistsVisitsData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiPharmacistVisit.get(``, { params: { page, limit } });
                    const dataPharmacistsVisits = res.data.data;
                    const total = res.data.total;
                    const lastPage = res.data.lastPage;
                    set({ dataPharmacistsVisits, loading: false, total, lastPage });
                    return dataPharmacistsVisits;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading PharmacistVisits",
                        loading: false,
                    });
                }
            },

            getPharmacistVisitData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiPharmacistVisit.get(`/${id}`);
                    const pharmacistVisitD = res.data;
                    set({ pharmacistVisitD, loading: false });
                    return pharmacistVisitD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading PharmacistVisit",
                        loading: false,
                    });
                }
            },

            deletePharmacistVisit: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiPharmacistVisit.delete(`/${id}`);
                    set((state) => ({
                        dataPharmacistsVisits: state.dataPharmacistsVisits?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Deleting PharmacistVisit",
                        loading: false,
                    });
                }
            },

            editPharmacistVisit: async (id: number, pharmacistVisit: AddingPharmacistVisit) => {
                set({ loading: true, error: null });
                try {
                    await apiPharmacistVisit.patch(`/${id}`, pharmacistVisit);
                    set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Editing PharmacistVisit",
                        loading: false,
                    });
                }
            },

            addPharmacistVisit: async (pharmacistVisit: AddingPharmacistVisit) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiPharmacistVisit.post(``, pharmacistVisit);
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding PharmacistVisit",
                        loading: false,
                    });
                }
            },




            // AssociationDoctors
            dataAssociationDoctors: undefined,
            associationDoctorD: null,

            getAssociationDoctorsData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiِAssociationDoctor.get(``, { params: { page, limit } });
                    const dataAssociationDoctors = res.data.data;
                    const total = res.data.total;
                    const lastPage = res.data.lastPage;

                    set({ dataAssociationDoctors, loading: false, total, lastPage });
                    return dataAssociationDoctors;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading AssociationDoctors",
                        loading: false,
                    });
                }
            },

            getAssociationDoctorData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiِAssociationDoctor.get(`/${id}`);
                    const associationDoctorD = res.data;

                    set({ associationDoctorD, loading: false });
                    return associationDoctorD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading AssociationDoctor",
                        loading: false,
                    });
                }
            },

            deleteAssociationDoctor: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiِAssociationDoctor.delete(`/${id}`);
                    set((state) => ({
                        dataAssociationDoctors: state.dataAssociationDoctors?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Deleting AssociationDoctor",
                        loading: false,
                    });
                }
            },

            editAssociationDoctor: async (id: number, associationDoctor: AddingAssociationDoctor) => {
                set({ loading: true, error: null });
                try {
                    await apiِAssociationDoctor.patch(`/${id}`, associationDoctor);
                    set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Editing AssociationDoctor",
                        loading: false,
                    });
                }
            },

            addAssociationDoctor: async (associationDoctor: AddingAssociationDoctor) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiِAssociationDoctor.post(``, associationDoctor);
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding AssociationDoctor",
                        loading: false,
                    });
                }
            },

            // AssociationPharmacists

            dataAssociationPharmacists: undefined,
            associationPharmacistD: null,

            getAssociationPharmacistsData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiِAssociationPharmacist.get(``, { params: { page, limit } });
                    const dataAssociationPharmacists = res.data.data;
                    const total = res.data.total;
                    const lastPage = res.data.lastPage;

                    set({ dataAssociationPharmacists, loading: false, total, lastPage });
                    return dataAssociationPharmacists;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading AssociationPharmacists",
                        loading: false,
                    });
                }
            },

            getAssociationPharmacistData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiِAssociationPharmacist.get(`/${id}`);
                    const associationPharmacistD = res.data;

                    set({ associationPharmacistD, loading: false });
                    return associationPharmacistD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading AssociationPharmacist",
                        loading: false,
                    });
                }
            },

            deleteAssociationPharmacist: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiِAssociationPharmacist.delete(`/${id}`);
                    set((state) => ({
                        dataAssociationPharmacists: state.dataAssociationPharmacists?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Deleting AssociationPharmacist",
                        loading: false,
                    });
                }
            },

            editAssociationPharmacist: async (id: number, associationPharmacist: AddingAssociationPharmacist) => {
                set({ loading: true, error: null });
                try {
                    await apiِAssociationPharmacist.patch(`/${id}`, associationPharmacist);
                    set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Editing AssociationPharmacist",
                        loading: false,
                    });
                }
            },

            addAssociationPharmacist: async (associationPharmacist: AddingAssociationPharmacist) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiِAssociationPharmacist.post(``, associationPharmacist);
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding AssociationPharmacist",
                        loading: false,
                    });
                }
            },








            // SampleDoctors

            dataSampleDoctors: undefined,
            sampleDoctorD: null,

            getSampleDoctorsData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSampleDoctor.get(``, { params: { page, limit } });
                    const dataSampleDoctors = res.data.data;
                    const total = res.data.total;
                    const lastPage = res.data.lastPage;

                    set({ dataSampleDoctors, loading: false, total, lastPage });
                    return dataSampleDoctors;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading SampleDoctors",
                        loading: false,
                    });
                }
            },

            getSampleDoctorData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSampleDoctor.get(`/${id}`);
                    const sampleDoctorD = res.data;

                    set({ sampleDoctorD, loading: false });
                    return sampleDoctorD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading SampleDoctor",
                        loading: false,
                    });
                }
            },

            deleteSampleDoctor: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiSampleDoctor.delete(`/${id}`);
                    set((state) => ({
                        dataSampleDoctors: state.dataSampleDoctors?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Deleting SampleDoctor",
                        loading: false,
                    });
                }
            },

            editSampleDoctor: async (id: number, sampleDoctor: AddingSampleDoctor) => {
                set({ loading: true, error: null });
                try {
                    await apiSampleDoctor.patch(`/${id}`, sampleDoctor);
                    set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Editing SampleDoctor",
                        loading: false,
                    });
                }
            },

            addSampleDoctor: async (sampleDoctor: AddingSampleDoctor) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSampleDoctor.post(``, sampleDoctor);
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding SampleDoctor",
                        loading: false,
                    });
                }
            },


            // SamplePharmacists
            dataSamplePharmacists: undefined,
            samplePharmacistD: null,

            getSamplePharmacistsData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSamplePharmacist.get(``, { params: { page, limit } });
                    const dataSamplePharmacists = res.data.data;
                    const total = res.data.total;
                    const lastPage = res.data.lastPage;

                    set({ dataSamplePharmacists, loading: false, total, lastPage });
                    return dataSamplePharmacists;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading SamplePharmacists",
                        loading: false,
                    });
                }
            },

            getSamplePharmacistData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSamplePharmacist.get(`/${id}`);
                    const samplePharmacistD = res.data;

                    set({ samplePharmacistD, loading: false });
                    return samplePharmacistD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading SamplePharmacist",
                        loading: false,
                    });
                }
            },

            deleteSamplePharmacist: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiSamplePharmacist.delete(`/${id}`);
                    set((state) => ({
                        dataSamplePharmacists: state.dataSamplePharmacists?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Deleting SamplePharmacist",
                        loading: false,
                    });
                }
            },

            editSamplePharmacist: async (id: number, samplePharmacist: AddingSamplePharmacist) => {
                set({ loading: true, error: null });
                try {
                    await apiSamplePharmacist.patch(`/${id}`, samplePharmacist);
                    set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Editing SamplePharmacist",
                        loading: false,
                    });
                }
            },

            addSamplePharmacist: async (samplePharmacist: AddingSamplePharmacist) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSamplePharmacist.post(``, samplePharmacist);
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding SamplePharmacist",
                        loading: false,
                    });
                }
            },




            // DoctorPharmacists

            dataDoctorPharmacists: undefined,
            doctorPharmacistD: null,

            getDoctorPharmacistsData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiDoctorPharmacist.get(``, { params: { page, limit } });
                    const dataDoctorPharmacists = res.data.data;
                    const total = res.data.total;
                    const lastPage = res.data.lastPage;

                    set({ dataDoctorPharmacists, loading: false, total, lastPage });
                    return dataDoctorPharmacists;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading DoctorPharmacists",
                        loading: false,
                    });
                }
            },

            getDoctorPharmacistData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiDoctorPharmacist.get(`/${id}`);
                    const doctorPharmacistD = res.data;

                    set({ doctorPharmacistD, loading: false });
                    return doctorPharmacistD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading DoctorPharmacist",
                        loading: false,
                    });
                }
            },

            deleteDoctorPharmacist: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiDoctorPharmacist.delete(`/${id}`);
                    set((state) => ({
                        dataDoctorPharmacists: state.dataDoctorPharmacists?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Deleting DoctorPharmacist",
                        loading: false,
                    });
                }
            },

            editDoctorPharmacist: async (id: number, doctorPharmacist: AddingDoctorPharmacist) => {
                set({ loading: true, error: null });
                try {
                    await apiDoctorPharmacist.patch(`/${id}`, doctorPharmacist);
                    set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Editing DoctorPharmacist",
                        loading: false,
                    });
                }
            },

            addDoctorPharmacist: async (doctorPharmacist: AddingDoctorPharmacist) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiDoctorPharmacist.post(``, doctorPharmacist);
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding DoctorPharmacist",
                        loading: false,
                    });
                }
            },




            // HospitalDoctors
            dataHospitalDoctors: undefined,
            hospitalDoctorD: null,

            getHospitalDoctorsData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiHospitalDoctor.get(``, { params: { page, limit } });
                    const dataHospitalDoctors = res.data.data;
                    const total = res.data.total;
                    const lastPage = res.data.lastPage;

                    set({ dataHospitalDoctors, loading: false, total, lastPage });
                    return dataHospitalDoctors;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading HospitalDoctors",
                        loading: false,
                    });
                }
            },

            getHospitalDoctorData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiHospitalDoctor.get(`/${id}`);
                    const hospitalDoctorD = res.data;

                    set({ hospitalDoctorD, loading: false });
                    return hospitalDoctorD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading HospitalDoctor",
                        loading: false,
                    });
                }
            },

            deleteHospitalDoctor: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiHospitalDoctor.delete(`/${id}`);
                    set((state) => ({
                        dataHospitalDoctors: state.dataHospitalDoctors?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Deleting HospitalDoctor",
                        loading: false,
                    });
                }
            },

            editHospitalDoctor: async (id: number, hospitalDoctor: AddingHospitalDoctor) => {
                set({ loading: true, error: null });
                try {
                    await apiHospitalDoctor.patch(`/${id}`, hospitalDoctor);
                    set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Editing HospitalDoctor",
                        loading: false,
                    });
                }
            },

            addHospitalDoctor: async (hospitalDoctor: AddingHospitalDoctor) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiHospitalDoctor.post(``, hospitalDoctor);
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding HospitalDoctor",
                        loading: false,
                    });
                }
            },



            // HospitalPharmacists
            dataHospitalPharmacists: undefined,
            hospitalPharmacistD: null,

            getHospitalPharmacistsData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiHospitalPharmacist.get(``, { params: { page, limit } });
                    const dataHospitalPharmacists = res.data.data;
                    const total = res.data.total;
                    const lastPage = res.data.lastPage;

                    set({ dataHospitalPharmacists, loading: false, total, lastPage });
                    return dataHospitalPharmacists;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading HospitalPharmacists",
                        loading: false,
                    });
                }
            },

            getHospitalPharmacistData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiHospitalPharmacist.get(`/${id}`);
                    const hospitalPharmacistD = res.data;

                    set({ hospitalPharmacistD, loading: false });
                    return hospitalPharmacistD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading HospitalPharmacist",
                        loading: false,
                    });
                }
            },

            deleteHospitalPharmacist: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiHospitalPharmacist.delete(`/${id}`);
                    set((state) => ({
                        dataHospitalPharmacists: state.dataHospitalPharmacists?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Deleting HospitalPharmacist",
                        loading: false,
                    });
                }
            },

            editHospitalPharmacist: async (id: number, hospitalPharmacist: AddingHospitalPharmacist) => {
                set({ loading: true, error: null });
                try {
                    await apiHospitalPharmacist.patch(`/${id}`, hospitalPharmacist);
                    set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Editing HospitalPharmacist",
                        loading: false,
                    });
                }
            },

            addHospitalPharmacist: async (hospitalPharmacist: AddingHospitalPharmacist) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiHospitalPharmacist.post(``, hospitalPharmacist);
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding HospitalPharmacist",
                        loading: false,
                    });
                }
            },

        }),

        {
            name: 'medical-data-storage',
            storage: createJSONStorage(() => localStorage),
            //partialize: (state) => ({ data: state.dataSpecializations })
        } // AsyncStorage (React Native)
    )
);
