import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentroEditarComponent } from './encuentro-editar.component';

describe('EncuentroEditarComponent', () => {
  let component: EncuentroEditarComponent;
  let fixture: ComponentFixture<EncuentroEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuentroEditarComponent]
    });
    fixture = TestBed.createComponent(EncuentroEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
