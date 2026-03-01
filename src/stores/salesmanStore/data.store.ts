import { create } from 'zustand';
import axios from 'axios';
import { persist, createJSONStorage } from 'zustand/middleware'
import { apiSalesman } from '../api';
import { Salesman } from '../salesman-store-interfaces';


interface DataStore {
    dataSalesmans: Salesman[] | undefined;
    loading: boolean;
    salesmanD: Salesman,
    error: string | null;
    getSalesmansData: () => Promise<void>;
}
//gettig the token from Auth Store 
export const useSalesmanDataStore = create<DataStore>()(
    persist(
        (set, get) => ({
            dataSalesmans: undefined,
            salesmanD: Object(),
            loading: false,
            error: null,
            // Get Properties Data
            getSalesmansData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSalesman.get(``);
                    const dataSalesmans = res.data
                    set({ dataSalesmans, loading: false });
                    return dataSalesmans
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Salesmans',
                        loading: false,
                    });
                }
            },

            //Adding New Salesman
            addSalesman: async (salesman: Salesman | null) => {
                set({ loading: true, error: null });
                try {
                    if (salesman !== null) {
                    //    const { authData } = useAuthStore.getState(); // ✅ dynamically get latest auth data
                   //     property = authData?.id || 0;
                        const res = await apiSalesman.post(``, salesman);
                        set({ loading: false });
                        if (res.status == 201) {

                        }
                    }
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Posting Salesman',
                        loading: false,
                    });
                }
            },


        }),
        {
            name: 'salesmans-data-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ data: state.dataSalesmans })
        } // AsyncStorage (React Native)
    )
);
