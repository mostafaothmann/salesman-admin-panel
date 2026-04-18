import { useEffect } from "react";
import { socket } from "../socket/socket";
import { useNotificationStore } from "../stores/notificationStore/notification.store";
import { noDeprecation } from "process";

export default function NotificationProvider({ children }) {
    const { addNotification } = useNotificationStore()
    const connect = async () => {
        await socket.on("connect", () => {
            console.log("Connected:", socket.id);

        })
    }
    const joinAdmin = async () => {
        await socket.emit("join_admin");
        console.log("admin Joined")
    }

    const handleConnectionAndAdmin = async () => {
        await connect();
        await joinAdmin();
    }
    useEffect(() => {

        handleConnectionAndAdmin();
        socket.on("notification", (data) => {
            console.log("🔥 Notification:", data.title);
            addNotification({ title: data?.title, message: data?.message })
        });
        return () => {
            socket.off("connect");
            socket.off("notification");
        };
    }, []);

    return children;
}