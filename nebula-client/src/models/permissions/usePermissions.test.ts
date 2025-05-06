import { renderHook } from '@testing-library/react';
import { usePermissions } from './usePermissions';

describe('usePermissions', () => {
  afterEach(() => {
    // Clean up window mock
    delete (window as any).NebulaShell;
  });

  it('should return isReadonly: true when window.NebulaShell is falsy', () => {
    delete (window as any).NebulaShell;

    const { result } = renderHook(() => usePermissions());
    expect(result.current.isReadonly).toBe(true);
  });

  it('should return isReadonly: false when window.NebulaShell is truthy', () => {
    (window as any).NebulaShell = {};

    const { result } = renderHook(() => usePermissions());
    expect(result.current.isReadonly).toBe(false);
  });
});
