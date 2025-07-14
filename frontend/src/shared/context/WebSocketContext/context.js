import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useRef,
    useMemo,
} from 'react';
import config from '../../../config';
import { useAuth } from '../AuthContext';

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket, WebSocketProvider içinde kullanılmalıdır');
    }
    return context;
};

export const WebSocketProvider = ({ children }) => {
    const socketInstanceRef = useRef(null);
    const reconnectTimerRef = useRef(null);
    const reconnectAttemptsRef = useRef(0);
    
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState(null);

    const { user: currentUser, loading: authLoading } = useAuth();

    const connectWebSocket = useCallback(() => {
        if (socketInstanceRef.current && socketInstanceRef.current.readyState === WebSocket.OPEN) {
            console.log(`[WebSocket] Bağlantı zaten açık. Kullanıcı: ${currentUser?._id}`);
            return;
        }

        if (authLoading) {
            console.log("[WebSocket] Kimlik doğrulaması bekleniyor, bağlantı ertelendi.");
            return;
        }

        if (!currentUser?._id) {
            console.log("[WebSocket] Kullanıcı bulunamadı, bağlantı kurulamıyor.");
            return;
        }

        if (!config.wsBaseUrl) {
            console.error("[WebSocket] HATA: WebSocket temel URL'si (wsBaseUrl) config dosyasında tanımlanmamış!");
            return;
        }

        console.log(`[WebSocket] Bağlantı kuruluyor... Kullanıcı: ${currentUser._id}`);
        const wsUrl = `${config.wsBaseUrl}?userId=${currentUser._id}`;
        const ws = new WebSocket(wsUrl);
        socketInstanceRef.current = ws;

        ws.onopen = () => {
            console.log(`%c[WebSocket] Bağlantı başarılı bir şekilde kuruldu. Kullanıcı: ${currentUser._id}`, 'color: green; font-weight: bold;');
            setIsConnected(true);
            setSocket(ws);
            reconnectAttemptsRef.current = 0;
            if (reconnectTimerRef.current) {
                clearTimeout(reconnectTimerRef.current);
            }
        };

        ws.onclose = (event) => {
            console.warn(`[WebSocket] Bağlantı kapandı. Kod: ${event.code}, Sebep: "${event.reason || 'Bilinmiyor'}"`);
            setIsConnected(false);
            setSocket(null);
            socketInstanceRef.current = null;

            // 1000 = Normal Kapanış. Bu durumda tekrar bağlanmaya çalışma.
            if (event.code !== 1000) {
                const delay = Math.min(30000, 1000 * (2 ** reconnectAttemptsRef.current));
                reconnectAttemptsRef.current += 1;
                console.log(`[WebSocket] ${delay / 1000} saniye içinde yeniden bağlanma denemesi yapılacak... (${reconnectAttemptsRef.current}. deneme)`);
                reconnectTimerRef.current = setTimeout(connectWebSocket, delay);
            }
        };

        ws.onerror = (error) => {
            console.error('[WebSocket] Bir hata oluştu:', error);
        };
        
    }, [currentUser?._id, authLoading]);

    useEffect(() => {
        connectWebSocket();

        return () => {
            if (reconnectTimerRef.current) {
                clearTimeout(reconnectTimerRef.current);
            }
            if (socketInstanceRef.current) {
                console.log("[WebSocket] Component temizleniyor, bağlantı kapatılıyor.");
                socketInstanceRef.current.onopen = null;
                socketInstanceRef.current.onclose = null;
                socketInstanceRef.current.onerror = null;
                socketInstanceRef.current.onmessage = null;
                socketInstanceRef.current.close(1000, "Component Unmounting");
                socketInstanceRef.current = null;
            }
            setIsConnected(false);
            setSocket(null);
            reconnectAttemptsRef.current = 0;
        };
    }, [connectWebSocket]);

    const contextValue = useMemo(() => ({
        socket,
        isConnected,
    }), [socket, isConnected]);

    return (
        <WebSocketContext.Provider value={contextValue}>
            {children}
        </WebSocketContext.Provider>
    );
};