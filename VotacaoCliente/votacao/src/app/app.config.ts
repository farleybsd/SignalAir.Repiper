import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'; // ✅ Import necessário

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(NgbModule, HttpClientModule), // ✅ Adicionando HttpClientModule
    provideRouter(routes)
  ]
};
