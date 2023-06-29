import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaIngresoComponent } from './venta-ingreso.component';

describe('VentaIngresoComponent', () => {
  let component: VentaIngresoComponent;
  let fixture: ComponentFixture<VentaIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaIngresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
