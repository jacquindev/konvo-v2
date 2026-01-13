import { useEffect, useState } from "react";

export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const setIsMounted = () => {
      setMounted(true);
    };
    setIsMounted();
  }, []);

  return { mounted };
}
