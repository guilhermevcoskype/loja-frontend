import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ULancamentosComponent } from './u-lancamentos.component';

describe('ULancamentosComponent', () => {
  let component: ULancamentosComponent;
  let fixture: ComponentFixture<ULancamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ULancamentosComponent]
});
    fixture = TestBed.createComponent(ULancamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
