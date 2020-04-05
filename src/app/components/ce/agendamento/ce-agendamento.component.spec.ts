import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeAgendamentoComponent } from './ce-agendamento.component';

describe('CeAgendamentoComponent', () => {
  let component: CeAgendamentoComponent;
  let fixture: ComponentFixture<CeAgendamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeAgendamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
