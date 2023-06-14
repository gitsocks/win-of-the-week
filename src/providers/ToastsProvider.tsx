import { useToast } from "@chakra-ui/react";
import { useNotifications, useSocket } from "@novu/notification-center";
import { PropsWithChildren, useEffect } from "react";

export const ToastsProvider = ({ children }: PropsWithChildren) => {
    const { socket } = useSocket();
    const toast = useToast();
    const { notifications, isFetching, refetch, markNotificationAsSeen } = useNotifications();

    useEffect(() => {
        if (!isFetching && notifications) {
            notifications.forEach((message) => {
                if (!message.seen) {
                    toast({
                        description: message.content as string,
                        position: 'bottom-left'
                    });
                    markNotificationAsSeen(message._id);
                }
            });
        }
    }, [notifications, isFetching]);

    useEffect(() => {
        if (socket) {
            socket.on('unseen_count_changed', (data) => {
                if (!isFetching) {
                    refetch();
                }
            });
        }
        return () => {
            if (socket) {
                socket.off('unseen_count_changed');
            }
        };
    }, [socket, refetch, isFetching]);

    return <>{children}</>;
};