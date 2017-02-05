import { FormcomponentsPage } from './../../../../e2e/app.po';
import { ElementRef } from '@angular/core';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import * as $ from 'jquery';
import { DatepickerComponent } from './datepicker.component';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('datepicker input should exists', () => {
    expect(component.datepickerinput).toBeTruthy();
  });

  it('datepicker should be ElementRef type', () => {
     expect(component.datepickerinput instanceof ElementRef).toBeTruthy();
  });

  it('datepicker set value', () => {
    let date = new Date();
    component.registerOnChange((value) => {
      console.log(value);
      expect(value).toEqual(date);
    });
    component.writeValue(date);
    fixture.detectChanges();
    expect(component.value).toEqual(date);
  });
});
