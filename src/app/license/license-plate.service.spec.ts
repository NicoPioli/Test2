import { TestBed } from '@angular/core/testing';
import { LicensePlateService } from './license-plate.service';

describe('LicensePlateService', () => {
  let service: LicensePlateService;

  beforeEach(() => {
    // Configure the testing module and inject the LicensePlateService.
    TestBed.configureTestingModule({
      providers: [LicensePlateService],
    });
    service = TestBed.inject(LicensePlateService);
  });

  // Test for the very first license plate.
  it('should return "000000" as the first license plate', () => {
    expect(service.getLicensePlate(0)).toBe('000000');
  });

  // Test for the second license plate.
  it('should return "000001" as the second license plate', () => {
    expect(service.getLicensePlate(1)).toBe('000001');
  });

  // Test for the last plate in the all-digits group (k = 6).
  it('should return "999999" as the last plate of the all-digits group', () => {
    // There are 10^6 = 1,000,000 plates in the all-digits group.
    expect(service.getLicensePlate(999999)).toBe('999999');
  });

  // Test for the first plate of the 5-digit, 1-letter group (first subgroup: letter "A").
  it('should return "00000A" as the first plate of the 5-digit, 1-letter group (subgroup A)', () => {
    // The first group (6 digits) has 1,000,000 plates.
    // The next subgroup (for k = 5 and letter "A") starts at index 1,000,000.
    expect(service.getLicensePlate(1000000)).toBe('00000A');
  });

  // Test for the last plate of the first subgroup in the 5-digit, 1-letter group.
  it('should return "99999A" as the last plate in the 5-digit, 1-letter group (subgroup A)', () => {
    // The subgroup for k = 5 has 10^5 = 100,000 plates.
    // The first subgroup for letter "A" occupies indices 1,000,000 to 1,099,999.
    // The last plate in this subgroup is at index 1,099,999.
    expect(service.getLicensePlate(1099999)).toBe('99999A');
  });

  // Test for the first plate of the second subgroup in the 5-digit, 1-letter group (letter "B").
  it('should return "00000B" as the first plate of the 5-digit, 1-letter group (subgroup B)', () => {
    // The second subgroup starts right after the first subgroup:
    // Index = 1,000,000 (all-digits group) + 100,000 (first subgroup) = 1,100,000.
    expect(service.getLicensePlate(1100000)).toBe('00000B');
  });
});
