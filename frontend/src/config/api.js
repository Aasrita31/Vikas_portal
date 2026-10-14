/**
 * Dynamic API Base URL Configuration:
 * - If VITE_API_URL environment variable is provided, use that.
 * - Otherwise, automatically use the current hostname (e.g. localhost or Wi-Fi IP like 10.26.86.228) with port 5000.
 * This guarantees seamless connectivity across all devices on the same Wi-Fi network without hardcoding IPs.
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.hostname}:5000`
    : 'http://localhost:5000');
