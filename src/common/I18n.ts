<<<<<<< HEAD
export class I18n {
  locale: string;
  translations: Record<string, Record<string, string>>;
=======
type Translations = Record<string, Record<string, string>>;

/**
 * I18n translation class.
 */
export class I18n {
  /** The language locale. */
  locale?: string;
  /** The translations object. */
  translations: Translations;
  /** The fallback language locale. */
>>>>>>> upstream/ts_migration_base
  fallbackLocale: string;

  constructor({
    locale,
    translations,
  }: {
<<<<<<< HEAD
    locale: string | undefined;
    translations: Record<string, Record<string, string>>;
  }) {
    this.locale = locale!;
=======
    locale?: string;
    translations: Translations;
  }) {
    this.locale = locale;
>>>>>>> upstream/ts_migration_base
    this.translations = translations;
    this.fallbackLocale = "en";
  }

  t(str: string) {
    if (!this.translations[str]) {
      throw new Error(`${str} Translation string not found`);
    }

    if (!this.translations[str][this.locale || this.fallbackLocale]) {
      throw new Error(`${str} Translation locale not found`);
    }

    return this.translations[str][this.locale || this.fallbackLocale];
  }
}
