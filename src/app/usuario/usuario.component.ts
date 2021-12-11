import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { CadastroClienteService } from '../cadastro-cliente.service';
import { FeedbackModalService } from '../feedback-modal/feedback-modal.service';
import { FormValidators } from '../form-validators';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {

  form?: FormGroup;
  bsModalRef?: BsModalRef;
  relacionamentos: string[] = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)']

  constructor(
    private cadastro: CadastroClienteService,
    private formBuilder: FormBuilder,
    private feedbackModalService: FeedbackModalService
  ) {}

  ngOnInit(): void {

    this.cadastro.get().pipe(take(1)).subscribe(
      (success) => {},
      (error) => this.feedbackModalService.getError("Erro ao conectar com o servidor. Tente novamente mais tarde.")
    );

    this.form = this.formBuilder.group({
      nome: [,/*setar um valor inicial*/ [Validators.required,] /*validações síncronas*/, [] /*validações assíncronas*/,],
      cpf: [, [ Validators.required, Validators.minLength(11), FormValidators.isValidCPF ], [this.verifyCpf.bind(this)] ],
      email: [, [Validators.required, Validators.email]],
      contatoCelular: [, [Validators.required, Validators.minLength(11), FormValidators.isPhoneValid]],
      dataNascimento: [, [Validators.required, FormValidators.isDateValid]],
      renda: [, [Validators.required]],
      relacionamento: [, [/*FormValidators.isSelectValid*/]],
      senha: [, [Validators.required, FormValidators.isPasswordValid]],
      comfirmeSenha: [, [Validators.required, FormValidators.isPasswordValid, FormValidators.equalsTo('senha') ] ],
      cep: [, [Validators.required, FormValidators.isCepValid]],
    });
  }

  onSubmit() {
    console.log(this.form)
    this.cadastro.create(this.form?.value).pipe(take(1)).subscribe(
      (success) => this.feedbackModalService.getSuccess(),
      (error) => this.feedbackModalService.getError()
    );
  }

  alreadyExistCpf(_cpf: string) {
    return this.cadastro.get().pipe(
      map((cadastro) => cadastro.map((cadastro) => cadastro.cpf)),
      //tap(cadastro => console.log(cadastro)),
      map((cpf) => cpf.filter((cpf) => cpf == _cpf)),
      map((cpf) => cpf.length > 0)
      //tap(console.log)
    );
  }

  verifyCpf(control: FormControl) {
    return this.alreadyExistCpf(control.value).pipe(
      map((cpf) => (cpf ? { alredyExistsCpf: true } : null))
    );
  }
}
