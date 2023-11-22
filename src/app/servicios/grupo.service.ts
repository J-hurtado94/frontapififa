import { Injectable } from '@angular/core';
import { Grupo } from '../entidades/grupo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  url: string;
  grupos: Grupo[] | undefined;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlAPI}Grupos`;


  }

  public listarGrupo(): Observable<Grupo[]> {
    let urlT = `${this.url}/listar`;
    return this.http.get<Grupo[]>(urlT);
  }

  public buscar(texto: string): Observable<Grupo[]> {
    let urlT = `${this.url}/buscar/${texto}`;
    return this.http.get<Grupo[]>(urlT);
  }

  public agregar(grupo: Grupo): Observable<Grupo> {
    let urlT = `${this.url}/crear`;
    return this.http.post<Grupo>(urlT, grupo); //
  }

  public modificar(grupo: Grupo): Observable<Grupo> {
    let urlT = `${this.url}/modificar`;
    return this.http.put<Grupo>(urlT, grupo); // return
  }

  public eliminar(id: number): Observable<string> {
    let urlT = `${this.url}/eliminar/${id}`;
    return this.http.delete<{ message: string }>(urlT).pipe(
      map(response => response.message)
    );
  }
}
