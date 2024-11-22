import { formatNumber, appendDecimal, removeDecimal } from ".";

describe("Test for the formatNumber function", () => {
  it("should return a valid formatted number when given a numeric string", () => {
    expect(formatNumber("1234")).toBe("1234");
  });

  it("should format a number with a decimal point correctly", () => {
    expect(formatNumber("1234.56")).toBe("1234.56");
  });

  it("should handle input with extra characters and remove them", () => {
    expect(formatNumber("abc1234xyz")).toBe("1234");
    expect(formatNumber("$1,234.56")).toBe("1234.56");
  });

  it("should handle an input with multiple dots and keep only the first valid decimal", () => {
    expect(formatNumber("1234.56.78")).toBe("1234.56");
  });

  it("should handle a string with no valid numeric characters and return an empty string", () => {
    expect(formatNumber("abc")).toBe("");
  });

  it("should return only the integer part if there is no decimal in the input", () => {
    expect(formatNumber("1234abc")).toBe("1234");
  });

  it("should handle empty input and return an empty string", () => {
    expect(formatNumber("")).toBe("");
  });

  it("should handle input with only a decimal point", () => {
    expect(formatNumber(".")).toBe(".");
  });

  it("should handle input with leading and trailing spaces", () => {
    expect(formatNumber("  1234.56  ")).toBe("1234.56");
  });

  it("should handle input with trailing dots correctly", () => {
    expect(formatNumber("1234.")).toBe("1234.");
  });

  it("should handle input with only numeric characters and no decimal", () => {
    expect(formatNumber("987654321")).toBe("987654321");
  });
});

describe("Test for the appendDecimal function", () => {
  it('should return "0" if amount is undefined', () => {
    expect(appendDecimal(undefined, 2)).toBe("0");
  });

  it("should return the number if decimal is undefined", () => {
    expect(appendDecimal("100", undefined)).toBe("100");
  });

  it('should return "0" if both amount and decimal are undefined', () => {
    expect(appendDecimal(undefined, undefined)).toBe("0");
  });

  it("should return the number if decimal is 0", () => {
    expect(appendDecimal("100", 0)).toBe("100");
  });

  it("should correctly append decimals for valid input", () => {
    expect(appendDecimal("123", 2)).toBe("12300");
    expect(appendDecimal("45.67", 3)).toBe("45670");
  });

  it("should handle large decimal values correctly", () => {
    expect(appendDecimal("1", 10)).toBe("10000000000");
  });

  it("should handle fractional amounts correctly", () => {
    expect(appendDecimal("0.5", 4)).toBe("5000");
  });

  it("should handle negative amounts correctly", () => {
    expect(appendDecimal("-123", 2)).toBe("-12300");
  });

  it("should handle floating-point precision issues gracefully", () => {
    expect(appendDecimal("0.1", 18)).toBe("100000000000000000");
  });

  it("should handle cases where amount is a negative floating-point number", () => {
    expect(appendDecimal("-0.25", 3)).toBe("-250");
  });
});

describe("Test for the removeDecimal function", () => {
  it('should return "0.0" if amount is undefined', () => {
    expect(removeDecimal(2, undefined)).toBe("0.0");
  });

  it("should handle valid inputs and correctly place the decimal", () => {
    expect(removeDecimal(2, "12345")).toBe("123.45");
    expect(removeDecimal(3, "12345")).toBe("12.345");
    expect(removeDecimal(0, "12345")).toBe("12345.");
  });

  it("should handle numbers as input instead of strings", () => {
    expect(removeDecimal(2, 12345)).toBe("123.45");
    expect(removeDecimal(4, 56789)).toBe("5.6789");
  });

  it("should prepend zeros if the decimal position is before the start of the number", () => {
    expect(removeDecimal(5, "123")).toBe("0.00123");
    expect(removeDecimal(6, "1")).toBe("0.000001");
  });

  it("should handle large decimal values correctly", () => {
    expect(removeDecimal(10, "1")).toBe("0.0000000001");
  });

  it("should handle negative numbers correctly", () => {
    expect(removeDecimal(2, "-12345")).toBe("-123.45");
    expect(removeDecimal(3, "-567")).toBe("-0.567");
  });

  it("should handle edge cases where the amount is 0", () => {
    expect(removeDecimal(2, "0")).toBe("0.0");
    expect(removeDecimal(3, 0)).toBe("0.0");
  });

  it("should handle invalid inputs gracefully", () => {
    expect(removeDecimal(2, "abc")).toBe("0.0");
    expect(removeDecimal(2, NaN)).toBe("0.0");
    expect(removeDecimal(2, null as any)).toBe("0.0");
  });

  it("should handle empty strings gracefully", () => {
    expect(removeDecimal(2, "")).toBe("0.0"); // Empty string
  });
});
