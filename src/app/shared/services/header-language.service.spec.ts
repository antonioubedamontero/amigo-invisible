import { TestBed } from '@angular/core/testing';
import { HeaderLanguageService } from './header-language.service';

describe('HeaderLanguageService', () => {
  let service: HeaderLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
