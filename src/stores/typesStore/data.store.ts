import { create } from 'zustand';
import axios from 'axios';
import { useAuthStore } from '../customersStore/auth.store';
import { persist, createJSONStorage } from 'zustand/middleware'
import { apiGroupType, apiType } from '../apis';
import { AddingGroupType, AddingType, BaseOffer, GroupType, Ingredient, OnlineProduct, Product, RecoveryCase, Type } from '../types-store-interfaces';
import { Doctor, DoctorSample, Pharmacist, PharmacistSample, Specialization } from '../medical-store-interfaces';



interface DataStore {
    dataGroupTypes: GroupType[] | undefined;
    groupTypeD: GroupType,

    dataTypes: Type[] | undefined;
    typeD: Type,
    dataSpecializationForType: any[],
    dataDoctorsVisitsForType: Doctor[],
    dataPharmacistsVisitsForType: Pharmacist[],
    dataDoctorsSamplesForType: DoctorSample[],
    dataPharmacistsSamplesForType: PharmacistSample[],
    dataIngredientsForType: Ingredient[],
    dataProductsForType: Product[],
    dataOnlinProductsForType: OnlineProduct[],
    dataBaseOffersForType: BaseOffer[],
    dataRecoveryCasesForType: RecoveryCase[],
    loading: boolean;
    error: string | null;

    // for GroupTypes
    getGroupTypesData: () => Promise<void>;
    getGroupTypeData: (id: number) => Promise<void>;
    addGroupType: (groupType: AddingGroupType) => Promise<void>;
    deleteGroupType: (id: number) => Promise<void>;
    editGroupType: (id: number, groupType: AddingGroupType) => Promise<void>;

    // for Types
    getTypesData: () => Promise<void>;
    getTypeData: (id: number) => Promise<void>;
    addType: (groupType: AddingGroupType) => Promise<void>;
    deleteType: (id: number) => Promise<void>;
    editType: (id: number, groupType: AddingGroupType) => Promise<void>;
    //for other relations 
    getSpecializationForType: (id: number) => Promise<void>;
    getDoctorsVisitsForType: (id: number) => Promise<void>;
    getPharmacistsVisitsForType: (id: number) => Promise<void>;
    getOnlineProductsForType: (id: number) => Promise<void>;
    getProductsForType: (id: number) => Promise<void>;
    getIngredientsForType: (id: number) => Promise<void>;
    getDoctorsSamplesForType: (id: number) => Promise<void>;
    getPharmacistsSamplesForType: (id: number) => Promise<void>
    getBaseOffersForType: (id: number) => Promise<void>;

}
//gettig the token from Auth Store 
export const useTypeStore = create<DataStore>()(
    persist(
        (set, get) => ({
            // GroupTypes
            dataGroupTypes: undefined,
            groupTypeD: null,
            typesForGroupType: null,
            loading: false,
            error: null,

            getGroupTypesData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiGroupType.get(``);
                    const dataGroupTypes = res.data;
                    console.log(dataGroupTypes)
                    set({ dataGroupTypes, loading: false });
                    return dataGroupTypes;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading GroupTypes',
                        loading: false,
                    });
                }
            },

            getGroupTypeData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiGroupType.get(`/${id}`);
                    const groupTypeD = res.data;
                    set({ groupTypeD, loading: false });
                    return groupTypeD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading GroupType',
                        loading: false,
                    });
                }
            },


            deleteGroupType: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiGroupType.delete(`/${id}`);
                    set((state) => ({
                        dataGroupTypes: state.dataGroupTypes?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Deleting GroupType',
                        loading: false,
                    });
                }
            },

            editGroupType: async (id: number, groupType: AddingGroupType) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiGroupType.patch(`/${id}`, groupType);
                    if (res.status != 201) { }
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading GroupType',
                        loading: false,
                    });
                }
            },

            addGroupType: async (groupType: AddingGroupType) => {
                set({ loading: true, error: null });
                try {
                    if (groupType !== null) {
                        const res = await apiGroupType.post(``, groupType);
                        set({ loading: false });
                        if (res.status == 201) { }
                    }
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading GroupTypes',
                        loading: false,
                    });
                }
            },






            // Types
            dataTypes: undefined,
            dataSpecializationForType: undefined,
            dataDoctorsSamplesForType: undefined,
            dataDoctorsVisitsForType: undefined,
            dataIngredientsForType: undefined,
            dataOnlinProductsForType: undefined,
            dataPharmacistsSamplesForType: undefined,
            dataPharmacistsVisitsForType: undefined,
            dataProductsForType: undefined,
            dataBaseOffersForType: undefined,
            dataRecoveryCasesForType: undefined,
            typeD: null,

            getTypesData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiType.get(``);
                    const dataTypes = res.data;
                    set({ dataTypes, loading: false });
                    return dataTypes;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Types',
                        loading: false,
                    });
                }
            },

            getTypeData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiType.get(`/${id}`);
                    const typeD = res.data;
                    set({ typeD, loading: false });
                    return typeD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Type',
                        loading: false,
                    });
                }
            },

            deleteType: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiType.delete(`/${id}`);
                    set((state) => ({
                        dataTypes: state.dataTypes?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Deleting Type',
                        loading: false,
                    });
                }
            },

            editType: async (id: number, type: AddingType) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiType.patch(`/${id}`, type);
                    if (res.status != 201) { }
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Type',
                        loading: false,
                    });
                }
            },

            addType: async (type: AddingType) => {
                set({ loading: true, error: null });
                try {
                    if (type !== null) {
                        const res = await apiType.post(``, type);
                        set({ loading: false });
                        if (res.status == 201) { }
                    }
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Types',
                        loading: false,
                    });
                }
            },





            //for other relations 
            getSpecializationForType: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiType.get(`/specializations/${id}`);
                    const dataSpecializationForType = res.data;
                    set({ dataSpecializationForType, loading: false });
                    return dataSpecializationForType;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Types',
                        loading: false,
                    });
                }
            },

            getDoctorsVisitsForType: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiType.get(`/doctors-visits/${id}`);
                    const dataDoctorsVisitsForType = res.data;
                    set({ dataDoctorsVisitsForType, loading: false });
                    return dataDoctorsVisitsForType;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Types',
                        loading: false,
                    });
                }
            },

            getPharmacistsVisitsForType: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiType.get(`/pharmacists-visits/${id}`);
                    const dataPharmacistsVisitsForType = res.data;
                    set({ dataPharmacistsVisitsForType, loading: false });
                    return dataPharmacistsVisitsForType;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Types',
                        loading: false,
                    });
                }
            },

            getDoctorsSamplesForType: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiType.get(`/samples-doctors/${id}`);
                    const dataDoctorsSamplesForType = res.data;
                    set({ dataDoctorsSamplesForType, loading: false });
                    return dataDoctorsSamplesForType;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Types',
                        loading: false,
                    });
                }
            },

            getPharmacistsSamplesForType: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiType.get(`/samples-pharmacists/${id}`);
                    const dataPharmacistsSamplesForType = res.data;
                    set({ dataPharmacistsSamplesForType, loading: false });
                    return dataPharmacistsSamplesForType;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Types',
                        loading: false,
                    });
                }
            },

            getBaseOffersForType: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiType.get(`/base-offers/${id}`);
                    const dataBaseOffersForType = res.data;
                    set({ dataBaseOffersForType, loading: false });
                    return dataBaseOffersForType;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Types',
                        loading: false,
                    });
                }
            },

            getRecoveryCasesForType: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiType.get(`/recovery-cases/${id}`);
                    const dataRecoveryCasesForType = res.data;
                    set({ dataRecoveryCasesForType, loading: false });
                    return dataRecoveryCasesForType;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Types',
                        loading: false,
                    });
                }
            },

            getProductsForType: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiType.get(`/products/${id}`);
                    const dataProductsForType = res.data;
                    set({ dataProductsForType, loading: false });
                    return dataProductsForType;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Types',
                        loading: false,
                    });
                }
            },

            getOnlineProductsForType: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiType.get(`/online-products/${id}`);
                    const dataOnlinProductsForType = res.data;
                    set({ dataOnlinProductsForType, loading: false });
                    return dataOnlinProductsForType;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Types',
                        loading: false,
                    });
                }
            },

            getIngredientsForType: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiType.get(`/ingredients/${id}`);
                    const dataIngredientsForType = res.data;
                    set({ dataIngredientsForType, loading: false });
                    return dataIngredientsForType;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Types',
                        loading: false,
                    });
                }
            },

        }),
        {
            name: 'places-data-storage',
            storage: createJSONStorage(() => localStorage),
            //partialize: (state) => ({ data: state.dataGovernorates })
        } // AsyncStorage (React Native)
    )
);
