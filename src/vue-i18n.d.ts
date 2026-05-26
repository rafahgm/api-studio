import type { DefineLocaleMessage } from 'vue-i18n'
import type ptBR from './locales/pt-BR.json'

type MessageSchema = typeof ptBR

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}
