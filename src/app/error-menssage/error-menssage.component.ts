import { AbstractControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'error-menssage',
  templateUrl: './error-menssage.component.html',
  styleUrls: ['./error-menssage.component.css']
})
export class ErrorMenssageComponent implements OnInit {

  @Input('field') field: string = "";
  @Input('form') form?: AbstractControl | null;
  @Input('minlength') minlength?: string;
  @Input('maxlength') maxlength?: string;
  @Input('otherField') otherField?: string;

  constructor() { }

  ngOnInit() {
  }

  get errorMenssage(){
    //for...in itera as propiedades de um objeto
    //for...of itera os valores das propiedades de um objeto
    for(const propertyName in this.form?.errors){
      if(this.form?.errors.hasOwnProperty(propertyName) && this.form?.touched){ //Sempre que usar o for...in devo verificar se tenho a propiedade a ser iterada
        return this.getErrorMenssage(this.field, propertyName, this.otherField, this.minlength, this.maxlength)
      }
    }
    return null
  }

  getErrorMenssage(fieldName: string, validatorName: string, otherFieldName?: string, minlength?: string, maxlength?: string){
    const menssage: Menssage = {
      required: `O campo ${fieldName} é obrigatório.`,
      minlength: `O campo ${fieldName} precisa ter no mínimo ${minlength} caracteres.`,
      maxlength: `O campo ${fieldName} precisa ter no máximo ${maxlength} caracteres.`,
      email: "Email informado não é válido.",
      invalidCpf: "CPF inválido.",
      isCepValid: "CEP inválido.",
      equalsTo: `O campo ${fieldName} é diferente do campo ${otherFieldName}.`,
      alredyExistsCpf: `CPF já cadastrado.`,
      isPhoneValid: `O número informado é inválido`,
      isDateValid: `A data informada é inválida`,
      isSelectValid: `Selecione uma opção.`,
      isPasswordValid: `O campo ${fieldName} deve ter entre 8 e 10 caracteres, pelo menos, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.`
    }

    return menssage[validatorName]
  }

}

/*
A assinatura de um índice é feita através de uma interface e é composta por:
[required: string] é tipo da propiedade required 
[required: string]: string é o tipo da chave.
*/

interface Menssage{
  [propertyName: string]: string 
}
