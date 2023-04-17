import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGameStoreComponent } from './video-game-store.component';

describe('VideoGameStoreComponent', () => {
  let component: VideoGameStoreComponent;
  let fixture: ComponentFixture<VideoGameStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoGameStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoGameStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
