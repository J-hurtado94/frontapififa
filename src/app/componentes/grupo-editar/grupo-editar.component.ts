import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Campeonato } from 'src/app/entidades/campeonato';
import { Grupo } from 'src/app/entidades/grupo';
import { Seleccion } from 'src/app/entidades/seleccion';
export interface DatosGrupo{
  encabezado:string;
  paises: Seleccion[];
  campeonatos: Campeonato[];
  grupo:Grupo;
  grupos:Grupo[];
}
@Component({
  selector: 'app-grupo-editar',
  templateUrl: './grupo-editar.component.html',
  styleUrls: ['./grupo-editar.component.css']
})
export class GrupoEditarComponent implements OnInit{
  @Input() public dialogRef = MatDialogRef<GrupoEditarComponent>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: DatosGrupo
  ) { }

  ngOnInit(): void {

  }

  onPaisSeleccionadoChange(event: any) {
    // Obtener el objeto de país seleccionado
    const paisSeleccionado = this.datos.paises.find(
      (pais) => pais.id === event.value
    );

    // Actualizar el país del grupo en los datos
    this.datos.grupo.campeonato.pais = paisSeleccionado || new Seleccion(0, '', '');
  }

}
