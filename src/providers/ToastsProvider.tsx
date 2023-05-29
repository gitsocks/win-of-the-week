import { useToast } from "@chakra-ui/react";
import { useKnockFeed } from "@knocklabs/react-notification-feed";
import { PropsWithChildren, useEffect } from "react";

export const ToastsProvider = ({ children }: PropsWithChildren) => {
    const { feedClient } = useKnockFeed();
    const toast = useToast();

    const onNotificationsReceived = async ({ items }: any) => {
        items.forEach((item: any) => {
            console.log(item);
            const key = item.source.key;
            switch (key) {
                case 'create-team':
                    toast({
                        title: 'New Team Created',
                        description: item.blocks[0].rendered.replace('<p>', '').replace('</p>', ''),
                        position: 'bottom-left'
                    });
                    break;

                default:
                    break;
            }
        });

        await feedClient.markAsSeen(items);
    };

    useEffect(() => {
        feedClient.on("items.received.realtime", onNotificationsReceived);

        return () => feedClient.off("items.received.realtime", onNotificationsReceived);
    }, [feedClient]);

    return <>{children}</>;
};