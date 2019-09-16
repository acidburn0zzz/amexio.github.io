import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'amexio-dial-pad',
    templateUrl: './dialpad.component.html',
})
export class AmexioDialpadComponent implements OnInit {
    btnArray1 = [0, 1, 2, 3, 4];
    btnArray2 = [5, 6, 7, 8, 9];

    type2Arr1 = [1, 2, 3];
    type2Arr2 = [4, 5, 6];
    type2Arr3 = [7, 8, 9];

    type3Arr1 = [7, 8, 9];
    type3Arr2 = [4, 5, 6];
    type3Arr3 = [1, 2, 3];

    textType = '';
    isValid: boolean;
    cls: any;
    randomArr: any[];
    lastDigit = 0;
    @Input() value = '';
    @Input('field-label') label = '';
    @Input() type = '2-rows';
    @Input() random: boolean;
    @Input() password: boolean;
    @Input('max-length') maxlen: number;
    @Input('min-length') minlen: number;
    @Input('button-type') btnType = '';
    iconfeedback = false;

    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
        if (this.password) {
            this.textType = 'password';
        } else {
            this.textType = 'text';
        }

        // set black cls
        this.cls = 'nonecls';

        if (this.minlen || this.maxlen) {
            this.iconfeedback = true;
        }
        this.randomArr = [];
        const num = 0;
        const i = 0;
        const foundDuplicate = false;
        if (this.random && (this.type === '2-rows')) {
            this.generateRandomArray();
            if (this.randomArr.length > 0) {
                this.btnArray1 = [];
                this.btnArray2 = [];
                this.generateTyp1Arr();
            }
        }

        if (this.random && (this.type === 'classic')) {
            // call random function
            this.generateType2Arr();
        }
    }

    generateTyp1Arr() {
        this.randomArr.forEach((element: any, index: any) => {
            if ((index >= 0) && (index < 5)) {
                this.btnArray1.push(element);
            }
            if (index > 4) {
                this.btnArray2.push(element);
            }
        });
    }

    generateType2Arr() {
        this.generateRandomArray();
        if (this.randomArr.length > 0) {
            this.type2Arr1 = [];
            this.type2Arr2 = [];
            this.type2Arr3 = [];
            this.generateTyp2Arry();
        }

    }

    generateTyp2Arry() {
        this.randomArr.forEach((element: any, index: any) => {
            if ((index >= 0) && (index < 3)) {
                this.type2Arr1.push(element);
            }
            if ((index > 2) && (index < 6)) {
                this.type2Arr2.push(element);
            }
            if ((index > 5) && (index < 9)) {
                this.type2Arr3.push(element);
            }
        });
        // initialize last digit
        this.lastDigit = this.randomArr[this.randomArr.length - 1];
    }

    generateRandomArray() {
        let i = 0;
        let num;
        for (i = 0; i < 10; i++) {
            num = this.getRandomNumber();
            this.randomArr.push(num);
        }
    }

    validateMinMax() {
        if (this.iconfeedback && this.value) {
            if (this.minlen && this.maxlen) {
                if (this.value.length >= this.minlen && this.value.length <= this.maxlen) {
                    this.isValid = true;
                } else {
                    this.isValid = false;
                }
            }
            this.validateMin();
            this.validateMax();
        }
    }

    validateMin() {
        if (this.minlen && (this.maxlen === undefined)) {
            if (this.value.length >= this.minlen) {
                this.isValid = true;
            } else {
                this.isValid = false;
            }
        }
    }

    validateMax() {
        if (this.maxlen && (this.minlen === undefined)) {
            if (this.value.length <= this.maxlen) {
                this.isValid = true;
            } else {
                this.isValid = false;
            }
        }
    }

    getBtnData(data: any) {
        this.value = this.value + data;
        this.emitBtnData(data);
        this.valueChange.emit(this.value);
        this.validateMinMax();
        // if isvalid thn set green
        // if isvalid thn set red
        if (this.isValid && this.iconfeedback) {
            this.cls = 'greencls';
        } else if (!this.isValid && this.iconfeedback) {
            this.cls = 'redcls';
        }
    }

    eraseData() {
        let str;
        str = this.value.slice(0, -1);
        this.value = str;
        const object = { data: this.value };
        this.onClick.emit(object);
        this.valueChange.emit(this.value);
        this.validateMinMax();
        // if isvalid thn set green
        // if !isvalid thn set red
        if (this.isValid && this.iconfeedback) {
            this.cls = 'greencls';
        } else if (!this.isValid && this.iconfeedback) {
            this.cls = 'redcls';
        }
        if (this.value.length < 1 && this.iconfeedback) {
            this.isValid = null;
            this.cls = 'redcls';
        }
    }

    emitBtnData(keycode: any) {
        const obj = { key: keycode, data: this.value };
        this.onClick.emit(obj);
    }

    clearData() {
        this.value = '';
        this.isValid = null;
        const object = { data: this.value };
        this.onClick.emit(object);
        this.valueChange.emit(this.value);
        // set black class
        if (this.minlen || this.maxlen || (this.minlen && this.maxlen)) {
            this.isValid = null;
            this.cls = 'redcls';
        } else {
            this.cls = 'nonecls';
        }
    }

    getRandomNumber(): number {
        const myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const num = myArray[Math.floor(Math.random() * myArray.length)];
        let isDuplicate = false;

        if (this.randomArr.length > 0) {
            this.randomArr.forEach((element: any) => {
                if (num === element) {
                    isDuplicate = true;
                }
            });
            if (isDuplicate) {
                return this.getRandomNumber();
            } else if (!isDuplicate) {
                return num;
            }
        } else {
            return num;
        }
    }
}