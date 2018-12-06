export class AnunciosModel {
  id: string = null;
  type: string = null;
  idAnunciante: string = null;
  anunciante: string = null;
  anuncio: string = null;
  endereco: AnuncioEnderecoModel = null
  destino: AnuncioEnderecoModel = null
  qualificacao: number = null;
  caracteristica: string = null;
  preco: number = null;
  foto: string = null;
  data: Date = null;
}

export class AnuncioEnderecoModel {
  rua: string = null;
  numero: string = null;
  bairro: string = null;
  cep: string = null;
  cidade: string = null;
  estado: string = null;
}