import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { AddingAssistant, AddingSalesman, Assistant, Salesman } from '../users-store-interfaces';
import { apiSalesman } from '../api';
import { apiAssistant } from '../apis';



interface DataStore {
    dataSalesmans: Salesman[] | undefined;
    salesmanD: Salesman,
    dataAssistants: Assistant[] | undefined;
    assistantD: Assistant,


    loading: boolean;
    error: string | null;

    //for Salesmans
    getSalesmansData: () => Promise<void>;
    getSalesmanData: (id: number) => Promise<void>;
    addSalesman: (salesman: AddingSalesman) => Promise<void>;
    deleteSalesman: (id: number) => Promise<void>;
    editSalesman: (id: number, salesman: AddingSalesman) => Promise<void>;

    // For Assistants
    getAssistantsData: () => Promise<void>;
    getAssistantData: (id: number) => Promise<void>;
    addAssistant: (assistant: AddingAssistant) => Promise<void>;
    deleteAssistant: (id: number) => Promise<void>;
    editAssistant: (id: number, assistant: AddingAssistant) => Promise<void>;

}
//gettig the token from Auth Store 
export const usePlacesStore = create<DataStore>()(
    persist(
        (set, get) => ({

            //Salesmans
            dataSalesmans: undefined,
            salesmanD: null,
            loading: false,
            error: null,
            // Get Salesmans Data
            getSalesmansData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSalesman.get(``);
                    const dataSalesmans = res.data
                    set({ dataSalesmans, loading: false });
                    return dataSalesmans
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Properties',
                        loading: false,
                    });
                }
            },
            // get One Salesman Data  👈
            getSalesmanData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSalesman.get(`/${id}`);
                    const salesmanD = res.data
                    set({ salesmanD, loading: false });
                    return salesmanD
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Properties',
                        loading: false,
                    });
                }
            },
            deleteSalesman: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiSalesman.delete(`/${id}`);
                    set((state) => ({
                        dataSalesmans: state.dataSalesmans?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Deleting Area',
                        loading: false,
                    });
                }
            },
            //Editing Salesman
            editSalesman: async (id: number, salesman: AddingSalesman) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSalesman.patch(`/${id}`, salesman);
                    if (res.status != 201) { }

                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Materials',
                        loading: false,
                    });
                }
            },
            //Adding New Salesman
            addSalesman: async (salesman: AddingSalesman) => {
                set({ loading: true, error: null });
                try {
                    if (salesman !== null) {
                        //   const { authData } = useAuthStore.getState(); // ✅ dynamically get latest auth data
                        //    property.customerId = authData?.id || 0;
                        const res = await apiSalesman.post(``, salesman);
                        set({ loading: false });
                        if (res.status == 201) {

                        }
                    }
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Properties',
                        loading: false,
                    });
                }
            },




            //Assistants
            dataAssistants: undefined,
            assistantD: null,

            getAssistantsData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiAssistant.get(``);
                    const dataAssistants = res.data;
                    set({ dataAssistants, loading: false });
                    return dataAssistants;
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Loading Assistants', loading: false });
                }
            },

            getAssistantData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiAssistant.get(`/${id}`);
                    const assistantD = res.data;
                    set({ assistantD, loading: false });
                    return assistantD;
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Loading Assistant', loading: false });
                }
            },

            deleteAssistant: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiAssistant.delete(`/${id}`);
                    set((state) => ({
                        dataAssistants: state.dataAssistants?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Deleting Assistant', loading: false });
                }
            },

            editAssistant: async (id: number, assistant: AddingAssistant) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiAssistant.patch(`/${id}`, assistant);
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Editing Assistant', loading: false });
                }
            },

            addAssistant: async (assistant: AddingAssistant) => {
                set({ loading: true, error: null });
                try {
                    if (assistant !== null) {
                        const res = await apiAssistant.post(``, assistant);
                        set({ loading: false });
                    }
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Adding Assistant', loading: false });
                }
            },



        }),

        {
            name: 'users-data-storage',
            storage: createJSONStorage(() => localStorage),
            //partialize: (state) => ({ data: state.dataSalesmans })
        } // AsyncStorage (React Native)
    )
);
