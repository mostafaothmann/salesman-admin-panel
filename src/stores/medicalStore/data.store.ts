import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import {
    apiDoctor, apiDoctorPharmacist, apiVisit, apiHospitalDoctor,
    apiHospitalPharmacist, apiPharmacist,
    apiSample, apiSpecialization, apiSpecializationType, apiِAssociationDoctor,
    apiAssociation,
    apiHospital,
    apiِAssociationPharmacist
} from '../apis';
import {
    AddingAssociationDoctor, AddingAssociationPharmacist, AddingDoctor,
    AddingDoctorPharmacist, AddingDoctorSample, AddingDoctorVisit, AddingHospitalDoctor,
    AddingHospitalPharmacist, AddingPharmacist, AddingPharmacistSample, AddingPharmacistVisit,
    AddingSpecialization,
    AddingSpecializationType, AssociationDoctor, AssociationPharmacist,
    Doctor, DoctorPharmacist, DoctorSample, DoctorVisit, FilterDoctorProps,
    FilterSamplesProps,
    FilterDoctorVisitProps,
    FilterPharmacistProps, HospitalDoctor, HospitalPharmacist, Pharmacist,
    PharmacistSample,
    PharmacistVisit, Specialization, SpecializationType,
    AddingAssociation,
    Association,
    AddingHospital,
    Hospital,
    FilterPharmacistVisitProps,
    Sample,
    AddingSample,
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
    filteredDataDoctorsVisits: DoctorVisit[],

    dataPharmacistsVisits: PharmacistVisit[] | undefined;
    pharmacistVisitD: PharmacistVisit,
    filteredDataPharmacistsVisits: PharmacistVisit[],


    dataAssociationDoctors: AssociationDoctor[] | undefined;
    associationDoctorD: AssociationDoctor,

    dataAssociationPharmacists: AssociationPharmacist[] | undefined;
    associationPharmacistD: AssociationPharmacist,

    dataHospitals: Hospital[] | undefined;
    hospitalD: Hospital,

    dataHospitalDoctors: HospitalDoctor[] | undefined;
    hospitalDoctorD: HospitalDoctor,

    dataHospitalPharmacists: HospitalPharmacist[] | undefined;
    hospitalPharmacistD: HospitalPharmacist,

    dataSamples: Sample[] | undefined;
    sampleD: Sample,
    filteredDataSamples: Sample[],

    dataPharmacistSamples: PharmacistSample[] | undefined;
    pharmacistSampleD: PharmacistSample,
    filteredDataPharmacistsSamples: PharmacistSample[],

    dataDoctorSamples: DoctorSample[] | undefined;
    doctorSampleD: DoctorSample,
    filteredDataDoctorsSamples: DoctorSample[],

    dataDoctorPharmacists: DoctorPharmacist[] | undefined;
    doctorPharmacistD: DoctorPharmacist,

    dataAssociations: Association[],
    associationD: Association,

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
    getFilteredDataDoctorsVisits: (filters: FilterDoctorVisitProps) => Promise<void>;

    // For PharmacistVisits
    getPharmacistsVisitsData: (page: number, limit: number) => Promise<void>;
    getPharmacistVisitData: (id: number) => Promise<void>;
    addPharmacistVisit: (pharmacistVisit: PharmacistVisit) => Promise<void>;
    deletePharmacistVisit: (id: number) => Promise<void>;
    editPharmacistVisit: (id: number, pharmacistVisit: AddingPharmacistVisit) => Promise<void>;
    getFilteredDataPharmacistsVisits: (filters: FilterPharmacistVisitProps) => Promise<void>;

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

    // Association
    getAssociationsData: () => Promise<void>;
    getAssociationData: (id: number) => Promise<void>;
    addAssociation: (association: AddingAssociation) => Promise<void>;
    deleteAssociation: (id: number) => Promise<void>;
    editAssociation: (id: number, association: AddingAssociation) => Promise<void>;

    // Sample
    getSamplesData: (page: number, limit: number) => Promise<void>;
    getSampleData: (id: number) => Promise<void>;
    addSample: (DoctorSample: AddingSample) => Promise<void>;
    deleteSample: (id: number) => Promise<void>;
    editSample: (id: number, DoctorSample: AddingSample) => Promise<void>;
    getFilteredDataSamples: (filters: FilterSamplesProps) => Promise<void>;

    // DoctorSample
    getDoctorSamplesData: (page: number, limit: number) => Promise<void>;
    getDoctorSampleData: (id: number) => Promise<void>;
    addDoctorSample: (DoctorSample: AddingDoctorSample) => Promise<void>;
    deleteDoctorSample: (id: number) => Promise<void>;
    editDoctorSample: (id: number, DoctorSample: AddingDoctorSample) => Promise<void>;
    getFilteredDataDoctorsSamples: (filters: FilterSamplesProps) => Promise<void>;

    // PharmacistSample
    getPharmacistSamplesData: (page: number, limit: number) => Promise<void>;
    getpharmacistSampleData: (id: number) => Promise<void>;
    addPharmacistSample: (PharmacistSample: AddingPharmacistSample) => Promise<void>;
    deletePharmacistSample: (id: number) => Promise<void>;
    editPharmacistSample: (id: number, PharmacistSample: AddingPharmacistSample) => Promise<void>;
    getFilteredDataPharmacistsSamples: (filters: FilterSamplesProps) => Promise<void>;


    // Hospital
    getHospitalsData: () => Promise<void>;
    getHospitalData: (id: number) => Promise<void>;
    addHospital: (hospitalDoctor: AddingHospital) => Promise<void>;
    deleteHospital: (id: number) => Promise<void>;
    editHospital: (id: number, hospitalDoctor: AddingHospital) => Promise<void>;


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
                            "Error Filtering Doctors",
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
                            "Error Filtering Pharmacists",
                        loading: false,
                    });
                }
            },




            // DoctorVisits
            dataDoctorsVisits: undefined,
            doctorVisitD: null,
            filteredDataDoctorsVisits: undefined,

            getDoctorsVisitsData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiVisit.get(`/doctors`, { params: { page, limit } });
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
                    const res = await apiVisit.get(`/${id}`);
                    const doctorVisitD = res?.data[0];
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
                    await apiVisit.delete(`/${id}`);
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

            editDoctorVisit: async (id: number, doctorVisit: DoctorVisit) => {
                set({ loading: true, error: null });
                try {
                    console.log(doctorVisit)
                    await apiVisit.patch(`/${id}`, { visit_status_id: doctorVisit?.visit_status_id });
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
                    const res = await apiVisit.post(``, { ...doctorVisit, typeC: 'doctor' });
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding DoctorVisit",
                        loading: false,
                    });
                }
            },
            //Get Filtered Data
            getFilteredDataDoctorsVisits: async (
                filters: FilterDoctorVisitProps
            ) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiVisit.post(
                        `/doctors/filter`,
                        filters
                    );
                    if (res.status === 201) {
                        console.log(res.data)

                        const filteredDataDoctorsVisits = res.data.data;
                        const filter_total = res.data.total;

                        set({ filteredDataDoctorsVisits, loading: false, filter_total });
                        return filteredDataDoctorsVisits;
                    }
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Filtering Doctors Visits",
                        loading: false,
                    });
                }
            },








            // PharmacistVisits
            dataPharmacistsVisits: undefined,
            pharmacistVisitD: null,
            filteredDataPharmacistsVisits: undefined,

            getPharmacistsVisitsData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiVisit.get(`/pharmacists`, { params: { page, limit } });
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
                    const res = await apiVisit.get(`/${id}`);
                    const pharmacistVisitD = res.data[0];
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
                    await apiVisit.delete(`/${id}`);
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

            editPharmacistVisit: async (id: number, pharmacistVisit: PharmacistVisit) => {
                set({ loading: true, error: null });
                try {
                    await apiVisit.patch(`/${id}`, { visit_status_id: pharmacistVisit?.visit_status_id });
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
                    const res = await apiVisit.post(``, { ...pharmacistVisit, typeC: 'pharmacist' });
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding PharmacistVisit",
                        loading: false,
                    });
                }
            },
            //Get Filtered Data
            getFilteredDataPharmacistsVisits: async (
                filters: FilterPharmacistVisitProps
            ) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiVisit.post(
                        `/pharmacists/filter`,
                        filters
                    );
                    if (res.status === 201) {
                        console.log(res.data)

                        const filteredDataPharmacistsVisits = res.data.data;
                        const filter_total = res.data.total;

                        set({ filteredDataPharmacistsVisits, loading: false, filter_total });
                        return filteredDataPharmacistsVisits;
                    }
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Filtering Pharmacists Visits",
                        loading: false,
                    });
                }
            },






            // AssociationDoctors
            dataAssociations: undefined,
            associationD: null,
            // Get Associations Data
            getAssociationsData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiAssociation.get(``);
                    const dataAssociations = res.data
                    set({ dataAssociations, loading: false });
                    return dataAssociations
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Associations',
                        loading: false,
                    });
                }
            },

            // Get One Association Data
            getAssociationData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiAssociation.get(`/${id}`);
                    const associationD = res.data
                    set({ associationD, loading: false });
                    return associationD
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Association',
                        loading: false,
                    });
                }
            },

            // Delete Association
            deleteAssociation: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiAssociation.delete(`/${id}`);
                    set((state) => ({
                        dataAssociations: state.dataAssociations?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Deleting Association',
                        loading: false,
                    });
                }
            },

            // Edit Association
            editAssociation: async (id: number, association: AddingAssociation) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiAssociation.patch(`/${id}`, association);
                    if (res.status != 201) { }

                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Editing Association',
                        loading: false,
                    });
                }
            },

            // Add New Association
            addAssociation: async (association: AddingAssociation) => {
                set({ loading: true, error: null });
                try {
                    if (association !== null) {
                        const res = await apiAssociation.post(``, association);
                        set({ loading: false });
                        if (res.status == 201) {

                        }
                    }
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Adding Association',
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









            // DoctorSamples

            dataSamples: undefined,
            sampleD: null,
            filteredDataSamples: undefined,

            getSamplesData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSample.get(``, { params: { page, limit } });
                    const dataSamples = res.data.data;
                    const total = res.data.total;
                    const lastPage = res.data.lastPage;

                    set({ dataSamples, loading: false, total, lastPage });
                    return dataSamples;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading Samples",
                        loading: false,
                    });
                }
            },

            getSampleData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSample.get(`/${id}`);
                    const sampleD = res.data;

                    set({ sampleD, loading: false });
                    return sampleD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading Sample",
                        loading: false,
                    });
                }
            },

            deleteSample: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiSample.delete(`/${id}`);
                    set((state) => ({
                        dataSamples: state.dataSamples?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Deleting Sample",
                        loading: false,
                    });
                }
            },

            editSample: async (id: number, sample: AddingSample) => {
                set({ loading: true, error: null });
                try {
                    await apiSample.patch(`/${id}`, sample);
                    set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Editing Sample",
                        loading: false,
                    });
                }
            },

            addSample: async (Sample: AddingSample) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSample.post(``, Sample);
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding Sample",
                        loading: false,
                    });
                }
            },

            //Get Filtered Data
            getFilteredDataSamples: async (
                filters: FilterSamplesProps
            ) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSample.post(
                        `/filter`,
                        filters
                    );
                    if (res.status === 201) {

                        const filteredDataSamples = res.data.data;
                        const filter_total = res.data.total;

                        set({ filteredDataSamples, loading: false, filter_total });
                        return filteredDataSamples;
                    }
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Adding Samples",
                        loading: false,
                    });
                }
            },






            // DoctorSamples
            dataDoctorSamples: undefined,
            doctorSampleD: null,
            filteredDataDoctorsSamples: undefined,
            getDoctorSamplesData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSample.get(`/doctors`, { params: { page, limit } });
                    const dataDoctorSamples = res.data.data;
                    const total = res.data.total;
                    const lastPage = res.data.lastPage;

                    set({ dataDoctorSamples, loading: false, total, lastPage });
                    return dataDoctorSamples;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading DoctorSamples",
                        loading: false,
                    });
                }
            },

            getDoctorSampleData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSample.get(`/${id}`);
                    const doctorSampleD = res.data;

                    set({ doctorSampleD, loading: false });
                    return doctorSampleD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading DoctorSample",
                        loading: false,
                    });
                }
            },

            deleteDoctorSample: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiSample.delete(`/${id}`);
                    set((state) => ({
                        dataDoctorSamples: state.dataDoctorSamples?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Deleting DoctorSample",
                        loading: false,
                    });
                }
            },

            editDoctorSample: async (id: number, DoctorSample: AddingDoctorSample) => {
                set({ loading: true, error: null });
                try {
                    await apiSample.patch(`/${id}`, DoctorSample);
                    set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Editing DoctorSample",
                        loading: false,
                    });
                }
            },

            addDoctorSample: async (DoctorSample: AddingDoctorSample) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSample.post(``, DoctorSample);
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding DoctorSample",
                        loading: false,
                    });
                }
            },

            //Get Filtered Data
            getFilteredDataDoctorsSamples: async (
                filters: FilterSamplesProps
            ) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSample.post(
                        `/filter`,
                        filters
                    );
                    if (res.status === 201) {

                        const filteredDataDoctorsSamples = res.data.data;
                        const filter_total = res.data.total;

                        set({ filteredDataDoctorsSamples, loading: false, filter_total });
                        return filteredDataDoctorsSamples;
                    }
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Adding Samples",
                        loading: false,
                    });
                }
            },






            // PharmacistSamples
            dataPharmacistSamples: undefined,
            pharmacistSampleD: null,
            filteredDataPharmacistsSamples: undefined,
            getPharmacistSamplesData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSample.get(`/pharmacists`, { params: { page, limit } });
                    const dataPharmacistSamples = res.data.data;
                    const total = res.data.total;
                    const lastPage = res.data.lastPage;

                    set({ dataPharmacistSamples, loading: false, total, lastPage });
                    return dataPharmacistSamples;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading PharmacistSamples",
                        loading: false,
                    });
                }
            },

            getpharmacistSampleData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSample.get(`/${id}`);
                    const pharmacistSampleD = res.data;

                    set({ pharmacistSampleD, loading: false });
                    return pharmacistSampleD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading PharmacistSample",
                        loading: false,
                    });
                }
            },

            deletePharmacistSample: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiSample.delete(`/${id}`);
                    set((state) => ({
                        dataPharmacistSamples: state.dataPharmacistSamples?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Deleting PharmacistSample",
                        loading: false,
                    });
                }
            },

            editPharmacistSample: async (id: number, PharmacistSample: AddingPharmacistSample) => {
                set({ loading: true, error: null });
                try {
                    await apiSample.patch(`/${id}`, PharmacistSample);
                    set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Editing PharmacistSample",
                        loading: false,
                    });
                }
            },

            addPharmacistSample: async (PharmacistSample: AddingPharmacistSample) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSample.post(``, PharmacistSample);
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding PharmacistSample",
                        loading: false,
                    });
                }
            },


            //Get Filtered Data
            getFilteredDataPharmacistsSamples: async (
                filters: FilterSamplesProps
            ) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSample.post(
                        `/filter`,
                        filters
                    );
                    if (res.status === 201) {

                        const filteredDataPharmacistsSamples = res.data.data;
                        const filter_total = res.data.total;

                        set({ filteredDataPharmacistsSamples, loading: false, filter_total });
                        return filteredDataPharmacistsSamples;
                    }
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            "Error Adding Samples",
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



            // Hospital
            dataHospitals: undefined,
            hospitalD: null,

            getHospitalsData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiHospital.get(``);
                    const dataHospitals = res.data;
                    set({ dataHospitals, loading: false });
                    return dataHospitals;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading Hospital",
                        loading: false,
                    });
                }
            },

            getHospitalData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiHospital.get(`/${id}`);
                    const hospitalD = res.data;

                    set({ hospitalD, loading: false });
                    return hospitalD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading Hospital",
                        loading: false,
                    });
                }
            },

            deleteHospital: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiHospital.delete(`/${id}`);
                    set((state) => ({
                        dataHospitals: state.dataHospitals?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Deleting Hospital",
                        loading: false,
                    });
                }
            },

            editHospital: async (id: number, hospitalPharmacist: AddingHospital) => {
                set({ loading: true, error: null });
                try {
                    await apiHospital.patch(`/${id}`, hospitalPharmacist);
                    set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Editing Hospital",
                        loading: false,
                    });
                }
            },

            addHospital: async (hospitalPharmacist: AddingHospital) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiHospital.post(``, hospitalPharmacist);
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding HospitalPharmacist",
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
        } 
    )
);
