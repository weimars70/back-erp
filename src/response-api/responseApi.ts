export class ResponseApi {
  tatusCode: number;
  success: boolean;
  message: string;
  data: object;

  constructor(tatusCode, success, message, data) {
    this.tatusCode = tatusCode;
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
