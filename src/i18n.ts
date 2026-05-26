import { createI18n } from 'vue-i18n'
import ptBR from './locales/pt-BR.json'

type MessageSchema = typeof ptBR

const i18n = createI18n<[MessageSchema], 'pt-BR'>({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  messages: {
    'pt-BR': ptBR,
  },
})

export default i18n
