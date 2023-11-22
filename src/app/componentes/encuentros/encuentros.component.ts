import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Encuentro } from 'src/app/entidades/encuentro';
import { EncuentroService } from 'src/app/servicios/encuentro.service';
import { SeleccionService } from 'src/app/servicios/seleccion.service';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { EncuentroEditarComponent } from '../encuentro-editar/encuentro-editar.component';
import { Seleccion } from 'src/app/entidades/seleccion';
import { Campeonato } from 'src/app/entidades/campeonato';
import { CampeonatoService } from 'src/app/servicios/campeonato.service';
import { Router } from '@angular/router';
import { Fase } from 'src/app/entidades/fase';
import { FasesService } from 'src/app/servicios/fases.service';
import { Estadio } from 'src/app/entidades/estadio';
import { EstadioService } from 'src/app/servicios/estadio.service';
import { ConfirmarEliminarComponent } from '../confirmar-eliminar/confirmar-eliminar.component';
import { ConfirmarEliminarEncuentroComponent } from '../confirmar-eliminar-encuentro/confirmar-eliminar-encuentro.component';



@Component({
  selector: 'app-encuentros',
  templateUrl: './encuentros.component.html',
  styleUrls: ['./encuentros.component.css']
})
export class EncuentrosComponent {

  public textoBusqueda:Date=new Date();
  public encuentros: Encuentro[]=[];
  public encuentrosSinId: Encuentro[]=[];
  public campeonatos: Campeonato[]=[];
  public selecciones :Seleccion[] =[];
  public seleccionesSinfiltro :Seleccion[] =[];
  public fase : Fase[] =[];
  public estadios:Estadio[] =[];




  public columnas = [
    { name: "Primer Equipo", prop: "1" },
    { name: "Segundo Equipo", prop: "2" },
    { name: "Fecha", prop: "3" },
    { name: "Goles Primer equipo", prop: "4" },
    { name: "Goles Segundo equipo", prop: "5" },
  ];

  public modoColumna = ColumnMode;
  public tipoEncuentro = SelectionType;
  public encuentroSeleccionado : Encuentro|undefined;


  constructor(private encuentroService: EncuentroService,
    public dialogService: MatDialog,
    private seleccionService: SeleccionService,
    private campeonatoService: CampeonatoService,
    private faseService: FasesService,
    private estadiosService: EstadioService,

    private router: Router,


  ) {

  }

  ngOnInit(): void {
    this.listar();
    this.listarPaises();
    this.listarCampeonatos();
  this.listarFases()
  this.listarEstadios();
  this.listarEncuentros();
  }

  public listarCampeonatos() {
    this.campeonatoService.listar().subscribe(
      respuesta => {
        this.campeonatos = respuesta;
      }
    );
  }
  public listar() {
    this.encuentroService.listarPartidos().subscribe(
      respuesta => {
        this.encuentros = respuesta;

      }
    );

  }

  public listarEncuentros() {
    this.encuentroService.listarEncuentro().subscribe(
      respuesta => {
        this.encuentrosSinId = respuesta;

      }
    );

  }

  public listarFases() {
    this.faseService.listar().subscribe(
      respuesta => {
        this.fase = respuesta;
      }


      )

    }

    public listarEstadios() {
      this.estadiosService.listar().subscribe(
        respuesta => {
          this.estadios = respuesta;
        }
      );
    }




  public listarPaises() {
    this.seleccionService.listar().subscribe(
      respuesta => {
        this.selecciones = respuesta;
        this.seleccionesSinfiltro = respuesta;
      }
    );
  }

  formatDate(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const formattedDate = this.encuentroService.formatDateToString(event.value);
      this.textoBusqueda = new Date(formattedDate);
    }
  }




  public buscar() {
  if (this.textoBusqueda) {
    this.encuentroService.buscar(this.textoBusqueda).subscribe(
      respuesta => {
        this.encuentros = respuesta;
      }
    );
  } else {
    this.listar();
  }
}



public agregar() {
  const dialogRef = this.dialogService.open(EncuentroEditarComponent, {
    width: '600px',
    height: '500px',
    data: {
      encabezado: "Agregando Encuentro:",
      campeonato: new Campeonato(
        0,
        "",
        new Seleccion(0,"",""),
      0
      ),
      encuentro: new Encuentro(0,
        new Seleccion(0,"",""),
        new Seleccion(0,"",""),
        new Fase(0,""),
        new Campeonato(
          0,
          "",
          new Seleccion(0,"",""),
        0
        ),
        new Estadio(0,""),
        new Date(),
        0,
        0,


      ),

      paises: this.selecciones,
      fases: this.fase,
      campeonatos:this.campeonatos,
      estadios: this.estadios

    }
  });

  dialogRef.afterClosed().subscribe(

    datos => {
      console.log(datos);

      if (datos) {

        this.encuentroService.agregar(datos.encuentro).subscribe(
          respuesta => {
            this.listar();
            window.alert("Los datos del Encuentro fueron agregados");
          }

        );

      }
      console.log(datos);
    }, error => {
      window.alert(error.message)
    }
  );
}
public modificar() {

  if (this.encuentroSeleccionado != null) {

   const dialogRef = this.dialogService.open(EncuentroEditarComponent, {
     width: '600px',
     height: '500px',
     data: {
        encabezado: "Modificar Encuentro:",
        campeonato: new Campeonato(
          0,
          "",
          new Seleccion(0,"",""),
        0
        ),
        encuentro: new Encuentro(
           this.encuentroSeleccionado.id,
          this.encuentroSeleccionado.paisUno ,
          this.encuentroSeleccionado.paisDos,
          this.encuentroSeleccionado.fase,
          this.encuentroSeleccionado.campeonato,
          this.encuentroSeleccionado.estadio,
           this.encuentroSeleccionado.fecha,
          this.encuentroSeleccionado.golesUno,
          this.encuentroSeleccionado.golesDos
        ),

        paises: this.selecciones,
        fases: this.fase,
        campeonatos:this.campeonatos,
        estadios: this.estadios,
        esModificacion : true

     }
   });


   dialogRef.afterClosed().subscribe(
     datos => {
       if (datos) {
         this.encuentroService.modificar(datos.encuentro).subscribe(
           respuesta => {
             this.listar();
             window.alert("Los datos del Encuentro fueron modificados");
           }
         );
       }
     }, error => {
       window.alert(error.message)
     }
   );
  } else {
   window.alert("Debe seleccionar un encuentro");
  }
 }

  public verificarEliminar() {
    if (this.encuentroSeleccionado != null) {
      const dialogRef = this.dialogService.open(ConfirmarEliminarEncuentroComponent, {
        width: '400px',
        height: '300px',
        data: {
          titulo: `Eliminando registro del Encuentro [${this.encuentroSeleccionado.id}]`,
          mensaje: " Está seguro?",
          id: this.encuentroSeleccionado.id

        }
      });

      dialogRef.afterClosed().subscribe(
        datos => {
          if (datos) {
            this.encuentroService.eliminar(datos.id).subscribe(
              respuesta => {
                if (respuesta !=null ) {
                  this.listar();
                  window.alert("Los datos del Encuentro fueron eliminados");


                }
                else {
                  window.alert("No se pudo eliminar el registro del encuentro");
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
      window.alert("Debe seleccionar un encuentro");
    }
  }


  public onActivate(event: any) {

    if (event.type == 'click') {

      var paisUno = this.selecciones.filter( o => o.nombre == event.row[1]);
      this.selecciones = this.seleccionesSinfiltro;
      var paisDos = this.selecciones.filter( o => o.nombre == event.row[2]);
      this.selecciones = this.seleccionesSinfiltro;

      this.encuentroSeleccionado= new Encuentro(event.row[0],
        paisUno[0],
        paisDos[0],
        new Fase(0,""),
        new Campeonato(
          0 ,
          "",
          new Seleccion(0,"",""),
        0
        ),
        new Estadio(0,""),
        event.row[3],
        event.row[4],
        event.row[5]

      );
    }
  }
}
