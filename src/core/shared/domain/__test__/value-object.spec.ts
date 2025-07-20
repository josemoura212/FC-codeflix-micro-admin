import { ValueObject } from '../value-object';

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(
    readonly props1: string,
    readonly props2: number,
  ) {
    super();
  }
}

describe('ValueObject Unit Tests', () => {
  test('should be equals', () => {
    const vo1 = new StringValueObject('value');
    const vo2 = new StringValueObject('value');
    expect(vo1.equals(vo2)).toBe(true);

    const vo3 = new ComplexValueObject('value', 1);
    const vo4 = new ComplexValueObject('value', 1);
    expect(vo3.equals(vo4)).toBe(true);
  });

  test('should not be equals', () => {
    const vo1 = new StringValueObject('value1');
    const vo2 = new StringValueObject('value2');
    expect(vo1.equals(vo2)).toBe(false);
    expect(vo1.equals(null as any)).toBe(false);
    expect(vo1.equals(undefined as any)).toBe(false);

    const vo3 = new ComplexValueObject('value', 1);
    const vo4 = new ComplexValueObject('value', 2);
    expect(vo3.equals(vo4)).toBe(false);
    expect(vo3.equals(null as any)).toBe(false);
    expect(vo3.equals(undefined as any)).toBe(false);
  });
});
