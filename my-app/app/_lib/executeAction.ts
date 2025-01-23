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
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "An unexpected error occurred.");
    }
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: (error as Error).message || "An unexpected error occurred.",
    };
  }
};

export { executeAction };
