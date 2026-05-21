/**
 * Shim: re-export 從 src/demos/clone-wanderaway-dolomites/index.tsx
 *
 * 為什麼有 shim：clone 實作放在 src/demos/（subagent 寫的位置）、
 * registry 在 src/clones/、需要一層 re-export 讓 lazy import 路徑乾淨。
 */
export { default } from '@/demos/clone-wanderaway-dolomites';
