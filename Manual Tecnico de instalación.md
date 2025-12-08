📘 Manual Técnico de Instalación
Para: Profesor / Evaluador Estado del proyecto: Código fuente completo (sin dependencias instaladas).
⚠ Nota Importante antes de empezar
Como se eliminó la carpeta node_modules para facilitar el transporte del archivo, el primer paso obligatorio en cada carpeta es ejecutar el comando de instalación para regenerar las librerías.
Requisitos Previos
•	Node.js instalado en el computador.
•	Expo Go instalado en el celular (Android/iOS).
•	Celular y Computador conectados a la misma red Wi-Fi.
________________________________________
1. Preparar el Backend (Servidor)
El cerebro de la aplicación que conecta con la base de datos en la nube (Neon).
1.	Abra la terminal en la carpeta travel-backend.
2.	Restaurar librerías: Ejecute el siguiente comando para descargar los módulos necesarios:
npm install
3.	Configurar Base de Datos:
o	Como la base de datos esta en la nube no es necesario descargar ni configurarla solo debe crear un archivo llamado .env y poner esto a dentro de el “DATABASE_URL='postgresql://neondb_owner:npg_WBFneT4gtv5I@ep-young-surf-a4uks6r2-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'”
Sin las comillas
4.	Encender Servidor:
npm run start:dev
Espere hasta ver el mensaje verde: [Nest] ... Application is running.
________________________________________
2. Preparar la App (Frontend)
La interfaz visual que correrá en el celular.
1.	Abra una nueva terminal en la carpeta BlindTravelApp.
2.	Restaurar librerías: Ejecute el comando:
npm install
3.	Configuración de IP (CRÍTICO):
o	Para que el celular encuentre al computador, debe actualizar la IP.
o	Averigüe su IP local escribiendo ipconfig (Windows) o ifconfig (Mac) en la terminal.
o	Vaya al archivo: src/config/api.ts.
o	Cambie la IP por la suya:
JavaScript
export const API_URL = 'http://SU_NUEVA_IP:3000';
(Guarde el archivo con Ctrl + S).
4.	Iniciar la App:
npx expo start --clear
5.	Escanee el código QR con la app Expo Go.
