import { TestBed } from '@angular/core/testing';

import { CanvasEventService } from './canvas-event.service';

describe('CanvasEventService', () => {
  let service: CanvasEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
