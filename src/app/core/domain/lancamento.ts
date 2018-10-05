import { Pessoa } from './pessoa';
import { Categoria } from './categoria';

export class Lancamento {
  codigo: number;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  tipo = 'RECEITA';
  pessoa = new Pessoa();
  categoria = new Categoria();
}
