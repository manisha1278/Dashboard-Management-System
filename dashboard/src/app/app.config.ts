import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import{provideHttpClient, withInterceptors} from '@angular/common/http';
import { authInterceptor } from './interceptors/auth-interceptor';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideCharts(withDefaultRegisterables()),

    provideHttpClient(
      withInterceptors([authInterceptor])
    ),

    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};
  


