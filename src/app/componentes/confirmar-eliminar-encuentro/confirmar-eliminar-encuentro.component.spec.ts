import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEliminarEncuentroComponent } from './confirmar-eliminar-encuentro.component';

describe('ConfirmarEliminarEncuentroComponent', () => {
  let component: ConfirmarEliminarEncuentroComponent;
  let fixture: ComponentFixture<ConfirmarEliminarEncuentroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarEliminarEncuentroComponent]
    });
    fixture = TestBed.createComponent(ConfirmarEliminarEncuentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
