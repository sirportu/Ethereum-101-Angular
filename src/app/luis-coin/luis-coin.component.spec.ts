import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuisCoinComponent } from './luis-coin.component';

describe('LuisCoinComponent', () => {
  let component: LuisCoinComponent;
  let fixture: ComponentFixture<LuisCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuisCoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuisCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
