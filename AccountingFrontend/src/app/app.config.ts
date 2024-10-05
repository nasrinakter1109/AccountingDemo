import { ApplicationConfig, NgModule, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {  BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgSelectModule } from '@ng-select/ng-select';

export const appConfig: ApplicationConfig = {

  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,BrowserModule,NgModule,MatSnackBarModule,NgSelectModule
  ]
};

export const AppConfig = {
  apiUrl: 'https://localhost:44362/api',
  reportApiUrl:'https://localhost:44301/api/reports'
};
