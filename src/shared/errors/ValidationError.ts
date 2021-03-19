interface createValidationErrorDTO {
  type: string;
  value: string | number;
  statusCode?: number;
  message?: string;
}

class ValidationError {
  public readonly message: string;
  public readonly type: string;
  public readonly value: string | number;
  public readonly statusCode: number;

  constructor({ value, type, message = '', statusCode = 400 }: createValidationErrorDTO) {
    this.value = value;
    this.type = type;
    this.statusCode = statusCode;
    this.message = message;
    
    if (!message && type === 'any.required') {
      this.message = `${this.value} é um valor obrigatório.`;
    }

    if (!message && type === 'string.base') {
      this.message = `${this.value} é um valor do tipo texto.`;
    }

    if (!message && type === 'number.base') {
      this.message = `${this.value} é um valor do tipo número.`;
    }

    if (!message && type === 'date.base') {
      this.message = `${this.value} é um valor do tipo data.`;
    }

    if (!message && type === 'object.unknown') {
      this.message = `${this.value} não é um valor permitido.`;
    }
  }
}
  
export default ValidationError;