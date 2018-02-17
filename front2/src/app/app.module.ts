import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service'
import { HttpModule } from '@angular/http';
import { UserService } from './_services/user.service';
import { AppComponent } from './app.component';
import {NgForm, NgModel} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { ScraperService } from './_services/scraper.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    AuthModule
  ],
  providers: [AuthenticationService, UserService, ScraperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
