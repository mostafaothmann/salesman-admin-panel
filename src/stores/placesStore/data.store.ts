import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { apiArea, apiCity, apiGovernorate, apiSalesmanArea, apiStreet } from '../apis';
import { Area, City, Governorate, Street, AddingArea, AddingBuilding, AddingCity, AddingGovernorate, AddingStreet, AddingSalesmanArea } from '../places-store-Interfaces';



interface DataStore {
    dataGovernorates: Governorate[] | undefined;
    governorateD: Governorate,

    dataCities: City[] | undefined;
    cityD: City,

    dataAreas: Area[] | undefined;
    areaD: Area,

    dataStreets: Street[] | undefined;
    streetD: Street,

    loading: boolean;
    error: string | null;

    //for Governorates
    getGovernoratesData: () => Promise<void>;
    getGovernorateData: (id: number) => Promise<void>;
    addGovernotate: (governorate: AddingGovernorate) => Promise<any>;
    deleteGovernorate: (id: number) => Promise<any>;
    editGovernorate: (id: number, governorate: AddingGovernorate) => Promise<any>;

    // for City
    getCitiesData: () => Promise<void>;
    getCityData: (id: number) => Promise<void>;
    addCity: (city: AddingCity) => Promise<any>;
    deleteCity: (id: number) => Promise<any>;
    editCity: (id: number, city: AddingCity) => Promise<any>;

    // for Area
    getAreasData: () => Promise<void>;
    getAreaData: (id: number) => Promise<void>;
    addArea: (area: AddingArea) => Promise<any>;
    deleteArea: (id: number) => Promise<any>;
    editArea: (id: number, area: AddingArea) => Promise<any>;

    // for Street
    getStreetsData: () => Promise<void>;
    getStreetData: (id: number) => Promise<void>;
    addStreet: (street: AddingStreet) => Promise<any>;
    deleteStreet: (id: number) => Promise<any>;
    editStreet: (id: number, street: AddingStreet) => Promise<any>;

    // for Salesman Areas
    addSalesmanArea: (street: AddingSalesmanArea) => Promise<any>;
    deleteSalesmanArea: (id: number) => Promise<any>;

}
//gettig the token from Auth Store 
export const usePlacesStore = create<DataStore>()(
    persist(
        (set, get) => ({

            //Governorates
            dataGovernorates: undefined,
            governorateD: null,
            loading: false,
            error: null,
            // Get Governorates Data
            getGovernoratesData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiGovernorate.get(``);
                    const dataGovernorates = res.data
                    set({ dataGovernorates, loading: false });
                    return dataGovernorates
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Properties',
                        loading: false,
                    });
                }
            },
            // get One Governorate Data  👈
            getGovernorateData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiGovernorate.get(`/${id}`);
                    const governorateD = res.data
                    set({ governorateD, loading: false });
                    return governorateD
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Properties',
                        loading: false,
                    });
                }
            },
            deleteGovernorate: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiGovernorate.delete(`/${id}`);
                    set((state) => ({
                        dataGovernorates: state.dataGovernorates?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                    return res;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Deleting Area',
                        loading: false,
                    });
                }
            },
            //Editing Governorate
            editGovernorate: async (id: number, governorate: AddingGovernorate) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiGovernorate.patch(`/${id}`, governorate);
                    if (res.status != 201) { }
                    return res;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Materials',
                        loading: false,
                    });
                }
            },
            //Adding New Governorate
            addGovernotate: async (governorate: AddingGovernorate) => {
                set({ loading: true, error: null });
                try {
                    //   const { authData } = useAuthStore.getState(); // ✅ dynamically get latest auth data
                    //    property.customerId = authData?.id || 0;
                    const res = await apiGovernorate.post(``, governorate);
                    set({ loading: false });
                    if (res.status == 201) {
                        return res;
                    }

                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Properties',
                        loading: false,
                    });
                }
            },



            //Cities
            dataCities: undefined,
            cityD: null,
            // Get Governorates Data
            getCitiesData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiCity.get(``);
                    const dataCities = res.data
                    set({ dataCities, loading: false });
                    return dataCities
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Properties',
                        loading: false,
                    });
                }
            },
            // get One City Data  👈
            getCityData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiCity.get(`/${id}`);
                    const cityD = res.data
                    set({ cityD, loading: false });
                    return cityD
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Properties',
                        loading: false,
                    });
                }
            },
            deleteCity: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiCity.delete(`/${id}`);
                    set((state) => ({
                        dataCities: state.dataCities?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                    return res;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Deleting Area',
                        loading: false,
                    });
                }
            },
            //Editing City
            editCity: async (id: number, city: AddingCity) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiCity.patch(`/${id}`, city);
                    if (res.status != 201) { }
                    return res;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Materials',
                        loading: false,
                    });
                }
            },
            //Adding New City
            addCity: async (city: AddingCity) => {
                set({ loading: true, error: null });
                try {
                    if (city !== null) {
                        const res = await apiCity.post(``, city);
                        set({ loading: false });
                        if (res.status == 201) {

                        }
                        return res;
                    }
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Properties',
                        loading: false,
                    });
                }
            },



            // Areas
            dataAreas: undefined,
            areaD: null,
            // Get Areas Data
            getAreasData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiArea.get('');
                    console.log(res)
                    const dataAreas = res.data;
                    set({ dataAreas, loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Areas',
                        loading: false,
                    });
                }
            },
            // Get One Area
            getAreaData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiArea.get(`/${id}`);
                    const areaD = res.data;
                    set({ areaD, loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Area',
                        loading: false,
                    });
                }
            },
            // Delete Area
            deleteArea: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiArea.delete(`/${id}`);
                    set((state) => ({
                        dataAreas: state.dataAreas?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                    return res;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Deleting Area',
                        loading: false,
                    });
                }
            },
            // Edit Area
            editArea: async (id: number, area: AddingArea) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiArea.patch(`/${id}`, area);
                    set({ loading: false });
                    return res;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Editing Area',
                        loading: false,
                    });
                }
            },
            // Add New Area
            addArea: async (area: AddingArea) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiArea.post('', area);
                    set({ loading: false });
                    return res;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Adding Area',
                        loading: false,
                    });
                }
            },

            // Streets
            dataStreets: undefined,
            streetD: null,
            // Get Streets Data
            getStreetsData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiStreet.get('');
                    const dataStreets = res.data;
                    set({ dataStreets, loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Streets',
                        loading: false,
                    });
                }
            },
            // Get One Street
            getStreetData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiStreet.get(`/${id}`);
                    const streetD = res.data;
                    set({ streetD, loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Street',
                        loading: false,
                    });
                }
            },
            // Delete Street
            deleteStreet: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiStreet.delete(`/${id}`);
                    set((state) => ({
                        dataStreets: state.dataStreets?.filter((s) => s.id !== id),
                        loading: false,
                    }));
                    return res;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Deleting Street',
                        loading: false,
                    });
                }
            },
            // Edit Street
            editStreet: async (id: number, street: AddingStreet) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiStreet.patch(`/${id}`, street);
                    set({ loading: false });
                    return res;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Editing Street',
                        loading: false,
                    });
                }
            },
            // Add New Street
            addStreet: async (street: AddingStreet) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiStreet.post('', street);
                    set({ loading: false });
                    return res;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Adding Street',
                        loading: false,
                    });
                }
            },

            // Get Salesman Area

            // Delete Salesman Area
            deleteSalesmanArea: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSalesmanArea.delete(`/${id}`);
                    set((state) => ({
                        loading: false,
                    }));
                    return res;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Deleting Street',
                        loading: false,
                    });
                }
            },
            // Add Salesman Area
            addSalesmanArea: async (street: AddingSalesmanArea) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSalesmanArea.post('', street);
                    set({ loading: false });
                    return res;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Adding Street',
                        loading: false,
                    });
                }
            },


        }),

        {
            name: 'places-data-storage',
            storage: createJSONStorage(() => localStorage),
            //partialize: (state) => ({ data: state.dataGovernorates })
        }
    )
);
