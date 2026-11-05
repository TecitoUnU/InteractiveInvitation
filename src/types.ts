/** Etapas de la coreografía del sobre. */
export type EnvelopeStage =
  | 'closed'
  | 'shake'
  | 'break'
  | 'open'
  | 'rise'
  | 'zoom'

export interface EnvelopeHandle {
  open: () => void
}
