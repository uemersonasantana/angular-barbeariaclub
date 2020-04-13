import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeUsuarioComponent } from './ce-usuario.component';

describe('CeUsuarioComponent', () => {
  let component: CeUsuarioComponent;
  let fixture: ComponentFixture<CeUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
