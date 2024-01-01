describe('image', () => {
  it('should be able to import image', () => {
    expect(() => import('../image')).not.toThrow();
  });

  it('should return true if the image is valid', async () => {
    const { isValidImage } = await import('../image');

    const bytes = 5 * Math.pow(1024, 2);

    const result = isValidImage('https://example.com/image.jpg', bytes);

    expect(result).toEqual(true);
  });

  it('should return false if the image size is too big', async () => {
    const { isValidImage } = await import('../image');

    const bytes = 21 * Math.pow(1024, 2);

    const result = isValidImage('https://example.com/image.jpg', bytes);

    expect(result).toEqual(false);
  });

  it('should return false if the image extension is not valid', async () => {
    const { isValidImage } = await import('../image');

    const bytes = 5 * Math.pow(1024, 2);

    const result = isValidImage('https://example.com/file.pdf', bytes);

    expect(result).toEqual(false);
  });
});
