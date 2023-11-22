import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Campeonato } from '../entidades/campeonato';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {
  url: string;
  campeonatos: Campeonato[] | undefined;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlAPI}campeonatos`;


  }
  private mapToFrontend(campeonato: Campeonato): Campeonato {
    // Mapear las propiedades del backend al frontend
    return {
      ...campeonato,
      ano: campeonato.año,
    };
  }

  private mapToBackend(campeonato: Campeonato): Campeonato {
    // Mapear las propiedades del frontend al backend
    return {
      ...campeonato,
      año: campeonato.ano,
    };
  }

  public listar(): Observable<Campeonato[]> {
    let urlT = `${this.url}/listar`;
    return this.http.get<Campeonato[]>(urlT);
  }


  public buscar(texto: string): Observable<Campeonato[]> {
    let urlT = `${this.url}/buscar/${texto}`;
    return this.http.get<Campeonato[]>(urlT);
  }
  public agregar(campeonato: Campeonato): Observable<Campeonato> {
    const campeonatoBackend = this.mapToBackend(campeonato);
    let urlT = `${this.url}/crear`;
    return this.http.post<Campeonato>(urlT, campeonatoBackend); //
  }
  public modificar(campeonato: Campeonato): Observable<Campeonato> {
    const campeonatoBackend = this.mapToBackend(campeonato);
    let urlT = `${this.url}/modificar`;
    return this.http.put<Campeonato>(urlT, campeonatoBackend); // return
  }

  public eliminar(id: number): Observable<string> {
    let urlT = `${this.url}/eliminar/${id}`;
    //return this.http.delete<string>(urlT);
    return this.http.delete<{ message: string }>(urlT).pipe(
      map(response => response.message)
    );
  }
}
