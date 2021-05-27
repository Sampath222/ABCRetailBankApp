import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersidenavComponent } from './headersidenav.component';

describe('HeadersidenavComponent', () => {
  let component: HeadersidenavComponent;
  let fixture: ComponentFixture<HeadersidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadersidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadersidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
