import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { PlayOption } from '@/types';

const TIMEOUT = 1500;

export type UseGetDefaultPlayerReturnType = {
  isLoading: boolean;
  playerVariant: PlayOption | null;
  setPlayerVariant: Dispatch<SetStateAction<PlayOption | null>>;
};

export const useGetDefaultPlayer = (): UseGetDefaultPlayerReturnType => {
  const [playerVariant, setPlayerVariant] = useState<PlayOption | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setPlayerVariant(Math.floor(Math.random() * (1 - 0 + 1) + 0) ? PlayOption.X : PlayOption.O);
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, TIMEOUT);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useMemo(() => ({ isLoading, playerVariant, setPlayerVariant }), [isLoading, playerVariant]);
};
