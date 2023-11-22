import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Seleccion } from '../entidades/seleccion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlAPI}paises`;
  }

  public listar(): Observable<Seleccion[]> {
    let urlT = `${this.url}/listar`;
    return this.http.get<Seleccion[]>(urlT);
  }
}
