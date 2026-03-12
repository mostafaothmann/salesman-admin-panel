import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import {
    apiVideoLink,
    apiSalesmanMessage,
    apiGiftVisit,
    apiBaseGift
} from '../apis';
import {
    SalesmanMessage,
    AddingBaseGift,
    GiftVisit,
    BaseGift,
    AddingGiftVisit,
    AddingSalesmanMessage,
    AddingVideoLink,
    VideoLink,
    FilterGiftVisitProps,
    FitlerSalesmanMessageProps
} from '../other-store-interfaces';
import { Type } from '../types-store-interfaces';



interface DataStore {

    dataBaseGifts: BaseGift[] | undefined;
    baseGiftD: BaseGift,

    dataGiftsVisits: GiftVisit[] | undefined;
    giftVisitD: GiftVisit,
    filteredDataGiftsVisits: GiftVisit[],

    dataSalesmansMessages: SalesmanMessage[] | undefined;
    salesmanMessageD: SalesmanMessage,
    filteredDataSalesmansMessages: SalesmanMessage[],

    dataVideosLinks: VideoLink[] | undefined;
    videoLinkD: VideoLink,

    loading: boolean;
    error: string | null;
    total: number,
    filter_total: number,
    lastPage: number,
    // BaseGift
    getBaseGiftsData: () => Promise<void>;
    getBaseGiftData: (id: number) => Promise<void>;
    addBaseGift: (baseGift: AddingBaseGift) => Promise<void>;
    deleteBaseGift: (id: number) => Promise<void>;
    editBaseGift: (id: number, baseGift: AddingBaseGift) => Promise<void>;


    // GiftVisit
    getGiftVisitsData: (page: number, limit: number) => Promise<void>;
    getGiftVisitData: (id: number) => Promise<void>;
    addGiftVisit: (giftVisit: AddingGiftVisit) => Promise<void>;
    deleteGiftVisit: (id: number) => Promise<void>;
    editGiftVisit: (id: number, giftVisit: AddingGiftVisit) => Promise<void>;
    getFilteredDataGiftVisits: (filters: FilterGiftVisitProps) => Promise<void>;


    // SalesmanMessage
    getSalesmanMessagesData: (page: number, limit: number) => Promise<void>;
    getSalesmanMessageData: (id: number) => Promise<void>;
    addSalesmanMessage: (salesmanMessage: AddingSalesmanMessage) => Promise<void>;
    deleteSalesmanMessage: (id: number) => Promise<void>;
    editSalesmanMessage: (id: number, salesmanMessage: AddingSalesmanMessage) => Promise<void>;
    getFilteredDataSalesmanMessages: (filters: FitlerSalesmanMessageProps) => Promise<void>;


    // VideoLink
    getVideosLinksData: () => Promise<void>;
    getVideoLinkData: (id: number) => Promise<void>;
    addVideoLink: (videoLink: AddingVideoLink) => Promise<void>;
    deleteVideoLink: (id: number) => Promise<void>;
    editVideoLink: (id: number, videoLink: AddingVideoLink) => Promise<void>;

}
//gettig the token from Auth Store 
export const useOtherStore = create<DataStore>()(
    persist(
        (set, get) => ({


            loading: false,
            error: null,
            total: 0,
            filter_total: 0,
            lastPage: 1,

            // BaseGifts
            dataBaseGifts: undefined,
            baseGiftD: null,
            getBaseGiftsData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiBaseGift.get(``);
                    const dataBaseGifts = res.data;

                    set({ dataBaseGifts, loading: false });
                    return dataBaseGifts;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading BaseGifts",
                        loading: false,
                    });
                }
            },

            getBaseGiftData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiBaseGift.get(`/${id}`);
                    const baseGiftD = res.data;

                    set({ baseGiftD, loading: false });
                    return baseGiftD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading BaseGift",
                        loading: false,
                    });
                }
            },

            deleteBaseGift: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiBaseGift.delete(`/${id}`);
                    set((state) => ({
                        dataBaseGifts: state.dataBaseGifts?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Deleting BaseGift",
                        loading: false,
                    });
                }
            },

            editBaseGift: async (id: number, baseGift: AddingBaseGift) => {
                set({ loading: true, error: null });
                try {
                    await apiBaseGift.patch(`/${id}`, baseGift);
                    set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Editing BaseGift",
                        loading: false,
                    });
                }
            },

            addBaseGift: async (baseGift: AddingBaseGift) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiBaseGift.post(``, baseGift);
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding BaseGift",
                        loading: false,
                    });
                }
            },





            // GiftVisits
            dataGiftsVisits: undefined,
            giftVisitD: null,
            filteredDataGiftsVisits: undefined,
            getGiftVisitsData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiGiftVisit.get(`/gift-visits`, { params: { page, limit } });
                    const dataGiftsVisits = res.data.data;
                    const total = res.data.total;
                    const lastPage = res.data.lastPage;

                    set({ dataGiftsVisits, loading: false, total, lastPage });
                    return dataGiftsVisits;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading GiftsVisits",
                        loading: false,
                    });
                }
            },

            getGiftVisitData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiGiftVisit.get(`/${id}`);
                    const giftVisitD = res.data;

                    set({ giftVisitD, loading: false });
                    return giftVisitD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading GiftVisit",
                        loading: false,
                    });
                }
            },

            deleteGiftVisit: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiGiftVisit.delete(`/${id}`);
                    set((state) => ({
                        dataGiftsVisits: state.dataGiftsVisits?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Deleting GiftVisit",
                        loading: false,
                    });
                }
            },

            editGiftVisit: async (id: number, giftVisit: AddingGiftVisit) => {
                set({ loading: true, error: null });
                try {
                    await apiGiftVisit.patch(`/${id}`, giftVisit);
                    set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Editing GiftVisit",
                        loading: false,
                    });
                }
            },

            addGiftVisit: async (giftVisit: AddingGiftVisit) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiGiftVisit.post(``, giftVisit);
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding GiftVisit",
                        loading: false,
                    });
                }
            },

            getFilteredDataGiftVisits: async (filters: FilterGiftVisitProps) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiGiftVisit.post(`/filter`, filters);

                    if (res.status === 201) {
                        const filteredDataGiftsVisits = res.data.data;
                        const filter_total = res.data.total;

                        set({ filteredDataGiftsVisits, loading: false, filter_total });
                        return filteredDataGiftsVisits;
                    }
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Filtering GiftVisits",
                        loading: false,
                    });
                }
            },




            // SalesmanMessages
            dataSalesmansMessages: undefined,
            salesmanMessageD: null,
            filteredDataSalesmansMessages: undefined,
            getSalesmanMessagesData: async (page: number, limit: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSalesmanMessage.get(``, { params: { page, limit } });
                    const dataSalesmansMessages = res.data.data;
                    const total = res.data.total;
                    const lastPage = res.data.lastPage;

                    set({ dataSalesmansMessages, loading: false, total, lastPage });
                    return dataSalesmansMessages;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading SalesmanMessages",
                        loading: false,
                    });
                }
            },

            getSalesmanMessageData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSalesmanMessage.get(`/${id}`);
                    const salesmanMessageD = res.data;

                    set({ salesmanMessageD, loading: false });
                    return salesmanMessageD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading SalesmanMessage",
                        loading: false,
                    });
                }
            },

            deleteSalesmanMessage: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiSalesmanMessage.delete(`/${id}`);
                    set((state) => ({
                        dataSalesmansMessages: state.dataSalesmansMessages?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Deleting SalesmanMessage",
                        loading: false,
                    });
                }
            },

            editSalesmanMessage: async (id: number, salesmanMessage: AddingSalesmanMessage) => {
                set({ loading: true, error: null });
                try {
                    await apiSalesmanMessage.patch(`/${id}`, salesmanMessage);
                    set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Editing SalesmanMessage",
                        loading: false,
                    });
                }
            },

            addSalesmanMessage: async (salesmanMessage: AddingSalesmanMessage) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSalesmanMessage.post(``, salesmanMessage);
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding SalesmanMessage",
                        loading: false,
                    });
                }
            },

            getFilteredDataSalesmanMessages: async (filters: FitlerSalesmanMessageProps) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiSalesmanMessage.post(`/filter`, filters);
                    if (res.status === 201) {
                        const filteredDataSalesmansMessages = res.data.data;
                        const filter_total = res.data.total;

                        set({ filteredDataSalesmansMessages, loading: false, filter_total });
                        return filteredDataSalesmansMessages;
                    }
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Filtering SalesmanMessages",
                        loading: false,
                    });
                }
            },




            // VideoLinks
            dataVideosLinks: undefined,
            videoLinkD: null,
            getVideosLinksData: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await apiVideoLink.get(``);
                    const dataVideosLinks = res.data;
                    set({ dataVideosLinks, loading: false, });
                    return dataVideosLinks;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading VideosLinks",
                        loading: false,
                    });
                }
            },

            getVideoLinkData: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiVideoLink.get(`/${id}`);
                    const videoLinkD = res.data;

                    set({ videoLinkD, loading: false });
                    return videoLinkD;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Loading VideoLink",
                        loading: false,
                    });
                }
            },

            deleteVideoLink: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await apiVideoLink.delete(`/${id}`);
                    set((state) => ({
                        dataVideosLinks: state.dataVideosLinks?.filter((a) => a.id !== id),
                        loading: false,
                    }));
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Deleting VideoLink",
                        loading: false,
                    });
                }
            },

            editVideoLink: async (id: number, videoLink: AddingVideoLink) => {
                set({ loading: true, error: null });
                try {
                    await apiVideoLink.patch(`/${id}`, videoLink);
                    set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Editing VideoLink",
                        loading: false,
                    });
                }
            },

            addVideoLink: async (videoLink: AddingVideoLink) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiVideoLink.post(``, videoLink);
                    if (res.status === 201) set({ loading: false });
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Error Adding VideoLink",
                        loading: false,
                    });
                }
            },

        }),

        {
            name: 'other-data-storage',
            storage: createJSONStorage(() => localStorage),
            //partialize: (state) => ({ data: state.dataSpecializations })
        }
    )
);
