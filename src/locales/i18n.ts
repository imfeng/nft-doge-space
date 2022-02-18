import { computed, watch, WritableComputedRef } from 'vue';
import { createI18n } from 'vue-i18n';
import en, { TranslateKeys } from './en';
enum EnumLanguage {
  EN = 'en',
}
type Modify<T, R> = Omit<T, keyof R> & R;
type NamedValue<T = {}> = T & Record<string, unknown>;
type LanguageFile = {
    name: EnumLanguage;
    file: string;
    title: string;
}

export const languageFileMap: Array<LanguageFile> = [
  { name: EnumLanguage.EN, file: EnumLanguage.EN, title: 'English', },
];
const defaultLanguageFile = languageFileMap[0];

export const i18nInstance = createI18n({
  legacy: false,
  locale: defaultLanguageFile.name.toString(),
  fallbackLocale: defaultLanguageFile.name.toString(),
  default: EnumLanguage.EN,
  messages: {
    [EnumLanguage.EN]: en,
  },
  silentTranslationWarn: false,
});

export const i18n = i18nInstance.global as unknown as Modify<typeof i18nInstance.global, {
    t(key: string): string;
    t(key: string, fallback: string): string;
    t(key: string, named: NamedValue): string;
    t(key: string, list: unknown[]): string;
    t(key: TranslateKeys): string;
    t(key: TranslateKeys, fallback: string): string;
    t(key: TranslateKeys, named: NamedValue): string;
    t(key: TranslateKeys, list: unknown[]): string;
    setLocaleMessage(language: EnumLanguage, messages: any): void;
    locale: WritableComputedRef<EnumLanguage>;
}>;

export const currentLocale = computed({
  get() {
    return i18n.locale.value;
  },
  set(value: EnumLanguage) {
    setI18nLanguage(value);
  },
});

export async function setI18nLanguage(language: EnumLanguage) {
  if (i18n.locale.value === language) {
    return;
  }

  const languageToLoad = getLanguageFile(language);
  if (languageToLoad) {
    await importLanguage(languageToLoad);
    applyI18nLanguage(languageToLoad.name);
    // setLanguageCookie(languageToLoad.name);
  }
}

async function importLanguage(language: LanguageFile) {
  const { default: messages, } = await import(`./${language.file}.ts`);
  i18n.setLocaleMessage(language.name, messages);
}

function applyI18nLanguage(lang: EnumLanguage) {
  i18n.locale.value = lang;
}

export function getLanguageFile(locale: EnumLanguage) {
  return languageFileMap.find(lang => lang.name === locale) ?? defaultLanguageFile;
}
