import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GridModule, PagerModule, PageService, SortService } from '@syncfusion/ej2-angular-grids';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GridModule, PagerModule
  ],
  providers: [PageService, SortService],
  bootstrap: [AppComponent]
})
export class AppModule { }
