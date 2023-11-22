import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampeonatoEditarComponent } from './campeonato-editar.component';

describe('CampeonatoEditarComponent', () => {
  let component: CampeonatoEditarComponent;
  let fixture: ComponentFixture<CampeonatoEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampeonatoEditarComponent]
    });
    fixture = TestBed.createComponent(CampeonatoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
