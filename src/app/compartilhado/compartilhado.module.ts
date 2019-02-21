import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';

import { MensagemComponent } from './mensagem/mensagem.component';


@NgModule({
  imports: [
    CommonModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TableModule
  ],
  declarations: [MensagemComponent],
  exports: [MensagemComponent]
})
export class CompartilhadoModule { }
