import { Injectable } from '@angular/core';
import { Estadio } from '../entidades/estadio';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadioService {

  url: string;
  estadio: Estadio[]|undefined;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlAPI}estadios`;
  }

  public listar(): Observable<Estadio[]> {
    let urlT = `${this.url}/listar`;
    return this.http.get<Estadio[]>(urlT);

  }
}
