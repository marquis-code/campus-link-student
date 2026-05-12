import { useLoader } from "@/composables/core/useLoader";

export const useGuestChat = () => {
  const config = useRuntimeConfig();
  const { startLoading, stopLoading } = useLoader();

  const initiateGuestChat = async (guestInfo: any) => {
    startLoading("Starting chat session...");
    try {
      const response = await $fetch(`${config.public.apiBase}/chat/support/guest`, {
        method: "POST",
        body: {
          guestInfo,
          isSupport: true,
          subject: `Guest: ${guestInfo.name}`,
        },
      });
      return response;
    } finally {
      stopLoading();
    }
  };

  return { initiateGuestChat };
};
