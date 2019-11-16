import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockComponent } from './stock/stock.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { HomepageComponent } from './shared/homepage.component'
import { StockPredictionComponent} from './stock-prediction/stock-prediction.component';


const routes: Routes = [
  { path: 'daily', component: StockComponent },
  { path: 'weekly', component: StockListComponent },
  { path: 'predictions', component: StockPredictionComponent },
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: '**', component: HomepageComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
