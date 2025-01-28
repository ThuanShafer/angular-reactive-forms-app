import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { assignRandomAdjective, assignRandomName, formatTimestamp } from "../helper-utils/helper";

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  name: string = '';
  message: string = '';
  chatData: { name: string; message: string; timestamp: string }[] = [];
  userCount: number = 0;
  isSendDisabled: boolean = true;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.name = this.getOrCreateName();
    this.chatService.connectWebSocket();

    this.chatService.getChatMessages().subscribe((data: any) => {
      if (data.chats) {
        this.chatData = data.chats;
      }
      if (data.userCount !== undefined) {
        this.userCount = data.userCount;
      }
      this.scrollToBottom();
    });
  }

  ngOnDestroy(): void {
    this.chatService.disconnectWebSocket();
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

  sendMessage(): void {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.name, this.message);
      this.message = '';
      this.isSendDisabled = true;
    }
  }

  onMessageInput(): void {
    this.isSendDisabled = this.message.trim().length === 0;
  }

  onMessageKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey && this.message.trim()) {
      this.sendMessage();
      event.preventDefault();
    }
  }

  private scrollToBottom(): void {
    if (this.chatContainer) {
      setTimeout(() => {
        this.chatContainer.nativeElement.scrollTop =
          this.chatContainer.nativeElement.scrollHeight;
      }, 0);
    }
  }

  protected readonly formatTimestamp = formatTimestamp;
}
