export class FrotaUserModel {
  id: string = null;
  idUsuario: string = null;
  frota: ArrayFrotaUserModel[];  
}

export class ArrayFrotaUserModel {
  tipo: string = null;
  volume: number = null;
  marca: string = null;
  modelo: string = null;
  ano: number = null;
  caracteristica: string = null;  
}