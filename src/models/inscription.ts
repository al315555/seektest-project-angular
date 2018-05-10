export class Inscription {
  static PENDIENTE = 0;
  static ACEPTADO = 1;
  static DENEGADO = 2;
  static CANCELADO = 3;
  key: string;
  uid: string;
  session: number;
  state: number;
  userValue: number = 0;
  expeValue: number = 0;
}
