import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campeonato } from 'src/app/entidades/campeonato';
import { Seleccion } from 'src/app/entidades/seleccion';

export interface DatosCampeonato {
  encabezado: string;
  campeonato: Campeonato;
  paises: Seleccion[];
  campeonatos: Campeonato[];
}
@Component({
  selector: 'app-campeonato-editar',
  templateUrl: './campeonato-editar.component.html',
  styleUrls: ['./campeonato-editar.component.css']
})
export class CampeonatoEditarComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: DatosCampeonato
  ) { }

  ngOnInit(): void {

  }

}
