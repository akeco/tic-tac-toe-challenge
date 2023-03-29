import { useEffect, useMemo, useState } from 'react';
import { MatrixType, PlayOption, CombinationType } from '@/types';

export type UseGetGameStatusReturnType = {
  isEnded: boolean;
  winPlayer: PlayOption | undefined;
  winCombination: CombinationType[] | undefined;
  reset(): void;
};

const checkForMatch = (matrix: MatrixType[][]): [boolean, PlayOption | undefined, CombinationType[] | undefined] => {
  // Check horizontal matches
  for (let i = 0; i < 3; i++) {
    if (!!matrix[i][0] && matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2]) {
      return [
        true,
        matrix[i][0] as PlayOption,
        [
          { row: i, col: 0 },
          { row: i, col: 1 },
          { row: i, col: 2 },
        ],
      ];
    }
  }

  // Check vertical matches
  for (let i = 0; i < 3; i++) {
    if (!!matrix[0][i] && matrix[0][i] === matrix[1][i] && matrix[1][i] === matrix[2][i]) {
      return [
        true,
        matrix[0][i] as PlayOption,
        [
          { row: 0, col: i },
          { row: 1, col: i },
          { row: 2, col: i },
        ],
      ];
    }
  }

  // Check diagonal matches
  if (!!matrix[0][0] && matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2]) {
    return [
      true,
      matrix[0][0] as PlayOption,
      [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 },
      ],
    ];
  }

  if (!!matrix[0][2] && matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0]) {
    return [
      true,
      matrix[0][2] as PlayOption,
      [
        { row: 0, col: 2 },
        { row: 1, col: 1 },
        { row: 2, col: 0 },
      ],
    ];
  }

  // Check if the game is over
  let isEnded = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!matrix[i][j]) {
        isEnded = false;
        break;
      }
    }
    if (!isEnded) {
      break;
    }
  }

  return [isEnded, undefined, undefined];
};

export const useGetGameStatus = (matrixData: MatrixType[][]): UseGetGameStatusReturnType => {
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [winPlayer, setWinPlayer] = useState<PlayOption>();
  const [winCombination, setWinCombination] = useState<CombinationType[]>();

  const reset = () => {
    setIsEnded(false);
    setWinPlayer(undefined);
    setWinCombination(undefined);
  };

  useEffect(() => {
    const [isEnded, winPlayer, winCombination] = checkForMatch(matrixData);
    setIsEnded(isEnded);
    setWinPlayer(winPlayer);
    setWinCombination(winCombination);
  }, [matrixData]);

  return useMemo(() => ({ isEnded, winPlayer, winCombination, reset }), [isEnded, winPlayer, winCombination]);
};
