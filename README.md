# Crossfit E-commerce

Este proyecto es una tienda en línea de productos de Crossfit desarrollada con Next.js, React y PostgreSQL.

## Estructura del Proyecto

\`\`\`markdown
crossfit-ecommerce/
├── app/
│   ├── api/
│   │   ├── assets/
│   │   │   └── route.ts            # Maneja la entrega de archivos estáticos
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts        # Maneja la autenticación de usuarios
│   │   │   └── register/
│   │   │       └── route.ts        # Maneja el registro de nuevos usuarios
│   │   ├── orders/
│   │   │   └── route.ts            # Maneja la creación y gestión de pedidos
│   │   └── products/
│   │       ├── [id]/
│   │       │   └── route.ts        # Maneja las operaciones de productos individuales
│   │       └── route.ts            # Maneja las operaciones de lista de productos
│   ├── components/
│   │   ├── CartDrawer.tsx          # Componente del carrito de compras
│   │   ├── Footer.tsx              # Componente del pie de página
│   │   ├── GLBModel.tsx            # Componente para la visualización 3D de productos
│   │   ├── Navbar.tsx              # Componente de la barra de navegación
│   │   ├── ProductCard.tsx         # Componente para mostrar productos individuales
│   │   └── ui/
│   │       └── (componentes de UI reutilizables)
│   ├── contexts/
│   │   ├── AuthContext.tsx         # Contexto para la gestión de autenticación
│   │   ├── CartContext.tsx         # Contexto para la gestión del carrito
│   │   └── LanguageContext.tsx     # Contexto para la gestión del idioma
│   ├── lib/
│   │   ├── auth.ts                 # Funciones de utilidad para autenticación
│   │   ├── constants.ts            # Constantes utilizadas en toda la aplicación
│   │   ├── db.ts                   # Configuración de la conexión a la base de datos
│   │   └── gtag.ts                 # Configuración de Google Analytics
│   ├── models/
│   │   ├── Product.ts              # Modelo y funciones relacionadas con productos
│   │   └── User.ts                 # Modelo y funciones relacionadas con usuarios
│   ├── (route)/
│   │   └── page.tsx                # Página principal de la aplicación
│   ├── layout.tsx                  # Diseño principal de la aplicación
│   └── page.tsx                    # Componente de la página de inicio
├── public/
│   └── (archivos estáticos)
├── .env.local                      # Variables de entorno locales
├── next.config.js                  # Configuración de Next.js
├── package.json                    # Dependencias y scripts del proyecto
├── postcss.config.js               # Configuración de PostCSS
├── tailwind.config.js              # Configuración de Tailwind CSS
└── tsconfig.json                   # Configuración de TypeScript
\`\`\`

## Funcionalidades de los Archivos Principales

- `app/page.tsx`: Página de inicio que muestra el catálogo de productos.
- `app/product/[id]/page.tsx`: Página de detalle de producto individual.
- `app/cart/page.tsx`: Página del carrito de compras.
- `app/checkout/page.tsx`: Página de proceso de pago.
- `app/api/products/route.ts`: API para obtener la lista de productos.
- `app/api/products/[id]/route.ts`: API para obtener detalles de un producto específico.
- `app/api/orders/route.ts`: API para crear y gestionar pedidos.
- `app/api/auth/login/route.ts`: API para la autenticación de usuarios.
- `app/api/auth/register/route.ts`: API para el registro de nuevos usuarios.
- `app/components/Navbar.tsx`: Barra de navegación con enlaces a las principales secciones y control de idioma.
- `app/components/Footer.tsx`: Pie de página con información adicional y enlaces útiles.
- `app/contexts/AuthContext.tsx`: Gestión del estado de autenticación del usuario.
- `app/contexts/CartContext.tsx`: Gestión del estado del carrito de compras.
- `app/contexts/LanguageContext.tsx`: Gestión del idioma de la aplicación.


## Configuración del Proyecto

1. Clona el repositorio:
   \`\`\`
   git clone https://github.com/tu-usuario/crossfit-ecommerce.git
   cd crossfit-ecommerce
   \`\`\`

2. Instala las dependencias:
   \`\`\`
   npm install
   \`\`\`
   Este comando instalará todas las dependencias necesarias listadas en el archivo `package.json`.

3. Configura las variables de entorno:
   Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:
   \`\`\`
   DB_USER=tu_usuario_de_postgres
   DB_HOST=localhost
   DB_NAME=nombre_de_tu_base_de_datos
   DB_PASSWORD=tu_contraseña_de_postgres
   DB_PORT=5432
   JWT_SECRET=tu_secreto_jwt
   NEXT_PUBLIC_GA_ID=tu_id_de_google_analytics
   \`\`\`

4. Configura la base de datos PostgreSQL:
   - Asegúrate de tener PostgreSQL instalado y en ejecución en tu máquina local.
   - Crea una nueva base de datos en PostgreSQL.
   - Ejecuta los comandos SQL proporcionados anteriormente para crear las tablas necesarias.

5. Inicia el servidor de desarrollo:
   \`\`\`
   npm run dev
   \`\`\`
   Este comando iniciará el servidor de desarrollo de Next.js.

6. Abre tu navegador y visita `http://localhost:3000`.

Nota: Para un entorno de producción, deberás construir la aplicación usando `npm run build` y luego iniciarla con `npm start`.

