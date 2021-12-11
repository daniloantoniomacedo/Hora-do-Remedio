import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class InputComponent implements ControlValueAccessor{

  @Input('type') type: string = "text"
  @Input('field') field: string = ""
  @Input('messageLabel') messageLabel: string = "Menssagem padrão"
  @Input('label') label: string = ""
  @Input('class') class: string = "form-control"
  @Input('placeHolder') placeHolder: string = ""
  @Input('form') form?: AbstractControl | null
  @Input('readOnly') readOnly: boolean = false
  @Input('otherField') otherField?: string;
  @Input('minlength') minlength?: string
  @Input('maxlength') maxlength?: string
  @Input('mask') mask: string = ""
  @Input('prefix') prefix: string = "";

  private _innerValue: any //declando como any, não preciso inicializar

  get innerValue(){ //acessor get que controla como _innerValue é acessado
    return this._innerValue
  }

  set innerValue(value:any){
    if (value !== this._innerValue){ //Se value for diferente do vaor atual _innerValue, ou seja, houve mudança. 
      this._innerValue = value //atualiza o valor de _innerValue
      this.onChangeCallBack(value)
    }
  }

  constructor() { }

   //Angular vai tomar conta dessas funções no registerOnChange() e registerOnTouched()
  onChangeCallBack: (any: any) => void = () => {}
  onTouchedCallBack = () => {}

  writeValue(value: any): void { //responsável por setar o valor do campo de input
    this.innerValue = value //vai chamar o acessor da variável _innerValue e atribuir o valor de value a  _innerValue
  }

  registerOnChange(fn: any): void { //responsável por informar ao angular toda vez que o valor muda
    this.onChangeCallBack = fn //Recebe uma função que o Angular vai fornecer
  }

  registerOnTouched(fn: any): void { //responsável por informar ao angular toda vez que o valor ganhar foco
    this.onTouchedCallBack = fn //Recebe uma função que o Angular vai fornecer
  }

  setDisabledState?(isDisablied: boolean): void{
    this.readOnly = isDisablied
  }

  verifyInvalidTouched(): boolean {
    if (this.form){
      return this.form.invalid && this.form.touched
    }
    return false
  }

}
