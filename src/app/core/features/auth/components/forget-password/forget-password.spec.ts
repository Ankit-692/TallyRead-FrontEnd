import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasword } from './forget-pasword';

describe('ForgetPasword', () => {
  let component: ForgetPasword;
  let fixture: ComponentFixture<ForgetPasword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetPasword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetPasword);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
