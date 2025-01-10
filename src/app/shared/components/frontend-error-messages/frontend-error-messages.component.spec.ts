import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendErrorMessagesComponent } from './frontend-error-messages.component';

describe('FrontendErrorMessagesComponent', () => {
  let component: FrontendErrorMessagesComponent;
  let fixture: ComponentFixture<FrontendErrorMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendErrorMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontendErrorMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
