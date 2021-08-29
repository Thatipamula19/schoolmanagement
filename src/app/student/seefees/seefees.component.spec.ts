import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeefeesComponent } from './seefees.component';

describe('SeefeesComponent', () => {
  let component: SeefeesComponent;
  let fixture: ComponentFixture<SeefeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeefeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeefeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
