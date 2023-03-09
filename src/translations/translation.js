import i18n from "@/translations"

const Tr = {
    get supportedLocales() {
        return import.meta.env.VITE_SUPPORTED_LOCALES.split(",")
    },
    set currentLocale(newLocale) {
        i18n.global.locale.value = newLocale
    },
    async switchLanguage(newLocale) {
        Tr.currentLocale = newLocale
        document.querySelector("html").setAttribute("lang", newLocale)
    },
}
export default Tr