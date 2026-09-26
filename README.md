# 🏜️ Tamarugal — Terreno en venta

Landing page para la venta de un terreno en la **Pampa del Tamarugal**, Región de
Tarapacá, Chile. Es una página de una sola vista centrada en captar interesados:
presenta los atractivos del terreno y cierra con un formulario de contacto.

**Demo en vivo:** https://terreno-ruddy.vercel.app/

## ✨ Secciones

| Sección | Contenido |
| --- | --- |
| Hero | Presentación del terreno, cifras clave y llamados a la acción |
| Destacados | Sol todo el año, cielos prístinos, reserva del Tamarugo, patrimonio UNESCO |
| Ubicación | Contexto geográfico y accesos |
| Potencial | Oportunidades de inversión (solar, turismo, minería/litio, residencial) |
| Galería | Imágenes del entorno |
| Contacto | Formulario que guarda los leads en Supabase |

## 🛠️ Tecnologías

- **React 18** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Supabase** (tabla `leads` para los contactos)
- **lucide-react** (iconografía)
- Desplegado en **Vercel**

## 🚀 Puesta en marcha

```bash
git clone https://github.com/Freddyohlo/terreno.git
cd terreno
npm install
cp .env.example .env      # completa tus credenciales de Supabase
npm run dev
```

### Variables de entorno

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

> Si no configuras nada, `src/lib/supabase.ts` usa valores de relleno y el envío
> del formulario no funcionará.

### Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualiza el build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Verificación de tipos TypeScript |

## 📁 Estructura

```
index.html                 HTML raíz (SEO y Open Graph)
src/
  App.tsx                  Todas las secciones de la landing
  lib/supabase.ts          Cliente de Supabase
  main.tsx                 Punto de entrada
public/
  favicon.svg
supabase/
  migrations/
    20260813081556_create_land_leads_table.sql   Tabla `leads` + RLS
```

## 🗄️ Base de datos

La migración crea la tabla `leads` (nombre, correo, teléfono, interés, mensaje) y
habilita **Row Level Security** con permiso de **solo inserción** para el rol
anónimo. Los leads son privados para el dueño del sitio: no se pueden leer ni
modificar desde el frontend.

## 📄 Licencia

Uso personal. Todos los derechos reservados.
