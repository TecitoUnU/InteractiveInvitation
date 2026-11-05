# Ilustraciones

Aquí puedes colocar tus propias ilustraciones. El proyecto funciona sin
añadir nada: si no hay imágenes, se usan las ilustraciones SVG originales
incluidas en `src/components/illustrations/`.

## Carácter opcional (se activa desde el config)

| Carpeta          | Uso                                  | Ruta sugerida |
| ---------------- | ------------------------------------ | ------------- |
| `character/`     | Niña / festejada de la portada       | `/assets/illustrations/character/andrea.webp` |
| `kitty/`         | Gatito decorativo                    | `/assets/illustrations/kitty/michi.webp` |

Después de copiar el archivo, edita `src/config/invitation.ts`:

```ts
illustrations: {
  character: '/assets/illustrations/character/andrea.webp',
  kitty: '/assets/illustrations/kitty/michi.webp',
},
```

Recomendaciones:

- PNG o WebP con fondo transparente.
- Personaje: proporción vertical cercana a 240 × 330 (por ejemplo 720 × 990).
- Gatito: proporción cercana a 120 × 140 (por ejemplo 480 × 560).
- Optimiza el peso (idealmente < 300 KB por imagen) para móviles.

## Ilustraciones decorativas

Las fresas, margaritas, enredaderas, banderines, arco y fondo están dibujados
como SVG dentro de `src/components/illustrations/`. Si quieres sustituirlos por
arte propio, coloca el archivo en las carpetas `strawberries/`, `flowers/`,
`vines/`, `decorations/` o `textures/` y edita el componente SVG correspondiente
para renderizar una etiqueta `<img>`.

También puedes importar arte directamente desde `src/assets/illustrations/`;
Vite lo empaquetará con hash automáticamente.
