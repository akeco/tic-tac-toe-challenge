import { renderHook } from '@testing-library/react';
import { useGetGameStatus } from '@/components/playground/hooks/useGetGameStatus';
import { MatrixType } from '@/types';

describe('useGetGameStatus', () => {
  const emptyMatrix: MatrixType[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const drawMatrix: string[][] = [
    ['X', 'O', 'X'],
    ['O', 'X', 'O'],
    ['O', 'X', 'O'],
  ];
  const winXMatrix: (string | null)[][] = [
    ['X', 'O', null],
    ['X', 'O', null],
    ['X', null, 'O'],
  ];
  const winOMatrix: (string | null)[][] = [
    ['X', 'O', null],
    ['X', 'O', null],
    [null, 'O', 'X'],
  ];

  it('should return default values when initialized', () => {
    const { result } = renderHook(() => useGetGameStatus(emptyMatrix));
    expect(result.current.isEnded).toBe(false);
    expect(result.current.winPlayer).toBeUndefined();
  });

  it('should detect a draw game correctly', () => {
    const { result } = renderHook(() => useGetGameStatus(drawMatrix as MatrixType[][]));
    expect(result.current.isEnded).toBe(true);
    expect(result.current.winPlayer).toBeUndefined();
  });

  it('should detect a win by X correctly', () => {
    const { result } = renderHook(() => useGetGameStatus(winXMatrix as MatrixType[][]));
    expect(result.current.isEnded).toBe(true);
    expect(result.current.winPlayer).toBe('X');
  });

  it('should detect a win by O correctly', () => {
    const { result } = renderHook(() => useGetGameStatus(winOMatrix as MatrixType[][]));
    expect(result.current.isEnded).toBe(true);
    expect(result.current.winPlayer).toBe('O');
  });

  it('should reset the game state correctly', () => {
    const { result, rerender } = renderHook(() => useGetGameStatus(winXMatrix as MatrixType[][]));
    expect(result.current.isEnded).toBe(true);
    expect(result.current.winPlayer).toBe('X');
    expect(result.current.reset).toBeDefined();

    result.current.reset();
    rerender();

    expect(result.current.isEnded).toBe(false);
    expect(result.current.winPlayer).toBeUndefined();
  });
});
