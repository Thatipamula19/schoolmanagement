import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeresultComponent } from './seeresult.component';

describe('SeeresultComponent', () => {
  let component: SeeresultComponent;
  let fixture: ComponentFixture<SeeresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeresultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
