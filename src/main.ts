import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';

// Registering Syncfusion license key
registerLicense('<YOUR LICENSE KEY>');
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
