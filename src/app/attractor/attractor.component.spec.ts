import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractorComponent } from './attractor.component';

describe('AttractorComponent', () => {
  let component: AttractorComponent;
  let fixture: ComponentFixture<AttractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
