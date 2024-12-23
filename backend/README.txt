99 Percent CrossFit E-commerce Website - Backend Setup
======================================================

Este README proporciona instrucciones para configurar el backend del sitio web de comercio electrónico 99 Percent CrossFit, incluyendo dependencias, configuración de la base de datos y modificaciones necesarias en el código.

1. Dependencias del Backend
---------------------------
Asegúrate de tener instalado:

- Node.js (v14 o posterior)
- PostgreSQL (v12 o posterior)

Instala los paquetes npm requeridos:

npm install express pg bcrypt jsonwebtoken cors dotenv stripe @sendgrid/mail

2. Configuración de la Base de Datos
------------------------------------
1. Crea una base de datos PostgreSQL para el proyecto.
2. Ejecuta los comandos SQL en el archivo `database/schema.sql` para crear las tablas necesarias.
3. Asegúrate de que la conexión a la base de datos esté correctamente configurada en `config/database.js`.

3. Variables de Entorno
-----------------------
Crea un archivo .env en la raíz del directorio backend con las siguientes variables:

DB_USER=tu_usuario_de_base_de_datos
DB_HOST=tu_host_de_base_de_datos
DB_NAME=tu_nombre_de_base_de_datos
DB_PASSWORD=tu_contraseña_de_base_de_datos
DB_PORT=5432
JWT_SECRET=tu_clave_secreta_jwt
STRIPE_SECRET_KEY=tu_clave_secreta_de_stripe
SENDGRID_API_KEY=tu_clave_api_de_sendgrid

4. Rutas API
------------
Verifica que todas las rutas API estén correctamente implementadas en la carpeta `routes/`. Asegúrate de que cada ruta tenga su correspondiente controlador en la carpeta `controllers/`.

5. Autenticación
----------------
- Verifica que el middleware de autenticación esté correctamente implementado en `middleware/auth.js`.
- Asegúrate de que las rutas protegidas utilicen este middleware.

6. Integración con Stripe
-------------------------
- Verifica que la integración con Stripe esté correctamente configurada en `services/stripe.js`.
- Asegúrate de que la clave secreta de Stripe esté correctamente configurada en las variables de entorno.

7. Envío de Correos Electrónicos
--------------------------------
- Verifica que la integración con SendGrid esté correctamente configurada en `services/email.js`.
- Asegúrate de que la clave API de SendGrid esté correctamente configurada en las variables de entorno.

8. Manejo de Errores
--------------------
- Verifica que el middleware de manejo de errores esté correctamente implementado en `server.js`.
- Asegúrate de que todas las rutas manejen adecuadamente los errores y los pasen al middleware de manejo de errores.

9. Validación de Datos
----------------------
- Asegúrate de que todas las entradas de usuario sean validadas adecuadamente antes de ser procesadas o almacenadas en la base de datos.

10. Seguridad
-------------
- Verifica que todas las contraseñas se almacenen hasheadas en la base de datos.
- Asegúrate de que las cabeceras de seguridad estén correctamente configuradas (CORS, XSS Protection, etc.).

11. Logging
-----------
- Implementa un sistema de logging adecuado para registrar errores y actividades importantes.

12. Pruebas
-----------
Ejecuta el conjunto de pruebas con:
npm test

Asegúrate de que todas las pruebas pasen antes de implementar en producción.

13. Implementación
------------------
Para implementar tu backend:

1. Configura una base de datos de producción.
2. Configura las variables de entorno para producción.
3. Construye la aplicación: npm run build
4. Inicia el servidor de producción: npm start

Recuerda configurar un sistema de monitoreo y alerta para tu entorno de producción.

14. Documentación API
---------------------
Considera generar y mantener una documentación API (por ejemplo, usando Swagger) para facilitar el desarrollo y la integración.

15. Nuevas Funcionalidades
--------------------------
- Notificaciones por correo electrónico para ofertas especiales
- Gestión de descuentos y promociones
- Gestión de inventario de productos
- Historial de pedidos para usuarios
- Recuperación de contraseña
- Perfil de usuario editable

Asegúrate de configurar y probar estas nuevas funcionalidades antes de implementar en producción.

