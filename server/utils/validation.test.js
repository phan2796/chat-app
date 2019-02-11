const expect = require('expect');


const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string value', () => {
    var res = isRealString(98);
    expect(res).toBe(false);
  })
  it('should reject string with only spaces', () => {
    var res = isRealString('       ');
    expect(res).toBe(false);
  })
  it('shoould allow string value', () => {
    var res = isRealString('test');
    expect(res).toBe(true);
  })
})