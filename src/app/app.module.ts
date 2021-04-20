import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './layout/main/main.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';


const AUTH_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule
  ],
  providers: [AUTH_INTERCEPTOR_PROVIDER],
  bootstrap: [MainComponent]
})
export class AppModule { }
