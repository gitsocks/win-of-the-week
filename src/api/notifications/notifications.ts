import { Novu } from "@novu/node";

export const useNotifications = () => {
  const novu = new Novu(process.env.NEXT_PUBLIC_NOVU_API_KEY!);

  const newShoutout = (
    recipients: string[],
    issuedByName: string,
    issuedToName: string,
    shoutoutId: string
  ) => {
    novu.trigger("new-shoutout", {
      to: recipients,
      payload: {
        issuedByName: issuedByName,
        issuedToName: issuedToName,
        shoutoutId: shoutoutId,
      },
    });
  };

  const newNomination = (recipients: string[], issuedByName: string) => {
    novu.trigger("new-nomination", {
      to: recipients,
      payload: {
        fullName: issuedByName,
      },
    });
  };

  return {
    newShoutout,
    newNomination,
  };
};
