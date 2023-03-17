import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEstoqueComponent } from './consulta-estoque.component';

describe('ConsultaEstoqueComponent', () => {
  let component: ConsultaEstoqueComponent;
  let fixture: ComponentFixture<ConsultaEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaEstoqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
