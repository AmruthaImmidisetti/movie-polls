// src/hooks/useInfiniteScroll.js
import { useEffect, useRef } from 'react';

/**
 * useInfiniteScroll(callback, hasMore)
 * - callback: function to call when the sentinel enters viewport (e.g., increment page)
 * - hasMore: boolean indicating whether more items are available
 *
 * Returns: ref to attach to the "loader" sentinel element.
 */
export default function useInfiniteScroll(callback, hasMore) {
  const loaderRef = useRef(null);

  useEffect(() => {
    const node = loaderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // when the sentinel becomes visible and more data exists, call the callback
        if (entries[0].isIntersecting && hasMore) {
          callback();
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [callback, hasMore]);

  return loaderRef;
}
