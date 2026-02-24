import { create } from 'zustand';
import axios from 'axios';
import { useAuthStore } from '../customersStore/auth.store';
import { persist, createJSONStorage } from 'zustand/middleware'
import { apiCity, apiDoctor, apiSpecialization, apiSpecializationType } from '../apis';
import { AddingDoctor, AddingSpecialization, AddingSpecializationType, Doctor, FilterDoctorProps, Specialization, SpecializationType } from '../medical-store-interfaces';
import { Type } from '../types-store-interfaces';



interface DataStore {
    dataSpecializations: Specialization[] | undefined;
    specializationD: Specialization,

    dataSpecializationTypes: SpecializationType[] | undefined;
    specializationTypeD: SpecializationType,

    dataDoctors: Doctor[];
    doctorD: Doctor;

    filteredDataDoctors: Doctor[];

    typesForSpecialization: Type[] | undefined;

    loading: boolean;
    error: string | null;

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
    getDoctorsData: () => Promise<void>;
    getDoctorData: (id: number) => Promise<void>;
    // getVisitsForDoctor: (id: number) => Promise<void>;
    addDoctor: (doctor: AddingDoctor) => Promise<void>;
    deleteDoctor: (id: number) => Promise<void>;
    editDoctor: (id: number, doctor: AddingDoctor) => Promise<void>;
    getFilteredDataDoctors: (filters: FilterDoctorProps) => Promise<void>;

}
//gettig the token from Auth Store 
export const useMedicalStore = create<DataStore>()(
    persist(
        (set, get) => ({

            //Specializations
            dataSpecializations: undefined,
            specializationD: null,
            typesForSpecialization: null,
            loading: false,
            error: null,
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
                    const typesForSpecialization = res.data
                    set({ typesForSpecialization, loading: false });
                    return typesForSpecialization
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
            getDoctorsData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiDoctor.get(``);
                    const dataDoctors = res.data;

                    set({ dataDoctors, loading: false });
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
                        const filteredDataDoctors = res.data;
                        set({ filteredDataDoctors, loading: false });
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


        }),

        {
            name: 'medical-data-storage',
            storage: createJSONStorage(() => localStorage),
            //partialize: (state) => ({ data: state.dataSpecializations })
        } // AsyncStorage (React Native)
    )
);
