import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { HttpModule } from '@angular/http';
import { UserService } from './_services/user.service';
import { AppComponent } from './app.component';
import { NgForm, NgModel, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { ScraperService } from './_services/scraper.service';
import { StockModule } from './stock/stock.module';
import { StockService } from './_services/stock.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    AuthModule,
    StockModule,
    FormsModule
  ],
  providers: [AuthenticationService, UserService, ScraperService, StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
