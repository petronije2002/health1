import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordressetComponent } from './passwordresset.component';

describe('PasswordressetComponent', () => {
  let component: PasswordressetComponent;
  let fixture: ComponentFixture<PasswordressetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordressetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordressetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
