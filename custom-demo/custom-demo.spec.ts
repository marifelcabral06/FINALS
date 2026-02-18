import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDemo } from './custom-demo';

describe('CustomDemo', () => {
  let component: CustomDemo;
  let fixture: ComponentFixture<CustomDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
