import { renderHook, act } from '@testing-library/react';
import { useGetDefaultPlayer } from './useGetDefaultPlayer';
import { PlayOption } from '@/types';

describe('useGetDefaultPlayer', () => {
  it('should set playerVariant to X or O', () => {
    const { result } = renderHook(() => useGetDefaultPlayer());

    expect(result.current.playerVariant).toBeDefined();
    expect([PlayOption.X, PlayOption.O]).toContain(result.current.playerVariant);
  });

  it('should set isLoading to true initially', () => {
    const { result } = renderHook(() => useGetDefaultPlayer());

    expect(result.current.isLoading).toBe(true);
  });

  it('should update playerVariant with setPlayerVariant', () => {
    const { result } = renderHook(() => useGetDefaultPlayer());

    act(() => {
      result.current.setPlayerVariant(PlayOption.O);
    });

    expect(result.current.playerVariant).toBe(PlayOption.O);
  });
});
