import { Component, OnInit } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Campeonato } from 'src/app/entidades/campeonato';
import { Seleccion } from 'src/app/entidades/seleccion';
import { CampeonatoService } from 'src/app/servicios/campeonato.service';
import { CampeonatoEditarComponent } from '../campeonato-editar/campeonato-editar.component';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionService } from 'src/app/servicios/seleccion.service';
import { ConfirmarEliminarComponent } from '../confirmar-eliminar/confirmar-eliminar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campeonato',
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.css']
})
export class CampeonatoComponent implements OnInit {

  public textoBusqueda:string = "";
  public campeonatos: Campeonato[]=[];
  public selecciones :Seleccion[] =[];


  public columnas = [
    { name: "Nombre Torneo", prop: "nombre" },
    { name: "País", prop: "pais.nombre" },
    { name: "Año", prop: "año" },
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;
  public campeonatoSeleccionado: Campeonato | undefined;

  constructor(private campeonatoService: CampeonatoService,
    private seleccionService: SeleccionService,
    public dialogService: MatDialog,
    private router: Router,


  ) {

  }

  ngOnInit(): void {
    this.listar();
    this.listarPaises();
  }

  public listar() {
    this.campeonatoService.listar().subscribe(
      respuesta => {
        this.campeonatos = respuesta;
      }
    );
  }
  public listarPaises() {
    this.seleccionService.listar().subscribe(
      respuesta => {
        this.selecciones = respuesta;
      }
    );
  }
  public buscar() {
    if (this.textoBusqueda.length > 0) {
      this.campeonatoService.buscar(this.textoBusqueda).subscribe(
        respuesta => {
          this.campeonatos = respuesta;
        }
      );
    }
    else {
      this.listar();
    }
  }

  public agregar() {
    const dialogRef = this.dialogService.open(CampeonatoEditarComponent, {
      width: '600px',
      height: '500px',
      data: {
        encabezado: "Agregando Campeonato:",
        campeonato: new Campeonato(
          0,
          "",
          new Seleccion(0,"",""),
        0
        ),
        paises: this.selecciones
      }
    });

    dialogRef.afterClosed().subscribe(
      datos => {
        console.log(datos)
        if (datos) {
          console.log(datos.campeonato.ano)
          this.campeonatoService.agregar(datos.campeonato).subscribe(
            respuesta => {
              this.listar();
              window.alert("Los datos del campeonato fueron agregados");
            }
          );
        }
      }, error => {
        window.alert(error.message)
      }
    );
  }

  public modificar() {
    if (this.campeonatoSeleccionado != null) {
      const dialogRef = this.dialogService.open(CampeonatoEditarComponent, {
        width: '600px',
        height: '500px',
        data: {
          encabezado: `Editando datos del campeonato [${this.campeonatoSeleccionado.nombre}]`,
          campeonato: this.campeonatoSeleccionado,
          paises: this.selecciones,
          ano: this.campeonatoSeleccionado.ano

        }
      });

      dialogRef.afterClosed().subscribe(
        datos => {
          if (datos) {
            this.campeonatoService.modificar(datos.campeonato).subscribe(
              respuesta => {
                this.listar();
                window.alert("Los datos del campeonato fueron modificados");
              }
            );
          }
        }, error => {
          window.alert(error.message)
        }
      );
    }
    else {
      window.alert("Debe seleccionar un país");
    }
  }
  public verificarEliminar() {
    if (this.campeonatoSeleccionado != null) {
      const dialogRef = this.dialogService.open(ConfirmarEliminarComponent, {
        width: '400px',
        height: '300px',
        data: {
          titulo: `Eliminando registro del campeonato [${this.campeonatoSeleccionado.nombre}]`,
          mensaje: " Está seguro?",
          id: this.campeonatoSeleccionado.id,
        }
      });

      dialogRef.afterClosed().subscribe(
        datos => {
          if (datos) {
            this.campeonatoService.eliminar(datos.id).subscribe(
              respuesta => {
                if (respuesta !=null ) {
                  this.listar();
                  window.alert("Los datos del campeonato fueron eliminados");


                }
                else {
                  window.alert("No se pudo eliminar el registro del campeonato");
                }
              }
            );


          }
        }, error => {
          window.alert(error.message)
        }
      );

    }
    else {
      window.alert("Debe seleccionar un campeonato");
    }
  }

  public onActivate(event: any) {
    if (event.type == 'click') {

      this.campeonatoSeleccionado = event.row;


    }
  }

}
