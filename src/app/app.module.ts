import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsContainerComponent } from './components/charts-container/charts-container.component';
import { ChartsComponent } from './components/charts/charts.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api-service.service';

@NgModule({
  declarations: [
    AppComponent,
    ChartsContainerComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
