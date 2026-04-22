import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useLazyLoad() {
  const observer = ref(null);

  onMounted(() => {
    // Create Intersection Observer
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.getAttribute('data-src');

            if (src) {
              console.log(
                `[LazyLoad] Loading image: ${src.substring(0, 50)}...`,
              );
              img.src = src;
              observer.value?.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      },
    );
  });

  onBeforeUnmount(() => {
    if (observer.value) {
      observer.value.disconnect();
    }
  });

  function observe(element: HTMLImageElement) {
    if (observer.value && element) {
      observer.value.observe(element);
    }
  }

  return {
    observe,
  };
}
