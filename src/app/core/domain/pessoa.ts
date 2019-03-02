import { Endereco } from './endereco';
import { Contato } from './contato';

export class Pessoa {
  codigo: number;
  nome: string;
  ativo = true;
  endereco = new Endereco();
  contatos = new Array<Contato>();
}
