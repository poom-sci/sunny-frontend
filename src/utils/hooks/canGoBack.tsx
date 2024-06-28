import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

const useCanGoBack = () => {
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (window.history && window.history.length > 1) {
      setCanGoBack(true);
    }
    setIsLoading(false);
  }, [router]);

  return { canGoBack, isLoading };
};

export default useCanGoBack;
