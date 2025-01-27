import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import {assignRandomAdjective, assignRandomName} from "../helper-utils/helper";

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit {
  name: string = '';
  message: string = '';
  chatData: { name: string; message: string }[] = [];
  isSendDisabled: boolean = true;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.name = this.getOrCreateName();
    this.loadChatData();
  }

  getOrCreateName(): string {
    const storedName = sessionStorage.getItem('chatName');

    if (storedName) {
      return storedName;
    } else {
      const generatedName = `${assignRandomAdjective()} ${assignRandomName()}`;
      sessionStorage.setItem('chatName', generatedName);
      return generatedName;
    }
  }

  loadChatData(): void {
    this.chatService.getChatData().subscribe((data) => {
      this.chatData = data;
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.chatService.addChatMessage(this.name, this.message).subscribe((updatedData) => {
        this.chatData = updatedData;
        this.message = '';
      });
    }
  }

  onMessageInput() {
    this.isSendDisabled = this.message.trim().length === 0;
  }

  onMessageKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.message.trim()) {
      event.preventDefault();
      this.sendMessage();
    }
    this.isSendDisabled = this.message.trim().length === 0;
  }
}
