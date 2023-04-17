import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LuisCoinComponent } from './luis-coin/luis-coin.component';
import { VideoGameStoreComponent } from './video-game-store/video-game-store.component';

@NgModule({
  declarations: [
    AppComponent,
    LuisCoinComponent,
    VideoGameStoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
