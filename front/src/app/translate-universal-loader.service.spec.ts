import { TestBed } from '@angular/core/testing';

import { TranslateUniversalLoaderService } from './translate-universal-loader.service';

describe('TranslateUniversalLoaderService', () => {
  let service: TranslateUniversalLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateUniversalLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
