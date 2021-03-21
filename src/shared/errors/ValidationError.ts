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
    
    if (type === 'any.required') {
      this.message = `${this.value} é um valor obrigatório.`;
    }

    if (type === 'string.base') {
      this.message = `${this.value} é um valor do tipo texto.`;
    }

    if (type === 'number.base') {
      this.message = `${this.value} é um valor do tipo número.`;
    }

    if (type === 'date.base') {
      this.message = `${this.value} é um valor do tipo data.`;
    }

    if (type === 'object.unknown') {
      this.message = `${this.value} não é um valor permitido.`;
    }
  }
}
  
export default ValidationError;