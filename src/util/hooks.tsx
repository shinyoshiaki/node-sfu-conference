import { useEffect } from "react";

export function useAsyncEffect(effect: () => void, deps: any[]) {
  useEffect(() => {
    (async () => {
      effect();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);
}
