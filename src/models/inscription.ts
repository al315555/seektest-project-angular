export class Inscription {
  static PENDIENTE = 0;
  static ACEPTADO = 1;
  static DENEGADO = 2;
  static CANCELADO = 3;
  uid: string;
  session: number;
  state: number;
}
