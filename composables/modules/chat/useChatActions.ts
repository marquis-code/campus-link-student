import { useLoader } from "@/composables/core/useLoader";

export const useChatActions = () => {
  const config = useRuntimeConfig();
  const { startLoading, stopLoading } = useLoader();

  const createSupportConversation = async (subject = "Support Chat") => {
    startLoading("Connecting to support...");
    try {
      const response = await $fetch(`${config.public.apiBase}/chat/conversations`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: { isSupport: true, subject },
      });
      return response;
    } finally {
      stopLoading();
    }
  };

  return { createSupportConversation };
};
