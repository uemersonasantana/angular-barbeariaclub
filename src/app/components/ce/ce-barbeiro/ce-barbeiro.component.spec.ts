import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeBarbeiroComponent } from './ce-barbeiro.component';

describe('CeBarbeiroComponent', () => {
  let component: CeBarbeiroComponent;
  let fixture: ComponentFixture<CeBarbeiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeBarbeiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeBarbeiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
