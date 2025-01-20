export type AlertType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface AlertProps {
  type?: AlertType
  title?: string
  closable?: boolean
  effect?: 'light' | 'dark'
}

export interface AlertEmits {
  (e: 'close'): void
}
