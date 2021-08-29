import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdiminLoginComponent } from './adimin-login.component';

describe('AdiminLoginComponent', () => {
  let component: AdiminLoginComponent;
  let fixture: ComponentFixture<AdiminLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdiminLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdiminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
