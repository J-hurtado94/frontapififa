import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Grupo } from 'src/app/entidades/grupo';
import { GrupoService } from 'src/app/servicios/grupo.service';
import { GrupoEditarComponent } from '../grupo-editar/grupo-editar.component';
import { Campeonato } from 'src/app/entidades/campeonato';
import { Seleccion } from 'src/app/entidades/seleccion';
import { SeleccionService } from 'src/app/servicios/seleccion.service';
import { CampeonatoService } from 'src/app/servicios/campeonato.service';
import { ConfirmarEliminarComponent } from '../confirmar-eliminar/confirmar-eliminar.component';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {


  constructor(public dialogService: MatDialog,private grupoServicio:GrupoService,private seleccionService: SeleccionService,
    private campeonatoService: CampeonatoService){}

  public textoBusqueda: string = ""
  public grupos: Grupo[] = []
  public modoColumna = ColumnMode;
  public tipoGrupo = SelectionType;
  public selecciones :Seleccion[] =[];
  public campeonatos: Campeonato[]=[];
  public campeonato: Campeonato | undefined;
  public grupoSeleccionado: Grupo | undefined;
  public columnas = [
    { name: "Campeonato", prop: "campeonato.nombre" },
   // { name: "Pais", prop: "campeonato.pais.nombre" },
  //  { name: "Año", prop: "campeonato.ano" },
    { name: "Grupo", prop: "nombre" },

  ];

  ngOnInit(): void {
    this.listarGrupos();
    this.listarPaises()
    this.listar()
    this.listarCampeonatos()
  }

  public listarCampeonatos() {
    this.campeonatoService.listar().subscribe(
      respuesta => {
        this.campeonatos = respuesta;
      }
    );
  }
  public listarGrupos(){
    this.grupoServicio.listarGrupo().subscribe(respuesta => {
      this.grupos = respuesta;

    })
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

  public agregar() {
    const dialogRef = this.dialogService.open(GrupoEditarComponent, {
      width: '600px',
      height: '500px',
      data: {
        encabezado: "Agregando grupo:",

        grupo: new Grupo(0,new Campeonato(
          0,
          "",
          new Seleccion(0,"",""),
          0,

        ),""
        ),
          paises: this.selecciones,
          campeonatos:this.campeonatos,




        }
    });


    dialogRef.afterClosed().subscribe(
      datos => {
       console.log(datos)
        if (datos) {
          console.log(datos)
          this.grupoServicio.agregar(datos.grupo).subscribe(
            respuesta => {
              this.listarGrupos();
              window.alert("Los datos del grupo fueron agregados");
            }
          );
        }
      }, error => {
        window.alert(error.message)
      }
    );
  }
  public modificar() {
    if (this.grupoSeleccionado != null) {
      const dialogRef = this.dialogService.open(GrupoEditarComponent, {
        width: '600px',
        height: '500px',
        data: {
          encabezado: `Editando datos del grupo [${this.grupoSeleccionado.nombre}]`,
          campeonatos:this.campeonatos,
          grupo: this.grupoSeleccionado,
          paises: this.selecciones,
          //group: this.grupoSeleccionado.nombre

        }
      });

      dialogRef.afterClosed().subscribe(
        datos => {
          if (datos) {
            this.grupoServicio.modificar(datos.grupo).subscribe(
              respuesta => {
                this.listarGrupos();
                window.alert("Los datos del grupo fueron modificados");
              }
            );
          }
        }, error => {
          window.alert(error.message)
        }
      );
    }
    else {
      window.alert("Debe seleccionar un grupo");
    }
  }
  public buscar() {
    if (this.textoBusqueda.length > 0) {
      this.grupoServicio.buscar(this.textoBusqueda).subscribe(
        respuesta => {
          this.grupos = respuesta;
        }
      );
    }
    else {
      this.listarGrupos();
    }
  }
  public verificarEliminar() {
    if (this.grupoSeleccionado != null) {
      const dialogRef = this.dialogService.open(ConfirmarEliminarComponent, {
        width: '400px',
        height: '300px',
        data: {
          titulo: `Eliminando registro del grupo [${this.grupoSeleccionado.nombre}]`,
          mensaje: " Está seguro?",
          id: this.grupoSeleccionado.id,
        }
      });

      dialogRef.afterClosed().subscribe(
        datos => {
          if (datos) {
            this.grupoServicio.eliminar(datos.id).subscribe(
              respuesta => {
                if (respuesta !=null ) {
                  this.listarGrupos();
                  window.alert("Los datos del grupo fueron eliminados");


                }
                else {
                  window.alert("No se pudo eliminar el registro del grupo");
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
      window.alert("Debe seleccionar un grupo");
    }
  }





  public onActivate(event: any) {

    if (event.type == 'click') {
      this.grupoSeleccionado = event.row;
    }
  }
}
