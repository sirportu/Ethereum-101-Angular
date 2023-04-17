import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LuisCoinComponent } from './luis-coin/luis-coin.component';
import { VideoGameStoreComponent } from './video-game-store/video-game-store.component';
import { NftConnectComponent } from './nft-connect/nft-connect.component';

const routes: Routes = [
  { path: 'video-game-store',
    component: VideoGameStoreComponent,
  },
  { path: 'luis-coin',
    component: LuisCoinComponent,
  },
  { path: 'nft-connection',
    component: NftConnectComponent,
  },
  { path: '**', redirectTo: 'video-game-store' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
