import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftConnectComponent } from './nft-connect.component';

describe('NftConnectComponent', () => {
  let component: NftConnectComponent;
  let fixture: ComponentFixture<NftConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftConnectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NftConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
