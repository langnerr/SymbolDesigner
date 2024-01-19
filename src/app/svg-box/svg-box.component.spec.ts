import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgBoxComponent } from './svg-box.component';

describe('SvgBoxComponent', () => {
  let component: SvgBoxComponent;
  let fixture: ComponentFixture<SvgBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SvgBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
