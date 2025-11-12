import { ApplicationConfig, importProvidersFrom, APP_INITIALIZER, Provider } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { AuthService } from './shared/service/auth.service';
import { environment } from '../environments/environment';

// ✅ 1. App initialization (AuthService)
export function initApp(authService: AuthService) {
  return () => authService.init();
}

// ✅ 2. Runtime environment detector
export function getApiUrl(): string {
  const host = window.location.hostname;

  // Detect runtime host
  if (
    host.includes('localhost') ||
    host.includes('127.0.0.1') ||
    host.includes('develop') ||
    host.includes('dev')
  ) {
    return 'https://dev-api-pos.pioneersolve.id/api';
  }

  // Fallback to environment
  return environment.apiUrl || 'https://api.pioneersolve.id/api';
}

// ✅ 3. Provide runtime config globally
export const API_URL_PROVIDER: Provider = {
  provide: 'API_URL',
  useFactory: getApiUrl
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions()
    ),
    importProvidersFrom(HttpClientModule, SidebarModule, DropdownModule),
    IconSetService,
    provideAnimationsAsync(),

    // ✅ Runtime API config
    API_URL_PROVIDER,

    // ✅ AuthService + APP_INITIALIZER
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AuthService],
      multi: true
    }
  ]
};
