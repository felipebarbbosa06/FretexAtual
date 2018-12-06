export class UserModel {
  id: string = null;
  nome: string = null;
  telefone: string = null;
  email: string = null;
  endereco: UserEnderecoModel = null;
  foto: string = null;
  fretista: boolean = false;
}

export class UserEnderecoModel {
  rua: string = null;
  numero: string = null;
  bairro: string = null;
  cep: string = null;
  cidade: string = null;
  estado: string = null;  
}