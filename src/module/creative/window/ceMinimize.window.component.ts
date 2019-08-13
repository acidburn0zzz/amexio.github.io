import { Component, OnInit } from '@angular/core';
import { MinimizeService } from '../../panes/window/minimize-service.service';

@Component({
    selector: 'ce-minimize-window',
    templateUrl: './ceMinimize.window.component.html',
})

export class CeMinimizeWindowComponent implements OnInit {

    arrayData: any[] = [];
    ceMiniButton = false;
    constructor(private _ceService1: MinimizeService) {
    }

    ngOnInit() {
        this._ceService1.currentMessage.subscribe((shareData: any[]) => {
            this.arrayData = shareData;
            this.ceMiniButton = true;
        });
    }

    ceMiniBtnClick(data: any) {
        data.show = true;
        this.ceMiniButton = false;
    }
}
