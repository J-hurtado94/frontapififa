import { Seleccion } from "./seleccion";

export class Campeonato {


  public id: number;
  public nombre: string;
  public pais: Seleccion;
  public año: number;
  public ano: number;







  constructor(id:number,nombre: string, pais: Seleccion, año: number) {
    this.id = id;
    this.nombre = nombre;
    this.pais = pais;
    this.año = año;
    this.ano = año;



  }

}
