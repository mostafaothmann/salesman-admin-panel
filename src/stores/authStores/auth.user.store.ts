import { create } from 'zustand';
import axios from 'axios';
import { persist } from 'zustand/middleware';
import { Assistant } from '../users-store-interfaces';
import { apiAssistant } from '../apis';

export interface UserAuth {
    id: number;
    email: string;
    role: 'ADMIN';
    accessToken: string;
}

interface UserAuthStore {
    user: UserAuth | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;

    assistantD: Assistant,


    loginAdmin: (email: string, password: string) => Promise<void>;
    loginAssistant: (email: string, password: string) => Promise<void>;

    logout: () => void;
    getToken: () => string | null;
    getId: () => number | null;
    getRole: () => string | null;

    getAssistantData: (id: number) => Promise<void>;
}

const apiAuthAdmin = axios.create({
    baseURL: 'http://192.168.1.105:4000/auth/admin',
    headers: { 'Content-Type': 'application/json' },
});

const apiAuthAssistant = axios.create({
    baseURL: 'http://192.168.1.105:4000/auth/assistant',
    headers: { 'Content-Type': 'application/json' },
});

export const useUserAuthStore = create<UserAuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            loading: false,
            error: null,
            isAuthenticated: false,
            assistantD: null,


            loginAdmin: async (email, password) => {
                set({ loading: true, error: null });

                try {
                    const res = await apiAuthAdmin.post('login', {
                        email,
                        password,
                    });

                    const data = res.data;

                    const user: UserAuth = {
                        id: data.id,
                        email: data.email,
                        role: data.role,
                        accessToken: data.accessToken,
                    };

                    set({
                        user,
                        loading: false,
                        isAuthenticated: true,
                    });

                    /* api.defaults.headers.common[
                        'Authorization'
                    ] = `Bearer ${data.accessToken}`; */
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            'User login failed',
                        loading: false,
                        isAuthenticated: false,
                    });
                }
            },

            loginAssistant: async (email, password) => {
                set({ loading: true, error: null });

                try {
                    const res = await apiAuthAssistant.post('login', {
                        email,
                        password,
                    });

                    const data = res.data;

                    const user: UserAuth = {
                        id: data.id,
                        email: data.email,
                        role: data.role,
                        accessToken: data.accessToken,
                    };

                    set({
                        user,
                        loading: false,
                        isAuthenticated: true,
                    });

                    /* api.defaults.headers.common[
                        'Authorization'
                    ] = `Bearer ${data.accessToken}`; */
                } catch (err: any) {
                    set({
                        error:
                            err.response?.data?.message ||
                            'User login failed',
                        loading: false,
                        isAuthenticated: false,
                    });
                }
            },

            logout: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                });
                /* 
                                delete api.defaults.headers.common[
                                    'Authorization'
                                ]; */
            },

            getToken: () => {
                const { user } = get();
                return user?.accessToken || null;
            },

            getId: () => {
                const { user } = get();
                return user?.id || null;
            },

            getRole: () => {
                const { user } = get();
                console.log(user)
                return user?.role || null;
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

        }),
        {
            name: 'auth-user-storage',
        }
    )
);