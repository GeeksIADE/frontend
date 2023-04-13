import { createI18n } from "vue-i18n";
import locale from './locales/locale.json'

import en from './locales/en.json'
import es from './locales/es.json'
import pt from './locales/pt.json'
import ru from './locales/ru.json'
import de from './locales/de.json'
import fr from './locales/fr.json'
import jp from './locales/jp.json'
import it from './locales/it.json'

const messages = {
  en: Object.assign({}, locale, en),
  es: Object.assign({}, locale, es),
  pt: Object.assign({}, locale, pt),
  ru: Object.assign({}, locale, ru),
  de: Object.assign({}, locale, de),
  fr: Object.assign({}, locale, fr),
  jp: Object.assign({}, locale, jp),
  it: Object.assign({}, locale, it)
}

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages
})
