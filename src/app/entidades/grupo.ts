import { Campeonato } from "./campeonato";

export class Grupo{
  public id:number;
  public campeonato:Campeonato;
  public nombre:string;

  constructor(id:number,campeonato:Campeonato,nombre:string){
    this.id = id;
    this.campeonato = campeonato;
    this.nombre = nombre;
  }
}
