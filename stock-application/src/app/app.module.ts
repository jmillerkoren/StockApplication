import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockComponent } from './stock/stock.component';
import { ChartComponent } from './shared/chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { StockListComponent } from './stock-list/stock-list.component'
import { LineChartComponent } from './shared/line-chart/line-chart.component'
import { HomepageComponent } from './shared/homepage.component'

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    ChartComponent,
    StockListComponent,
    LineChartComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
