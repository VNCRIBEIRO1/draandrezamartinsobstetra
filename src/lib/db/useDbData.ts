'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook genérico para CRUD com a API /api/db/[table]
 * Substitui localStorage por banco de dados Neon PostgreSQL.
 */
export function useDbData<T extends { id: string }>(
  table: string,
  options?: { autoLoad?: boolean; pollInterval?: number }
) {
  const { autoLoad = true, pollInterval = 0 } = options || {};
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastFetchRef = useRef<string>('');

  // ── LOAD ──
  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/db/${table}`);
      if (!res.ok) {
        if (res.status === 401) {
          setError('Não autorizado');
          setData([]);
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }
      const rows: T[] = await res.json();
      const json = JSON.stringify(rows);
      // Only update state if data actually changed
      if (json !== lastFetchRef.current) {
        lastFetchRef.current = json;
        setData(rows);
      }
      setError(null);
    } catch (err) {
      console.error(`[useDbData] Error loading ${table}:`, err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, [table]);

  // ── AUTO LOAD ──
  useEffect(() => {
    if (autoLoad) load();
  }, [autoLoad, load]);

  // ── POLLING (real-time sync) ──
  useEffect(() => {
    if (!pollInterval || pollInterval <= 0) return;
    const interval = setInterval(load, pollInterval);
    return () => clearInterval(interval);
  }, [pollInterval, load]);

  // ── CREATE ──
  const create = useCallback(async (item: T | T[]): Promise<boolean> => {
    try {
      const res = await fetch(`/api/db/${table}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // Optimistic update
      const items = Array.isArray(item) ? item : [item];
      setData(prev => [...prev, ...items]);
      return true;
    } catch (err) {
      console.error(`[useDbData] Error creating in ${table}:`, err);
      setError(String(err));
      return false;
    }
  }, [table]);

  // ── UPDATE ──
  const update = useCallback(async (item: Partial<T> & { id: string }): Promise<boolean> => {
    try {
      const res = await fetch(`/api/db/${table}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // Optimistic update
      setData(prev => prev.map(r => r.id === item.id ? { ...r, ...item } as T : r));
      return true;
    } catch (err) {
      console.error(`[useDbData] Error updating in ${table}:`, err);
      setError(String(err));
      return false;
    }
  }, [table]);

  // ── DELETE ──
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/db/${table}?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // Optimistic update
      setData(prev => prev.filter(r => r.id !== id));
      return true;
    } catch (err) {
      console.error(`[useDbData] Error deleting from ${table}:`, err);
      setError(String(err));
      return false;
    }
  }, [table]);

  // ── SET (full replace — for bulk operations) ──
  const setAll = useCallback((newData: T[]) => {
    setData(newData);
  }, []);

  return { data, setData: setAll, loading, error, load, create, update, remove };
}
