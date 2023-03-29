export enum PlayOption {
  X = 'x',
  O = 'o',
}

export enum Message {
  CHANGE = 'change',
  JOIN = 'join',
  INITIALIZE = 'initialize',
  RESET = 'reset',
}

export type CombinationType = {
  row: number;
  col: number;
};

export type MatrixType = PlayOption | null;

export type MessageDataType = { row: number; column: number; value?: PlayOption; selectedVariant?: PlayOption };
