# 🍓 Invitación de Andrea

Invitación de cumpleaños interactiva con estética *kawaii* de jardín de fresas.
La portada muestra un sobre 3D con sello de cera; al tocarlo, el sello vibra y
se rompe, la solapa se abre, la carta sube y la cámara hace zoom hasta revelar
la tarjeta con todos los detalles del evento.

Todo es **frontend**: React + Vite + TypeScript, Tailwind CSS v4, Motion y
Lucide. No necesita backend, base de datos ni servicios de pago, y se puede
publicar gratis en Vercel o Netlify.

---

## 1. Ejecutar el proyecto

Requisitos: **Node.js 20.19+** (recomendado 22+) y npm.

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite (normalmente `http://localhost:5173`).

Otros comandos:

```bash
npm run build     # comprueba TypeScript y genera dist/
npm run preview   # sirve la build de producción
npm run lint      # análisis estático con Oxlint
```

---

## 2. Editar los datos del evento

**Todo lo editable está en un solo archivo:**

```
src/config/invitation.ts
```

| Campo                | Qué controla                                                        |
| -------------------- | ------------------------------------------------------------------- |
| `celebrant.name`     | Nombre grande de la portada y la tarjeta.                           |
| `celebrant.tagline`  | Frase pequeña bajo el nombre en la portada.                         |
| `copy.*`             | Textos de bienvenida, títulos, mensaje final, pistas y firma.       |
| `event.dateISO`      | Fecha real del contador (`AAAA-MM-DDTHH:mm:ss`).                    |
| `event.dateLabel`    | Fecha visible, escrita a mano (ej. “08 de agosto”).                 |
| `event.dateYear`     | Año visible junto a la fecha.                                       |
| `event.timeLabel`    | Hora visible (ej. “3:30 PM”).                                       |
| `event.venueName`    | Nombre del lugar.                                                   |
| `event.venueAddress` | Dirección opcional bajo el nombre del lugar.                        |
| `event.mapsUrl`      | Enlace del botón “Ver ubicación” (Google Maps).                     |
| `rsvp.whatsappNumber`| Número con código de país, **sin `+`, espacios ni guiones**.        |
| `rsvp.messageTemplate`| Mensaje de WhatsApp; `{name}` se sustituye por el nombre.          |
| `rsvp.buttonLabel`   | Texto del botón de confirmación.                                    |
| `music.*`            | Archivo, volumen, bucle y título de la música.                      |

### Fecha y contador

El contador se calcula en tiempo real con `event.dateISO`. Cuando la fecha ya
pasó (o es hoy), cambia automáticamente al estado de celebración
(`copy.countdownDone`). La fecha visible es independiente, así que puedes
escribirla en el formato que prefieras.

### WhatsApp

El botón abre `wa.me` con el mensaje ya escrito. Antes de publicar, sustituye
el número de ejemplo:

```ts
whatsappNumber: '5215500000000', // ← cámbialo por el número real
```

El formato recomendado para México es `52` + `1` + número a 10 dígitos, pero
usa el código de país que corresponda. En la vista previa el enlace de
WhatsApp se puede comprobar pasando el cursor o abriéndolo en una pestaña
nueva.

### Título, descripción y favicon

El título de la pestaña y las etiquetas para compartir están en `index.html`.
Si cambias de festejada, actualiza también `<title>`, `og:title` y
`og:description`; el favicon es `public/favicon.svg`.

### Google Maps

`mapsUrl` acepta cualquier enlace de Google Maps: un enlace corto compartido,
la URL de un lugar o una búsqueda:

```ts
mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sal%C3%B3n+de+Eventos+Infinity',
```

Si tienes la dirección exacta, lo más fiable es buscar el lugar en Google Maps
→ **Compartir** → **Copiar enlace** y pegar esa URL.

---

## 3. Sustituir ilustraciones

El proyecto **funciona sin añadir ninguna imagen**: incluye ilustraciones SVG
originales (niña, gatito, fresas, margaritas, enredaderas, banderines, arco y
fondo del jardín).

### Festejada y gatito (desde el config)

1. Copia tu archivo a:

   ```
   public/assets/illustrations/character/   → personaje principal
   public/assets/illustrations/kitty/       → gatito
   ```

2. Indica la ruta pública en `src/config/invitation.ts`:

   ```ts
   illustrations: {
     character: '/assets/illustrations/character/andrea.webp',
     kitty: '/assets/illustrations/kitty/michi.webp',
   },
   ```

3. Deja la cadena vacía (`''`) para volver al SVG incluido.

Recomendaciones: PNG o WebP con fondo transparente, proporción vertical
(≈ 240 × 330 el personaje, ≈ 120 × 140 el gatito) y menos de ~300 KB por
imagen.

### Fresas, flores, enredaderas y decoración

Son componentes SVG en `src/components/illustrations/`. Puedes editarlos
directamente o reemplazarlos por imágenes: coloca el archivo en la carpeta
correspondiente de `public/assets/illustrations/` y cambia el SVG del
componente por una etiqueta `<img>`.

También existe `src/assets/illustrations/` para arte importado desde el
código; Vite le añade hash en producción. Hay un README con detalles en
`public/assets/illustrations/README.md`.

### Música

La pista incluida (`public/audio/garden-ambience.mp3`) es una composición
ambiental original generada para este proyecto, sin samples ni melodías
conocidas. Para usar otra:

1. Copia tu archivo a `public/audio/`.
2. Actualiza `music.src` en el config.

La música **solo empieza después de una interacción** del usuario (norma de
los navegadores) y se puede silenciar con el botón de la esquina. No uses
música comercial con derechos de autor.

---

## 4. Publicar gratis

La build genera una carpeta estática `dist/`, sin variables de entorno ni
backend.

### Vercel

1. Sube el proyecto a GitHub/GitLab.
2. En Vercel: **Add New → Project → Import**.
3. Vercel detecta Vite. Si no, usa:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Deploy**. Cada push genera una nueva vista previa.

### Netlify

**Opción A — desde Git**

1. **Add new site → Import an existing project**.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

**Opción B — arrastrar la build**

```bash
npm run build
```

Arrastra la carpeta `dist/` a <https://app.netlify.com/drop>.

### GitHub Pages / subcarpeta

Si publicas en una subruta (por ejemplo `usuario.github.io/invitacion/`),
define `base: '/invitacion/'` en `vite.config.ts` antes de compilar.

---

## 5. Estructura

```
public/
  audio/garden-ambience.mp3     Música ambiental original
  assets/illustrations/         Arte reemplazable (por URL pública)
  favicon.svg
src/
  config/invitation.ts          ⭐ Todos los datos editables
  components/
    Envelope.tsx                Sobre 3D y secuencia de apertura
    WaxSeal.tsx                 Sello de cera (vibra, se agrieta, se parte)
    WelcomeScreen.tsx           Portada con jardín y personajes
    Invitation.tsx              Tarjeta revelada
    Countdown.tsx               Contador en vivo + estado de celebración
    EventDetails.tsx            Fecha, hora y lugar
    RSVPButton.tsx              Confirmación por WhatsApp
    MusicControl.tsx            Música con fade y botón de silencio
    FloatingDecorations.tsx     Decoración flotante con parallax
    StrawberryBorder.tsx        Borde de fresas de la tarjeta
    illustrations/              SVG originales
    ui/                         Reveal y destellos
  styles/
    global.css                  Paleta, texturas, animaciones
    envelope.css                Geometría 3D del sobre
  assets/illustrations/         Arte importado desde el código
  lib/                          Utilidades (cn, fechas)
scripts/                        Utilidades de desarrollo (audio, capturas)
```

### Paleta

| Color            | Hex       | Uso                                  |
| ---------------- | --------- | ------------------------------------ |
| Rojo fresa       | `#C8102E` | Acentos, sello, títulos              |
| Rosa pastel      | `#FFD6E5` | Fondos, vestido, detalles            |
| Rosa crema       | `#FFF0F5` | Superficies suaves                   |
| Verde hoja       | `#6A994E` | Botones de mapa, hojas               |
| Crema            | `#FFF8ED` | Papel de la tarjeta                  |
| Blanco           | `#FFFFFF` | Tarjetas, textos sobre color         |

---

## 6. Accesibilidad y detalles técnicos

- Diseño *mobile-first* probado a 360, 390, 430 px, tablet y escritorio, sin
  scroll horizontal.
- Respeta `prefers-reduced-motion`: acorta o elimina animaciones y el zoom.
- El sello es un botón real con `aria-label`; la apertura también se puede
  lanzar desde el botón inferior.
- El contador usa `aria-live` y etiquetas accesibles.
- Fuentes autoalojadas con `@fontsource` (Pacifico, Caveat, Quicksand y
  Playfair Display): no dependen de Google Fonts en tiempo de ejecución.
- La música solo se reproduce tras pulsar el control; el botón “Repetir
  animación” vuelve a la portada y abre el sobre automáticamente.

### Scripts de desarrollo (opcionales)

`scripts/` contiene utilidades usadas durante la creación: generación de la
pista ambiental, comprobaciones de composición de color y capturas con
Playwright. No son necesarias para compilar ni publicar; puedes borrarlas si
no las usas.

---

Hecha con amor y muchas fresitas. 🍓
# InvitacionInteractiva
