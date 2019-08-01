/*
 * Copyright [2019] [Metamagic]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by pratik on 18/12/17.
 */

import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';

@Component({
  selector: 'amexio-header',
  template: `

  <span  style="flex: auto;" #contentWrapper>
  <ng-content></ng-content>
  </span>

  <span>
  <i  *ngIf="minimize" class="fa fa-window-minimize" (click)="onMinimizeClick($event)"
  style = "cursor: pointer"></i>

  <amexio-c-icon style = "padding-left: 10px" class="cursor-style" *ngIf="(isFullWindow && maximize )"
  [key]="'window_maximize'" (onClick)="sizeChange()">
  </amexio-c-icon>
  <amexio-c-icon style = "padding-left: 10px" class="cursor-style" *ngIf="(!isFullWindow && maximize )"
  [key]="'window_restore'" (click)="sizeChange()"></amexio-c-icon>

  <amexio-c-icon class="cursor-style"
  style = "padding-left: 10px"
  *ngIf="closeable" [key]="'window_close'" (onClick)="onCloseClick()">
  </amexio-c-icon>

  </span>
  `,
  styles: [
    `
  .cursor-style {
  cursor:pointer;
  }
  `,
  ],
})

export class AmexioHeaderComponent implements AfterViewInit, OnInit {

  @HostBinding('class.modal-card-header') get c1() { return this.aComponent; }
  @HostBinding('class.modal-window-header') get c2() { return this.aComponent1; }

  @HostBinding('style.justify-content') jstyfy = 'space-between';

  @HostBinding('style.background') private background = '';

  @ViewChild('contentWrapper') content: ElementRef;

  @HostBinding('style.color') color = '';
  @Input() padding: string;

  @Output() minimizeWindow: any = new EventEmitter<any>();

  minimize = false;

  closeable = false;

  maximize = false;

  isFullWindow = false;

  closeableBehaiour = new BehaviorSubject(false);

  maximizeBehaiour = new BehaviorSubject(false);

  aComponent: string;
  aComponent1: string;

  textName: any;
  constructor() {

  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.textName = this.content.nativeElement.textContent;
  }

  setMaximizeData(maximize: boolean, isFullWindow: boolean) {
    this.maximize = maximize;
    this.isFullWindow = isFullWindow;
    this.maximizeBehaiour.next(this.isFullWindow);
  }

  setMaterialDesignStatus(materialDesign: boolean) {
    if (materialDesign) {
      this.background = 'white';
      this.color = 'black';
    }
  }

  sizeChange() {
    this.isFullWindow = !this.isFullWindow;
    this.maximizeBehaiour.next(this.isFullWindow);
  }

  onCloseClick() {
    this.closeableBehaiour.next(false);
  }

  onMinimizeClick() {
    this.closeableBehaiour.next(false);
    this.minimizeWindow.emit(this, this.textName);
  }
}
