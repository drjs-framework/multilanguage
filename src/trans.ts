export function trans(key: string, replaces: {
  [key:string]: string
}= {}): string {
  var { messages } = Translate;

  if ({}.hasOwnProperty.call(messages, key)) {
    let translate = messages[key];
    Object.keys(replaces).forEach((replaceKey) => {
      translate = translate.replace(replaceKey, replaces[replaceKey]);
    });
    return translate;
  }
  return key;
}
