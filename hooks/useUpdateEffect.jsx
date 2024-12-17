import { useEffect, useRef } from "react";

const useUpdateEffect = (effect, dependencies = []) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    return effect();
  }, dependencies);
};

export default useUpdateEffect;
