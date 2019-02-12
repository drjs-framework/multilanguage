function getLimit(limit: string): number {
  const limitWithoutSpaces = limit.trim();
  if (limitWithoutSpaces.trim() === 'Inf') {
    return Infinity;
  } else if (limitWithoutSpaces.trim() === '-Inf') {
    return -Infinity;
  }
  return parseInt(limitWithoutSpaces.trim(), 10);
}

function replacesTrans(phrase: string, count: string, parameters: {
  [key: string]: string,
}): string {
  let newPhrase = phrase.replace('%count%', count);
  const parametersKeys = Object.keys(parameters);
  for (let i = 0; i < parametersKeys.length; ++i) {
    const key = parametersKeys[i];
    const value = parameters[key];
    newPhrase = newPhrase.replace(key, value);
  }
  return newPhrase;
}

export function transChoice(key: string, count: number, parameters = {}): string {
  const { messages } = Translate;
  if (typeof count === 'undefined') {
    throw Error('No count parameter send');
  }

  if ({}.hasOwnProperty.call(messages, key)) {
    const subMessages = messages[key].split('|');
    for (let i = 0; i < subMessages.length; ++i) {
      const subMessage = subMessages[i];
      const delimiter = subMessage.match(/{-?\d}/);

      if (delimiter && delimiter.length > 0) {
        const index = parseInt(delimiter[0].replace(/[{,}]/g, ''), 10);
        if (index === count) {
          return replacesTrans(subMessage.replace(/{-?\d}/, ''), String(count), parameters);
        }
      } else {
        // search limits
        const iniPosition = subMessage.search(/[[\]]/);
        const endPosition = subMessage.substr(iniPosition + 1).search(/[[\]]/);
        const partsOfInterval = subMessage
          .substr(iniPosition, (endPosition + 2) - iniPosition)
          .split(',');

        const iniTypeLimit = partsOfInterval[0].substr(0, 1);
        const iniLimit = getLimit(partsOfInterval[0].substr(1));

        const endTypeLimit = partsOfInterval[1].substr(partsOfInterval[1].length - 1);
        const endLimit = getLimit(partsOfInterval[1].substr(0, partsOfInterval[1].length - 1));

        if (
          (
            (iniTypeLimit === ']' && count > iniLimit)
            || (iniTypeLimit === '[' && count >= iniLimit)
          )
          &&
          (
            (endTypeLimit === ']' && count <= endLimit)
            || (endTypeLimit === '[' && count < endLimit)
          )
        ) {
          return replacesTrans(subMessage.substr(endPosition + 2), String(count), parameters);
        }
      }
    }
    return key;
  }
  return key;
}
