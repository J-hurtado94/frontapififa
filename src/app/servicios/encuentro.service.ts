import { Injectable } from '@angular/core';
import { Encuentro } from '../entidades/encuentro';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Campeonato } from '../entidades/campeonato';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuentroService {

  url: string;
  encuentros: Encuentro[] | undefined;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlAPI}encuentros`;


  }
  public listarPartidos(): Observable<Encuentro[]> {
    let urlT = `${this.url}/partidos`;
    return this.http.get<Encuentro[]>(urlT);

  }

  public listarEncuentro(): Observable<Encuentro[]> {
    let urlT = `${this.url}/listar`;
    return this.http.get<Encuentro[]>(urlT);
  }
  // public buscar(fecha: Date): Observable<Encuentro[]> {
  //   let urlT = `${this.url}/buscar/${fecha}`;
  //   return this.http.get<Encuentro[]>(urlT);
  // }

  formatDateToString(date: Date): string {
    const year = date.getUTCFullYear();
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2); // Months are 0-based
    let day = ('0'+ (date.getDate()+1)); // Days are 0-based
    let newDay;
    if (day.startsWith('0')){

    //newDay = day.slice(-2);
    newDay = date.getDate()

    console.log(newDay);
    return `${year}-${month}-${newDay}`;

    }
    return `${year}-${month}-${newDay}`;




  }

  public buscar(fecha: Date): Observable<Encuentro[]> {
    const formattedDate = this.formatDateToString(fecha);
    let urlT = `${this.url}/buscar/${formattedDate}`;
    return this.http.get<Encuentro[]>(urlT);
  }

  public agregar(encuentro: Encuentro): Observable<Encuentro> {
    let urlT = `${this.url}/crear`;
    return this.http.post<Encuentro>(urlT, encuentro); //
  }

  public modificar(encuentro: Encuentro): Observable<Encuentro> {
    let urlT = `${this.url}/modificar`;
    return this.http.put<Encuentro>(urlT, encuentro); // return
  }
  public eliminar(id: number): Observable<string> {
    let urlT = `${this.url}/eliminar/${id}`;
    //return this.http.delete<string>(urlT);
    return this.http.delete<{ message: string }>(urlT).pipe(
      map(response => response.message)
    );

}
}
