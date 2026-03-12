import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { AddingMall, AddingOffer, AddingOnlineCustomer, AddingOnlineOffer, AddingOnlineOrder, AddingOrder, Mall, Offer, OnlineCustomer, OnlineOffer, OnlineOrder, Order } from '../commercial-store-interfaces';
import { apiBaseOffer, apiMall, apiOffer, apiOnlineCustomer, apiOnlineOffer, apiOnlineOrder, apiOnlineProduct, apiOrder, apiProduct } from '../apis';
import { AddingBaseOffer, AddingOnlineProduct, AddingProduct, BaseOffer, OnlineProduct, Product } from '../types-store-interfaces';


interface DataStore {
    dataOrders: Order[] | undefined;
    orderD: Order,

    dataOnlineOrders: OnlineOrder[] | undefined;
    onlineOrderD: OnlineOrder,

    dataProducts: Product[] | undefined;
    productD: Product,

    dataOnlineProducts: OnlineProduct[] | undefined;
    onlineProductD: OnlineProduct,

    dataOffers: Offer[] | undefined;
    offerD: Offer,

    dataOnlineOffers: OnlineOffer[] | undefined;
    onlineOfferD: OnlineOffer,

    dataBaseOffers: BaseOffer[] | undefined;
    baseOfferD: BaseOffer,

    dataOnlineCustomers: OnlineCustomer[] | undefined;
    onlineCustomerD: OnlineCustomer,

    dataMalls: Mall[] | undefined;
    mallD: Mall,

    loading: boolean;
    error: string | null;

    // For Malls
    getMallsData: () => Promise<void>;
    getMallData: (id: number) => Promise<void>;
    addMall: (product: AddingMall) => Promise<void>;
    deleteMall: (id: number) => Promise<void>;
    editMall: (id: number, product: AddingMall) => Promise<void>;

    //for Orders
    getOrdersData: () => Promise<void>;
    getOrderData: (id: number) => Promise<void>;
    addOrder: (order: AddingOrder) => Promise<void>;
    deleteOrder: (id: number) => Promise<void>;
    editOrder: (id: number, order: AddingOrder) => Promise<void>;

    // For OnlineOrders
    getOnlineOrdersData: () => Promise<void>;
    getOnlineOrderData: (id: number) => Promise<void>;
    addOnlineOrder: (onlineOrder: AddingOnlineOrder) => Promise<void>;
    deleteOnlineOrder: (id: number) => Promise<void>;
    editOnlineOrder: (id: number, onlineOrder: AddingOnlineOrder) => Promise<void>;

    // For Products
    getProductsData: () => Promise<void>;
    getProductData: (id: number) => Promise<void>;
    addProduct: (product: AddingProduct) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
    editProduct: (id: number, product: AddingProduct) => Promise<void>;

    // For OnlineProducts
    getOnlineProductsData: () => Promise<void>;
    getOnlineProductData: (id: number) => Promise<void>;
    addOnlineProduct: (onlineProduct: AddingOnlineProduct) => Promise<void>;
    deleteOnlineProduct: (id: number) => Promise<void>;
    editOnlineProduct: (id: number, onlineProduct: AddingOnlineProduct) => Promise<void>;

    // For Offers
    getOffersData: () => Promise<void>;
    getOfferData: (id: number) => Promise<void>;
    addOffer: (offer: AddingOffer) => Promise<void>;
    deleteOffer: (id: number) => Promise<void>;
    editOffer: (id: number, offer: AddingOffer) => Promise<void>;

    // For OnlineOffers
    getOnlineOffersData: () => Promise<void>;
    getOnlineOfferData: (id: number) => Promise<void>;
    addOnlineOffer: (onlineOffer: AddingOnlineOffer) => Promise<void>;
    deleteOnlineOffer: (id: number) => Promise<void>;
    editOnlineOffer: (id: number, onlineOffer: AddingOnlineOffer) => Promise<void>;

    // For BaseOffers
    getBaseOffersData: () => Promise<void>;
    getBaseOfferData: (id: number) => Promise<void>;
    addBaseOffer: (baseOffer: AddingBaseOffer) => Promise<void>;
    deleteBaseOffer: (id: number) => Promise<void>;
    editBaseOffer: (id: number, baseOffer: AddingBaseOffer) => Promise<void>;

    // For OnlineCustomers
    getOnlineCustomersData: () => Promise<void>;
    getOnlineCustomerData: (id: number) => Promise<void>;
    addOnlineCustomer: (onlineCustomer: AddingOnlineCustomer) => Promise<void>;
    deleteOnlineCustomer: (id: number) => Promise<void>;
    editOnlineCustomer: (id: number, onlineCustomer: AddingOnlineCustomer) => Promise<void>;
}
//gettig the token from Auth Store 
export const useCommercialStore = create<DataStore>()(
    persist(
        (set, get) => ({
            //Malls
            dataMalls: undefined,
            mallD: null,
            loading: false,
            error: null,
            // Get Orders Data
            getMallsData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiMall.get(``);
                    const dataMalls = res.data
                    set({ dataMalls, loading: false });
                    return dataMalls
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Malls',
                        loading: false,
                    });
                }
            },
            // get One order Data  👈
            getMallData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiMall.get(`/${id}`);
                    const mallD = res.data
                    set({ mallD, loading: false });
                    return mallD
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Mall',
                        loading: false,
                    });
                }
            },
            deleteMall: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiMall.delete(`/${id}`);
                    set((state) => ({
                        dataMalls: state.dataMalls?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Deleting Mall',
                        loading: false,
                    });
                }
            },
            //Editing order
            editMall: async (id: number, mall: AddingMall) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiMall.patch(`/${id}`, mall);
                    if (res.status != 201) { }

                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Mall',
                        loading: false,
                    });
                }
            },
            //Adding New order
            addMall: async (mall: AddingMall) => {
                set({ loading: true, error: null });
                try {
                    if (mall !== null) {
                        //   const { authData } = useAuthStore.getState(); // ✅ dynamically get latest auth data
                        //    property.customerId = authData?.id || 0;
                        const res = await apiMall.post(``, mall);
                        set({ loading: false });
                        if (res.status == 201) {

                        }
                    }
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Mall',
                        loading: false,
                    });
                }
            },



            //Orders
            dataOrders: undefined,
            orderD: null,
            // Get Orders Data
            getOrdersData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiOrder.get(``);
                    const dataOrders = res.data
                    set({ dataOrders, loading: false });
                    return dataOrders
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Properties',
                        loading: false,
                    });
                }
            },
            // get One order Data  👈
            getOrderData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiOrder.get(`/${id}`);
                    const orderD = res.data
                    set({ orderD, loading: false });
                    return orderD
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Properties',
                        loading: false,
                    });
                }
            },
            deleteOrder: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiOrder.delete(`/${id}`);
                    set((state) => ({
                        dataOrders: state.dataOrders?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Deleting Area',
                        loading: false,
                    });
                }
            },
            //Editing order
            editOrder: async (id: number, order: AddingOrder) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiOrder.patch(`/${id}`, order);
                    if (res.status != 201) { }

                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || 'Error Loading Materials',
                        loading: false,
                    });
                }
            },
            //Adding New order
            addOrder: async (order: AddingOrder) => {
                set({ loading: true, error: null });
                try {
                    if (order !== null) {
                        //   const { authData } = useAuthStore.getState(); // ✅ dynamically get latest auth data
                        //    property.customerId = authData?.id || 0;
                        const res = await apiOrder.post(``, order);
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



            //OnlineOrders
            dataOnlineOrders: undefined,
            onlineOrderD: null,

            getOnlineOrdersData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiOnlineOrder.get(``);
                    const dataOnlineOrders = res.data;
                    set({ dataOnlineOrders, loading: false });
                    return dataOnlineOrders;
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Loading OnlineOrders', loading: false });
                }
            },

            getOnlineOrderData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiOnlineOrder.get(`/${id}`);
                    const onlineOrderD = res.data;
                    set({ onlineOrderD, loading: false });
                    return onlineOrderD;
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Loading OnlineOrder', loading: false });
                }
            },

            deleteOnlineOrder: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiOnlineOrder.delete(`/${id}`);
                    set((state) => ({
                        dataOnlineOrders: state.dataOnlineOrders?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Deleting OnlineOrder', loading: false });
                }
            },

            editOnlineOrder: async (id: number, onlineOrder: AddingOnlineOrder) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiOnlineOrder.patch(`/${id}`, onlineOrder);
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Editing OnlineOrder', loading: false });
                }
            },

            addOnlineOrder: async (onlineOrder: AddingOnlineOrder) => {
                set({ loading: true, error: null });
                try {
                    if (onlineOrder !== null) {
                        const res = await apiOnlineOrder.post(``, onlineOrder);
                        set({ loading: false });
                    }
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Adding OnlineOrder', loading: false });
                }
            },



            //Products
            dataProducts: undefined,
            productD: null,

            getProductsData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiProduct.get(``);
                    const dataProducts = res.data;
                    set({ dataProducts, loading: false });
                    return dataProducts;
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Loading Products', loading: false });
                }
            },

            getProductData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiProduct.get(`/${id}`);
                    const productD = res.data;
                    set({ productD, loading: false });
                    return productD;
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Loading Product', loading: false });
                }
            },

            deleteProduct: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiProduct.delete(`/${id}`);
                    set((state) => ({
                        dataProducts: state.dataProducts?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Deleting Product', loading: false });
                }
            },

            editProduct: async (id: number, product: AddingProduct) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiProduct.patch(`/${id}`, product);
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Editing Product', loading: false });
                }
            },

            addProduct: async (product: AddingProduct) => {
                set({ loading: true, error: null });
                try {
                    if (product !== null) {
                        const res = await apiProduct.post(``, product);
                        set({ loading: false });
                    }
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Adding Product', loading: false });
                }
            },

            //OnlineProducts
            dataOnlineProducts: undefined,
            onlineProductD: null,

            getOnlineProductsData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiOnlineProduct.get(``);
                    const dataOnlineProducts = res.data;
                    set({ dataOnlineProducts, loading: false });
                    return dataOnlineProducts;
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Loading OnlineProducts', loading: false });
                }
            },

            getOnlineProductData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiOnlineProduct.get(`/${id}`);
                    const onlineProductD = res.data;
                    set({ onlineProductD, loading: false });
                    return onlineProductD;
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Loading OnlineProduct', loading: false });
                }
            },

            deleteOnlineProduct: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiOnlineProduct.delete(`/${id}`);
                    set((state) => ({
                        dataOnlineProducts: state.dataOnlineProducts?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Deleting OnlineProduct', loading: false });
                }
            },

            editOnlineProduct: async (id: number, onlineProduct: AddingOnlineProduct) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiOnlineProduct.patch(`/${id}`, onlineProduct);
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Editing OnlineProduct', loading: false });
                }
            },

            addOnlineProduct: async (onlineProduct: AddingOnlineProduct) => {
                set({ loading: true, error: null });
                try {
                    if (onlineProduct !== null) {
                        const res = await apiOnlineProduct.post(``, onlineProduct);
                        set({ loading: false });
                    }
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Adding OnlineProduct', loading: false });
                }
            },



            // Offers
            dataOffers: undefined,
            offerD: null,
            getOffersData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiOffer.get(``);
                    const dataOffers = res.data;
                    set({ dataOffers, loading: false });
                    return dataOffers;
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Loading Offers', loading: false });
                }
            },

            getOfferData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiOffer.get(`/${id}`);
                    const offerD = res.data;
                    set({ offerD, loading: false });
                    return offerD;
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Loading Offer', loading: false });
                }
            },

            deleteOffer: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiOffer.delete(`/${id}`);
                    set((state) => ({
                        dataOffers: state.dataOffers?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Deleting Offer', loading: false });
                }
            },

            editOffer: async (id: number, offer: AddingOffer) => {
                set({ loading: true, error: null });
                try {
                    await apiOffer.patch(`/${id}`, offer);
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Editing Offer', loading: false });
                }
            },

            addOffer: async (offer: AddingOffer) => {
                set({ loading: true, error: null });
                try {
                    if (offer !== null) {
                        await apiOffer.post(``, offer);
                        set({ loading: false });
                    }
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Adding Offer', loading: false });
                }
            },

            // OnlineOffers
            dataOnlineOffers: undefined,
            onlineOfferD: null,

            getOnlineOffersData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiOnlineOffer.get(``);
                    const dataOnlineOffers = res.data;
                    set({ dataOnlineOffers, loading: false });
                    return dataOnlineOffers;
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Loading OnlineOffers', loading: false });
                }
            },

            getOnlineOfferData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiOnlineOffer.get(`/${id}`);
                    const onlineOfferD = res.data;
                    set({ onlineOfferD, loading: false });
                    return onlineOfferD;
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Loading OnlineOffer', loading: false });
                }
            },

            deleteOnlineOffer: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiOnlineOffer.delete(`/${id}`);
                    set((state) => ({
                        dataOnlineOffers: state.dataOnlineOffers?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Deleting OnlineOffer', loading: false });
                }
            },

            editOnlineOffer: async (id: number, onlineOffer: AddingOnlineOffer) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiOnlineOffer.patch(`/${id}`, onlineOffer);
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Editing OnlineOffer', loading: false });
                }
            },

            addOnlineOffer: async (onlineOffer: AddingOnlineOffer) => {
                set({ loading: true, error: null });
                try {
                    if (onlineOffer !== null) {
                        const res = await apiOnlineOffer.post(``, onlineOffer);
                        set({ loading: false });
                    }
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Adding OnlineOffer', loading: false });
                }
            },



            // BaseOffers
            dataBaseOffers: undefined,
            baseOfferD: null,
            getBaseOffersData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiBaseOffer.get(``);
                    const dataBaseOffers = res.data;
                    set({ dataBaseOffers, loading: false });
                    return dataBaseOffers;
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Loading BaseOffers', loading: false });
                }
            },

            getBaseOfferData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiBaseOffer.get(`/${id}`);
                    const baseOfferD = res.data;
                    set({ baseOfferD, loading: false });
                    return baseOfferD;
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Loading BaseOffer', loading: false });
                }
            },

            deleteBaseOffer: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiBaseOffer.delete(`/${id}`);
                    set((state) => ({
                        dataBaseOffers: state.dataBaseOffers?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Deleting BaseOffer', loading: false });
                }
            },

            editBaseOffer: async (id: number, baseOffer: AddingBaseOffer) => {
                set({ loading: true, error: null });
                try {
                    await apiBaseOffer.patch(`/${id}`, baseOffer);
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Editing BaseOffer', loading: false });
                }
            },

            addBaseOffer: async (baseOffer: AddingBaseOffer) => {
                set({ loading: true, error: null });
                try {
                    if (baseOffer !== null) {
                        await apiBaseOffer.post(``, baseOffer);
                        set({ loading: false });
                    }
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Adding BaseOffer', loading: false });
                }
            },



            // OnlineCustomers
            dataOnlineCustomers: undefined,
            onlineCustomerD: null,
            getOnlineCustomersData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiOnlineCustomer.get(``);
                    const dataOnlineCustomers = res.data;
                    set({ dataOnlineCustomers, loading: false });
                    return dataOnlineCustomers;
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Loading OnlineCustomers', loading: false });
                }
            },

            getOnlineCustomerData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiOnlineCustomer.get(`/${id}`);
                    const onlineCustomerD = res.data;
                    set({ onlineCustomerD, loading: false });
                    return onlineCustomerD;
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Loading OnlineCustomer', loading: false });
                }
            },

            deleteOnlineCustomer: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiOnlineCustomer.delete(`/${id}`);
                    set((state) => ({
                        dataOnlineCustomers: state.dataOnlineCustomers?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Deleting OnlineCustomer', loading: false });
                }
            },

            editOnlineCustomer: async (id: number, onlineCustomer: AddingOnlineCustomer) => {
                set({ loading: true, error: null });
                try {
                    await apiOnlineCustomer.patch(`/${id}`, onlineCustomer);
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Editing OnlineCustomer', loading: false });
                }
            },

            addOnlineCustomer: async (onlineCustomer: AddingOnlineCustomer) => {
                set({ loading: true, error: null });
                try {
                    if (onlineCustomer !== null) {
                        await apiOnlineCustomer.post(``, onlineCustomer);
                        set({ loading: false });
                    }
                } catch (err: any) {
                    set({ error: err.response?.data?.message || 'Error Adding OnlineCustomer', loading: false });
                }
            },

        }),

        {
            name: 'users-data-storage',
            storage: createJSONStorage(() => localStorage),
            //partialize: (state) => ({ data: state.dataOrders })
        }
    )
);
