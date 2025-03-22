import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LicensePlateService {
  constructor() {
    // No dependencies are required.
  }

  /**
   * Returns the nth license plate in the sequence.
   *
   * The license plate sequence is built using a 6-character pattern where the left portion
   * consists of digits and the right portion consists of letters. The pattern is divided into groups
   * based on the number of digits (k) and letters (6 - k). Within each group, the plates are subdivided
   * into letter subgroups, each containing exactly 10^k plates.
   *
   * The function iterates from groups with 6 digits (k = 6) down to groups with 0 digits (k = 0)
   * and returns the license plate once the group containing the nth element is found.
   *
   * @param n The 0-indexed position in the license plate sequence.
   * @returns The license plate at position n as a string.
   */
  getLicensePlate(n: number): string {
    // Loop from the group with 6 digits (all digits) to the group with 0 digits (all letters)
    for (let k = 6; k >= 0; k--) {
      const digitCount = Math.pow(10, k); // Number of possible numeric combinations (10^k)
      const letterSubgroupCount = Math.pow(26, 6 - k); // Number of letter subgroups (26^(6-k))
      const groupTotal = digitCount * letterSubgroupCount; // Total plates in this group

      // If n falls within this group's range, process it.
      if (n < groupTotal) {
        return this.computePlateForGroup(n, k, digitCount, letterSubgroupCount);
      }
      // Otherwise, subtract the current group's count and continue to the next group.
      n -= groupTotal;
    }
    throw new Error('Index out of range');
  }

  /**
   * Computes the license plate for a given group.
   *
   * Iterates over each letter subgroup within the current group. Each subgroup contains exactly
   * digitCount plates. When the index n falls within a subgroup, the numeric part (with leading zeros)
   * and the fixed letter part (converted to a base-26 string) are concatenated and returned.
   *
   * @param n The index within the current group.
   * @param k The number of digits in this group.
   * @param digitCount The number of numeric combinations (10^k).
   * @param letterSubgroupCount The total number of letter subgroups in the current group.
   * @returns The license plate for the given subgroup.
   */
  private computePlateForGroup(
    n: number,
    k: number,
    digitCount: number,
    letterSubgroupCount: number
  ): string {
    for (
      let subgroupIndex = 0;
      subgroupIndex < letterSubgroupCount;
      subgroupIndex++
    ) {
      if (n < digitCount) {
        const numericPart = k > 0 ? n.toString().padStart(k, '0') : '';
        const letterPart = this.convertToBase26(subgroupIndex, 6 - k);
        return numericPart + letterPart;
      }
      n -= digitCount;
    }
    throw new Error('Index not found in group');
  }

  /**
   * Converts a number to a fixed-length base-26 string using letters A-Z.
   *
   * For example:
   * - convertToBase26(0, 2) returns "AA"
   * - convertToBase26(1, 2) returns "AB"
   *
   * @param num The number to convert.
   * @param length The desired length of the output string.
   * @returns A string representing the number in base-26, padded with 'A's to achieve the specified length.
   */
  private convertToBase26(num: number, length: number): string {
    let result = '';
    while (num > 0) {
      const remainder = num % 26;
      const char = String.fromCharCode('A'.charCodeAt(0) + remainder);
      result = char + result;
      num = Math.floor(num / 26);
    }
    while (result.length < length) {
      result = 'A' + result;
    }
    return result;
  }
}
