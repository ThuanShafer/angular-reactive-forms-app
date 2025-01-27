import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
