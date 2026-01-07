document.addEventListener('DOMContentLoaded', () => {
    // 1. Activar Pantalla Completa al hacer clic
    document.body.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error al intentar pantalla completa: ${err.message}`);
            });
        }
    });

    // 2. Intentar mantener la pantalla encendida (Wake Lock API)
    // Esto funciona en la mayoría de Smart TVs modernas y navegadores Chrome/Edge
    let wakeLock = null;

    const requestWakeLock = async () => {
        try {
            if ('wakeLock' in navigator) {
                wakeLock = await navigator.wakeLock.request('screen');
                console.log('Pantalla bloqueada para permanecer encendida.');
            }
        } catch (err) {
            console.error(`${err.name}, ${err.message}`);
        }
    };

    // Solicitar mantener pantalla encendida al cargar
    requestWakeLock();

    // Volver a solicitar si la pestaña pierde y recupera visibilidad
    document.addEventListener('visibilitychange', async () => {
        if (wakeLock !== null && document.visibilityState === 'visible') {
            await requestWakeLock();
        }
    });
});