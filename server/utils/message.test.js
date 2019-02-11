const expect = require('expect')

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Jen';
    const text = 'some message';
    const message = generateMessage(from, text);

    // expect(message.createdAt).toBeA('number');
    // expect(message).toInclude({ from, text })
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({ from, text });
  })
})

describe('generateMessage', () => {
  it('should generate correct location  object', () => {
    const from = 'Jen';
    const latitude = 21.0203053;
    const longitude = 105.7762095;
    const url = "https://www.google.com/maps?q=21.0203053,105.7762095";
    const message = generateLocationMessage(from, latitude, longitude);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({ from, url });
  })
})