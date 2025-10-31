/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { Chart } from 'chart.js';
import * as datalabels from 'chartjs-plugin-datalabels';

Chart.register(datalabels);
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));

