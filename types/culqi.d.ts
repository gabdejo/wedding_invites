export {};

declare global {
  interface Window {
    Culqi: {
      publicKey: string;
      settings: (settings: { title: string; currency: string; amount: number }) => void;
      options: (options: {
        lang?: string;
        installments?: boolean;
        paymentMethods?: Record<string, boolean>;
      }) => void;
      open: () => void;
      close: () => void;
      token?: { id: string; email: string } | null;
      order?: unknown;
      error?: { user_message: string } | null;
    };
    culqi: () => void;
  }
}
