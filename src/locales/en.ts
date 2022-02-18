const translateMessage = {
  hello: 'world',
};
export type TranslateKeys = keyof typeof translateMessage;

export type TranslateMessageType = {
    [key in TranslateKeys]: string | Array<string>;
};

export default translateMessage;
