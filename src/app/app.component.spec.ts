import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterOutletStubComponent } from '../testing/router-stubs';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, RouterOutletStubComponent
      ],
    }).compileComponents();
  }));

  it('should create the app with router-outlet ', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  
});
