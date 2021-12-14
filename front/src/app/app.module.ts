import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BaseComponent } from './base/base.component';
import { AppRoutingModule } from './app-routing.module';


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateUniversalLoaderService } from "./translate-universal-loader.service";
import { FormsModule } from '@angular/forms';
import { InsertComponent } from './insert/insert.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { SelectComponent } from './select/select.component';



@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    InsertComponent,
    UpdateComponent,
    DeleteComponent,
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TranslateModule.forRoot({
        defaultLanguage: "en",
        loader: {
            provide: TranslateLoader,
            useClass: TranslateUniversalLoaderService
          }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
