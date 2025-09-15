import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustompercentagePipe } from "../custompercentage-pipe";

export enum statusButton {
  Play = 'Play',
  Pause = 'Pause',
  Resume = 'Resume'
}

@Component({
  selector: 'app-timer',
  templateUrl: './timer.html',
  imports: [
    CommonModule,
    FormsModule,
    CustompercentagePipe
  ],
  styleUrl: './timer.css'
})
export class Timer implements OnInit {
  minutes?: number = 0;
  seconds?: number = 0;
  enterTime?: any;
  setingInterval: any;
  disabled: boolean = false;
  disableStart: boolean = true;
  statusButton: string = '';
  messageBox: string = 'زمان را وارد کنید';
  titleBTN: string = '';

  ngOnInit(): void {
    this.disabled = false;
    this.statusButton = statusButton.Play;
    this.titleBTN = 'شروع';
  }

  sss(event: Event) {
    const data = Number(event)
    if (data && data > 0) {
      this.disableStart = false;
    } else {
      this.disableStart = true;
    }

  }
  startTimer() {
    if (this.statusButton === statusButton.Play) {
      this.disabled = true
      const statusBTN = this.statusButton;
      if (this.enterTime > 0 && statusBTN === statusButton.Play) {
        this.statusButton = statusButton.Pause;
        this.titleBTN = 'وقفه';
        this.seconds = 59;
        this.minutes = this.enterTime - 1;
        this.setingInterval = setInterval(() => {
          if (this.seconds !== undefined && this.seconds > 0 && this.minutes !== undefined && this.minutes >= 0) {
            this.seconds--;
            if (this.seconds === 0 && this.minutes > 0) {
              this.minutes--;
              this.seconds = 59;
            }
          } else {
            clearInterval(this.setingInterval);
            this.messageBox = 'زمان به پایان رسید';
            this.statusButton = statusButton.Play;
            this.titleBTN = 'شروع';
          }
        }, 1000);
        this.statusButton = statusButton.Pause;
        this.titleBTN = 'وقفه';
      }
      else if (this.enterTime > 0 && statusBTN !== statusButton.Play) {
      }
    }
    else if (this.statusButton === statusButton.Pause) {
      this.statusButton = statusButton.Resume;
      this.titleBTN = 'ادامه';
      clearInterval(this.setingInterval);
    }
    else if (this.statusButton === statusButton.Resume) {
      this.statusButton = statusButton.Pause;
      this.titleBTN = 'وقفه';
      this.setingInterval = setInterval(() => {
        if (this.seconds !== undefined && this.seconds > 0 && this.minutes !== undefined && this.minutes >= 0) {
          this.seconds--;
          if (this.seconds === 0 && this.minutes > 0) {
            this.minutes--;
            this.seconds = 59;
          } else if (this.seconds === 0 && this.minutes === 0) {
            clearInterval(this.setingInterval);
            this.messageBox = 'زمان به پایان رسید';
            this.statusButton = statusButton.Play;
            this.titleBTN = 'شروع';
            this.disabled = false;
          }
        } else {
          clearInterval(this.setingInterval);
          this.messageBox = 'زمان به پایان رسید';
          this.statusButton = statusButton.Play;
          this.titleBTN = 'شروع';
          this.disabled = false;
        }
      }, 1000);
    }
  }
  clearTimer() {
    clearInterval(this.setingInterval);
    this.disableStart = false;
    this.minutes = 0;
    this.seconds = 0;
    this.disabled = false;
    this.statusButton = statusButton.Play;
    this.titleBTN = 'شروع';
    this.messageBox = 'زمان را وارد کنید';
  }
}

