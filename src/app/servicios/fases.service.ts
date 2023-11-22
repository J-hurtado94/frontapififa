import { Injectable } from '@angular/core';
import { Fase } from '../entidades/fase';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FasesService {

  url: string;
  fase: Fase[]|undefined;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlAPI}fases`;
  }

  public listar(): Observable<Fase[]> {
    let urlT = `${this.url}/listar`;
    return this.http.get<Fase[]>(urlT);

  }
}
