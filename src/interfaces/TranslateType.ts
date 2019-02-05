interface TranslateType {
  messages: {
    [key: string]: string
  },
  locale: string,
}

declare var Translate: TranslateType;
