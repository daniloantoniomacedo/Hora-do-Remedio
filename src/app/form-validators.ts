import { FormControl, FormGroup } from '@angular/forms';
export class FormValidators {
  static isValidCPF(control: FormControl): null | { invalidCpf: boolean } {
    let cpf = control.value;
    if (typeof cpf !== 'string') return { invalidCpf: true };
    cpf = cpf.replace(/[\s.-]*/gim, '');
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    ) {
      return { invalidCpf: true };
    }
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return { invalidCpf: true };
    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return { invalidCpf: true };
    return null;
  }

  static isCepValid(control: FormControl): null | { isCepValid: boolean }{
    let cep = control.value
    const PATTERN = /^[0-9]{8}$/
    if(typeof cep !== 'string') return { isCepValid: true };
    cep = cep.replace(/[\s.-]*/gim, '')
    return PATTERN.test(cep) ? null : { isCepValid: true };
  }

  static equalsTo(otherField: string) {
    const validation = (fieldControl: FormControl) => {
      if (!otherField){
        throw new Error("É preciso informar um campo.");
      }

      /*
      Quando o Angular inicia pela primeira vez o formulário, no ngOnInit, a propiedade parent está vazia!
      Portanto, não podemos acessar a propiedade controls de algo null. Sendo possível acessor somente após o 
      término da construção do formulário pelo ngOnInit. 
      */
      if(!fieldControl.parent){
        return null;
      }

      const otherFieldControl = (<FormGroup>fieldControl.parent).controls[otherField]

      if (!otherFieldControl){
        throw new Error("O outro campo está vazio.");
      }

      if(otherFieldControl.value !== fieldControl.value){
        return { equalsTo: true }
      }
      return null
    }
    return validation
  }

  static isPasswordValid(control: FormControl): null | { isPasswordValid: boolean }{
    let password = control.value
    /*PATTERN: deve ter entre 8 e 10 caracteres, pelo menos, 
    uma letra maiúscula, uma letra minúscula, 
    um número e um caractere especial.*/
    const PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
    if(typeof password !== 'string') return { isPasswordValid: true }
    return PATTERN.test(password) ? null : { isPasswordValid: true }
  }

  static isPhoneValid(control: FormControl): null | { isPhoneValid: boolean }{
    let phone = control.value
    /*
    PATTERN:
    ^ = Início da string.
    [1-9]{2} = Dois dígitos de 1 a 9. Não existem códigos de DDD com o dígito 0.
    [9]{0,1} = O primeiro dígito é 9, mais ele pode ou não existir daí o "0" ou "1" dentro da {0,1}.
    [6-9]{1} = o segundo dígito pode ser de 6 à 9.
    [0-9]{3} = Os três outros dígitos são de 0 à 9
    [0-9]{4} = A segunda metade do número do telefone.
    $ = Final da string.*/
    const PATTERN = /^[1-9]{2}[9]{0,1}[6-9]{1}[0-9]{3}[0-9]{4}$/
    if(typeof phone !== 'string') return { isPhoneValid: true }
    return PATTERN.test(phone) ? null : { isPhoneValid: true }
  }

  static isDateValid(control: FormControl): null | { isDateValid: boolean }{
    let today = new Date()
    let dateUser = new Date(control.value)
    if(dateUser>today){
      return { isDateValid: true }
    }
    return null
  }

  static isSelectValid(control: FormControl): null | { isSelectValid: boolean }{
    let select = control.value
    if(select == 'Selecione') {
      return { isSelectValid: true }
    }
    return null
  }
}