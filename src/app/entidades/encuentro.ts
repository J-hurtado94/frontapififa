import { Campeonato } from "./campeonato";
import { Estadio } from "./estadio";
import { Fase } from "./fase";
import { Seleccion } from "./seleccion";

export class Encuentro{

  public id: number;
  public paisUno: Seleccion;
  public paisDos: Seleccion;
  public fase: Fase;
  public campeonato:Campeonato;
  public estadio:Estadio;
  public fecha: Date;
  public golesUno: number;
  public golesDos: number;




  constructor(id: number, paisUno: Seleccion,paisDos:Seleccion, fase: Fase,campeonato: Campeonato,estadio:Estadio,fecha: Date, golesUno: number, golesDos: number) {
    this.id = id;
    this.paisUno = paisUno;
    this.paisDos = paisDos;
    this.fase=fase;
    this.campeonato=campeonato;
    this.estadio=estadio;
    this.fecha = fecha;
    this.golesUno = golesUno;
    this.golesDos = golesDos;


  }
}
