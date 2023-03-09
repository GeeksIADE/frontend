<script setup>
</script>

<template>
    <select @change="switchLanguage">
        <option v-for="sLocale in supportedLocales" :key="`locale-${sLocale}`" :value="sLocale"
            :selected="locale === sLocale">
            {{ t(`locale.${sLocale}`) }}
        </option>
    </select>
</template>

<script>
import { useI18n } from 'vue-i18n'
import Tr from "@/translations/translation"
export default {
    setup() {
        const { t, locale } = useI18n()
        const supportedLocales = Tr.supportedLocales
        const switchLanguage = async (event) => { // <--- 1
            const newLocale = event.target.value // <--- 2
            await Tr.switchLanguage(newLocale) // <--- 3
        }
        return { t, locale, supportedLocales, switchLanguage } // <--- 4
    }
}
</script>