import { notification } from 'antd';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Notification = {
    id: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: number;
};



type AddingNotification = {
    title: string;
    message: string;
};

type NotificationStore = {
    notifications: Notification[];
    addNotification: (notification: AddingNotification) => void;
    deleteNotification: (id: string) => void;
    markAsRead: (id: string) => void;
    clearAll: () => void;
};

export const useNotificationStore = create<NotificationStore>()(
    persist(
        (set) => ({
            notifications: [],

            addNotification: (notification) =>
                set((state) => ({
                    notifications: [
                        {
                            
                            id: crypto.randomUUID(),
                            title: notification.title,
                            message: notification.message,
                            read: false,
                            createdAt: Date.now(),
                        },
                        ...state.notifications,
                    ],
                })),

            deleteNotification: (id) =>
                set((state) => ({
                    notifications: state.notifications.filter(
                        (n) => n.id !== id
                    ),
                })),

            markAsRead: (id) =>
                set((state) => ({
                    notifications: state.notifications.map((n) =>
                        n.id === id ? { ...n, read: true } : n
                    ),
                })),

            clearAll: () => set({ notifications: [] }),
        }),
        {
            name: 'notification-storage', // key in localStorage
        }
    )
);