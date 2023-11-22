import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Encuentro } from 'src/app/entidades/encuentro';
import { Campeonato } from 'src/app/entidades/campeonato';
import { Seleccion } from 'src/app/entidades/seleccion';
import { Fase } from 'src/app/entidades/fase';
import { Estadio } from 'src/app/entidades/estadio';

export interface DatosEncuentro {
  encabezado: string;
  // encuentroUno: Encuentro;
  // encuentroDos: Encuentro;
  encuentro: Encuentro;
  campeonato: Campeonato;
  campeonatoUno: Campeonato;
  campeonatoDos: Campeonato;
  paises: Seleccion[];
  fases: Fase[];
  campeonatos: Campeonato[];
  estadios: Estadio[];
  fecha:Date;
  golesUno:number;
  golesDos:number;


  paisUno: Seleccion;
  paisDos:Seleccion;
  esModificacion: boolean;
  // fecha: Date,
  // golesUno:number,
  // golesDOs:number,
  // encabezado: string;
  // campeonato: Campeonato;
  // paises: Seleccion[];


}
@Component({
  selector: 'app-encuentro-editar',
  templateUrl: './encuentro-editar.component.html',
  styleUrls: ['./encuentro-editar.component.css']
})
export class EncuentroEditarComponent implements OnInit {
  encuentros: any;
  esmodificacion: boolean =false


  constructor(


    @Inject(MAT_DIALOG_DATA) public datos: DatosEncuentro
  ) { }



  ngOnInit(): void {
    // Ensure datos.encuentro is defined

  }



// updateCampeonato(event: { value: number; }) {
//   this.datos.encuentro.campeonato.id = event.value;
//  }




}
