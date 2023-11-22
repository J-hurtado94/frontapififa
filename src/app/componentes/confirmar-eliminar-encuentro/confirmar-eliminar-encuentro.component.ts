import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from '../confirmar-eliminar/confirmar-eliminar.component';
import { Estadio } from 'src/app/entidades/estadio';

export interface DatosConfirmarEncuentro {
  titulo: string;
  mensaje: string;
  id: number;

}
@Component({
  selector: 'app-confirmar-eliminar-encuentro',
  templateUrl: './confirmar-eliminar-encuentro.component.html',
  styleUrls: ['./confirmar-eliminar-encuentro.component.css']
})
export class ConfirmarEliminarEncuentroComponent implements OnInit {

  @Input() public dialogRef = MatDialogRef<ConfirmarEliminarEncuentroComponent>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: DatosConfirmarEncuentro
  ) { }

  ngOnInit(): void {

  }
}
