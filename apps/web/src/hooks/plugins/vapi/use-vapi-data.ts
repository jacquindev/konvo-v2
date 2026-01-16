import { useState, useEffect } from "react";
import { useAction } from "convex/react";
import { ConvexError } from "convex/values";
import { toast } from "sonner";

import { api } from "@repo/backend/_generated/api";

type PhoneNumbers = typeof api.private.vapi.getPhoneNumbers._returnType;
type Assistants = typeof api.private.vapi.getAssistants._returnType;

export function useVapiPhoneNumbers(): {
  data: PhoneNumbers;
  isLoading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<PhoneNumbers>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getPhoneNumbers = useAction(api.private.vapi.getPhoneNumbers);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getPhoneNumbers();
        if (cancelled) return;
        setData(result);
        setError(null);
      } catch (error) {
        if (error instanceof Error || error instanceof ConvexError) {
          if (cancelled) return;
          setError(error);
          toast.error(error.message);
        } else {
          toast.error("Failed to fetch phone numbers from Vapi.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };
    fetchData();

    return () => {
      cancelled = true;
    };
  }, [getPhoneNumbers]);

  return { data, isLoading, error };
}

export function useVapiAssistants(): {
  data: Assistants;
  isLoading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<Assistants>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getAssistants = useAction(api.private.vapi.getAssistants);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getAssistants();
        if (cancelled) return;
        setData(result);
        setError(null);
      } catch (error) {
        if (error instanceof Error || error instanceof ConvexError) {
          if (cancelled) return;
          setError(error);
          toast.error(error.message);
        } else {
          toast.error("Failed to fetch assistants from Vapi.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [getAssistants]);

  return { data, isLoading, error };
}
