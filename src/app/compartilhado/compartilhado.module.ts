import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageModule } from 'primeng/components/message/message';

import { MensagemComponent } from './mensagem/mensagem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';

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
