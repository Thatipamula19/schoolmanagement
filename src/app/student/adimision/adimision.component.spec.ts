import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdimisionComponent } from './adimision.component';

describe('AdimisionComponent', () => {
  let component: AdimisionComponent;
  let fixture: ComponentFixture<AdimisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdimisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdimisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
