// src/config/api.ts

// IMPORTANTE: Reemplaza los 'XX' con tu Dirección IPv4 real.
// Para verla, abre una terminal (CMD o PowerShell) y escribe: ipconfig
const IP_ADDRESS = '192.168.1.7'; 

// Exportamos la dirección completa del servidor (Puerto 3000)
export const API_URL = `http://${IP_ADDRESS}:3000`;