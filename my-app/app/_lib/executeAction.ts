import { isRedirectError } from "next/dist/client/components/redirect-error";

type Options<T> = {
  actionFn: () => Promise<T>;
  successMessage?: string;
};

const executeAction = async <T>({
  actionFn,
  successMessage = "The actions was successful",
}: Options<T>): Promise<{ success: boolean; message: string }> => {
  try {
    await actionFn();

    return {
      success: true,
      message: successMessage,
    };
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};

export { executeAction };
