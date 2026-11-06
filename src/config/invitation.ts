/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIGURACIÓN DE LA INVITACIÓN
 *  Cambia aquí todos los datos del evento. No hace falta tocar
 *  los componentes para personalizar la tarjeta.
 * ─────────────────────────────────────────────────────────────
 */

export const invitation = {
  /** Datos de la festejada */
  celebrant: {
    name: 'Lauren Mariana',
    /** Pequeña frase bajo el nombre en la portada */
    tagline: 'te invita a su cumpleaños',
  },

  /** Textos principales */
  copy: {
    kicker: '',
    welcome: 'Festejemos Juntos',
    detailsLabel: 'El gran día',
    countdownLabel: 'Falta muy poquito',
    countdownDone: '¡Hoy es el gran día!',
    countdownDoneSub: 'Prepárate para celebrar juntos. 🍓',
    finalMessage: 'Con mucha alegría te invitamos a celebrar el primer añito de nuestra princesa💗',
    signature: 'Con amor,',
    footerNote: 'Hecha con amor y muchas fresitas',
    openHint: 'Toca el sello para abrir tu invitación',
    openHintSub: 'Una sorpresa te espera dentro',
  },

  /** Datos del evento (editables) */
  event: {
    /**
     * Fecha real del evento. El contador se calcula con esta fecha.
     * Formato ISO local: AAAA-MM-DDTHH:mm:ss
     * Si el año ya pasó, el contador mostrará el mensaje de celebración.
     */
    dateISO: '2026-11-15T15:00:00',
    dateLabel: 'Domingo 15 de noviembre',
    dateYear: '2026',
    timeLabel: '3:00 PM',
    venueName: 'Rancho el Pedregal',
    /** Puedes escribir una dirección o dejar el texto vacío */
    venueAddress: '',
    dressCode: 'Viste de rojo o rosado',
    /**
     * URL de Google Maps. Puedes usar un enlace corto de Google Maps,
     * un enlace de "Compartir" o una búsqueda por nombre.
     */
    mapsUrl:
      'https://maps.app.goo.gl/FpyUXLYEr2gNUgE57',
  },

  /** Confirmación por WhatsApp */
  rsvp: {
    /**
     * Número con código de país, SIN "+", espacios ni guiones.
     * Ejemplo México: 5215512345678
     * ⚠️ Reemplaza este número de ejemplo antes de publicar.
     */
    whatsappNumber: '39945713',
    /** {name} se sustituye automáticamente por el nombre de la festejada */
    messageTemplate: '¡Hola! Confirmo mi asistencia a la celebración de {name}. 🍓❤️',
    buttonLabel: 'Confirmar asistencia',
    hint: 'Se abrirá WhatsApp con un mensaje listo para enviar',
  },

  /** Música ambiental (el navegador sólo la reproduce tras un clic) */
  music: {
    src: '/audio/Strawberry Shortcake Theme song 2003 (Straw Buh-buh-buh-berry Shortcake).mp3',
    title: 'Música del jardín',
    volume: 0.35,
    loop: true,
  },

  /**
   * Ilustraciones opcionales de la festejada y el gatito.
   * Si dejas una cadena vacía se usan los SVG originales del proyecto.
   * Para reemplazarlas, coloca tu archivo en public/assets/illustrations/...
   * y escribe la ruta, por ejemplo: '/assets/illustrations/character/andrea.webp'
   *
   * Las fresas, flores, enredaderas y fondos son SVG editables en
   * src/components/illustrations/ (ver README de assets).
   */
  illustrations: {
    character: '',
    kitty: '',
  },
} as const

export type InvitationConfig = typeof invitation

/** Construye el mensaje de WhatsApp con el nombre de la festejada. */
export function getRsvpMessage(name: string = invitation.celebrant.name): string {
  return invitation.rsvp.messageTemplate.replace('{name}', name)
}

/** Enlace de WhatsApp listo para abrir. */
export function getWhatsAppUrl(name: string = invitation.celebrant.name): string {
  const phone = invitation.rsvp.whatsappNumber.replace(/\D/g, '')
  return `https://wa.me/${phone}?text=${encodeURIComponent(getRsvpMessage(name))}`
}

/** Fecha objetivo del evento como timestamp (0 si la fecha no es válida). */
export function getEventTimestamp(): number {
  const timestamp = new Date(invitation.event.dateISO).getTime()
  return Number.isNaN(timestamp) ? 0 : timestamp
}
