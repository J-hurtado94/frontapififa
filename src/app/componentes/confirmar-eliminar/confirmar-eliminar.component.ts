import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


export interface DatosConfirmar {
  titulo: string;
  mensaje: string;
  id: number;
}
@Component({
  selector: 'app-confirmar-eliminar',
  templateUrl: './confirmar-eliminar.component.html',
  styleUrls: ['./confirmar-eliminar.component.css']
})
export class ConfirmarEliminarComponent implements OnInit {

  @Input() public dialogRef = MatDialogRef<ConfirmarEliminarComponent>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: DatosConfirmar
  ) { }

  ngOnInit(): void {
  }

}
