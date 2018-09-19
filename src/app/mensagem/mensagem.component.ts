import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mensagem',
  template: `
  <div>
    <p-message severity="error" text="{{ texto }}" *ngIf="temErro()" ></p-message>
  </div>
  `,
  styles: []
})
export class MensagemComponent implements OnInit {

  @Input() erro: string;
  @Input() texto: string;
  @Input() control: FormControl;

  constructor() { }

  temErro(): boolean {
    return this.control.hasError(this.erro) && this.control.dirty;
  }
  ngOnInit() {
  }

}
