import { describe, expect, rstest, test } from '@rstest/core';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useEventChat } from '../src';

describe('useEventChat 通信', () => {
  test('回调处理应该触发回调函数 - 无 schema', async () => {
    const mockCallback = rstest.fn();
    renderHook(() =>
      useEventChat('sub-mox', {
        callback: mockCallback,
      })
    );

    const { result } = renderHook(() => useEventChat('pub-mox'));
    act(() => {
      result.current.emit({
        detail: { message: 'test' },
        name: 'sub-mox',
      });
    });

    // 等待订阅者的 useEffect 执行完成（事件总线订阅生效）
    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { message: 'test' },
          name: 'sub-mox',
        })
      );
    });
  });
});
