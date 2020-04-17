import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeClienteComponent } from './ce-cliente.component';

describe('CeClienteComponent', () => {
  let component: CeClienteComponent;
  let fixture: ComponentFixture<CeClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
