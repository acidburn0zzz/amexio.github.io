/**
 * Created by pratik on 21/12/17.
 */
import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {IconLoaderService} from "../../services/icon/icon.service";

@Component({
  selector: 'amexio-nav-icon', template: `
    <ng-container *ngIf="iconLoaderService.iconToUse == 'fa'">

      <ng-container *ngIf="customclass != null">
        <i class="{{customclass}}" aria-hidden="true" (click)="onClick.emit($event)"></i>
      </ng-container>
      <ng-container *ngIf="customclass == null">
        <i class="{{getIconClass()}}" aria-hidden="true" (click)="onClick.emit($event)"></i>
      </ng-container>

    </ng-container>

    <ng-container *ngIf="iconLoaderService.iconToUse == 'mat'">

      <ng-container *ngIf="customclass != null">
        <i class="material-icons" (click)="onClick.emit($event)">{{customclass}}</i>
      </ng-container>

      <ng-container *ngIf="customclass == null">
        <i class="material-icons" (click)="onClick.emit($event)">{{getIconClass()}}</i>
      </ng-container>


    </ng-container>
  `
})

export class AmexioNavIconPane implements OnInit {

  @Input() key: string;

  @Input() customclass: string;

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(public iconLoaderService: IconLoaderService) {

  }

  ngOnInit() {
  }

  getIconClass(): string {
    if (this.iconLoaderService.iconMappings != null) {

      let iconObject = this.iconLoaderService.iconMappings.find((obj: any) => obj.component == this.key);
      if (iconObject != null)
        return iconObject[this.iconLoaderService.iconToUse.toString()]; else
        return '';
    }
  }
}

