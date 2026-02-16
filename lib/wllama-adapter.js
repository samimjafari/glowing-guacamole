/**
 * Adapter skeleton for Wllama (llama.cpp for browser).
 * Replace mock implementation with real Wllama setup when model assets are available.
 */

export function createOfflineEngine() {
  let modelLoaded = false;

  return {
    async loadModel(file) {
      // Example real integration path (disabled here):
      // const { Wllama } = await import('https://esm.sh/@wllama/wllama');
      // const wllama = new Wllama({
      //   modelUrl: URL.createObjectURL(file),
      //   threads: navigator.hardwareConcurrency || 4,
      // });
      // await wllama.loadModel();
      // modelLoaded = true;

      // Mock load for alpha scaffold:
      await new Promise((resolve) => setTimeout(resolve, 350));
      modelLoaded = true;
    },

    async generate(prompt, settings) {
      if (!modelLoaded) {
        return 'مدل هنوز بارگذاری نشده است. ابتدا فایل GGUF را انتخاب کنید.';
      }
      await new Promise((resolve) => setTimeout(resolve, 150));
      return `پاسخ آفلاین نمونه (Alpha): «${prompt}» | temp=${settings.temperature} max=${settings.maxTokens}`;
    },
  };
}
