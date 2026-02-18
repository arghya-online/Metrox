import { useState, useEffect } from 'react';

const STORAGE_KEY = 'metrox_sessions';
const MAX_SESSIONS = 10;

export function useSessions() {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setSessions(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse sessions", e);
            }
        }
    }, []);

    const saveSession = (data) => {
        const newSession = {
            id: Date.now(),
            date: new Date().toISOString(),
            ...data
        };

        const updated = [newSession, ...sessions].slice(0, MAX_SESSIONS);
        setSessions(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const clearSessions = () => {
        setSessions([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return { sessions, saveSession, clearSessions };
}
