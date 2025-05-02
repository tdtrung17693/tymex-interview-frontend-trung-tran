import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useMemoizeFunction } from "./useMemoizeFunction";

describe("useMemoizeFunction", () => {
  it("should return the same function instance if the input function identity does not change", () => {
    const fn = vi.fn(() => {});
    const { result, rerender } = renderHook(({ fn }) => useMemoizeFunction(fn), {
      initialProps: { fn },
    });

    const firstResult = result.current;
    rerender({ fn });
    const secondResult = result.current;

    expect(firstResult).toBe(secondResult);
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it("should execute the latest provided function when input identity changes", () => {
    const fn1 = vi.fn(() => "result1");
    const fn2 = vi.fn(() => "result2");
    const { result, rerender } = renderHook(({ fn }) => useMemoizeFunction(fn), {
      initialProps: { fn: fn1 },
    });

    const firstMemoizedFn = result.current;
    expect(firstMemoizedFn()).toBe("result1");
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(0);

    rerender({ fn: fn2 });
    const secondMemoizedFn = result.current;

    expect(secondMemoizedFn).toBe(firstMemoizedFn);

    expect(secondMemoizedFn()).toBe("result2");
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
  });

  it("should not suffer from stale closure when the function identity is stable", () => {
    let valueFromScope = 10;

    const stableFn = vi.fn(() => valueFromScope);

    const { result, rerender } = renderHook(
      ({ func }) => useMemoizeFunction(func),
      { initialProps: { func: stableFn } }
    );

    const firstMemoizedFn = result.current;
    
    expect(firstMemoizedFn()).toBe(10);
    expect(stableFn).toHaveBeenCalledTimes(1);

    valueFromScope = 20;

    rerender({ func: stableFn });

    const secondMemoizedFn = result.current;
    expect(secondMemoizedFn).toBe(firstMemoizedFn);

    expect(secondMemoizedFn()).toBe(20);
    expect(stableFn).toHaveBeenCalledTimes(2);
  });
});
