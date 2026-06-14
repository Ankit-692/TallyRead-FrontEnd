import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedUserList } from './shared-user-list';

describe('SharedUserList', () => {
  let component: SharedUserList;
  let fixture: ComponentFixture<SharedUserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUserList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedUserList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
