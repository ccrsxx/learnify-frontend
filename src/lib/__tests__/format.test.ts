describe('format', () => {
  it('should be able to import format', () => {
    expect(() => import('../format')).not.toThrow();
  });

  it('should be able to format number', async () => {
    const { formatNumber } = await import('../format');

    const value = 1000000;
    const result = formatNumber(value);
    const expected = '1,000,000';

    expect(result).toEqual(expected);
  });

  it('should be able to format currency', async () => {
    const { formatCurrency } = await import('../format');

    const value = 1000000;
    const result = formatCurrency(value);

    const expected = 'Rp 1.000.000';

    expect(result).toEqual(expected);
  });

  it('should be able to format date', async () => {
    const { formatDate } = await import('../format');

    const value = new Date('2021-01-01T00:00:00.000Z');
    const result = formatDate(value);

    const offsetHours = Math.abs(value.getTimezoneOffset() / 60)
      .toString()
      .padStart(2, '0');

    const expected = `1 Jan 2021 ${offsetHours}.00`;

    expect(result).toEqual(expected);
  });

  it('should be able to format relative time', async () => {
    const { formatRelativeTime } = await import('../format');

    const date = new Date();

    date.setDate(date.getDate() - 1);
    date.setHours(date.getHours() - 1);

    const result = formatRelativeTime(date);
    const expected = '1 hari yang lalu';

    expect(result).toEqual(expected);
  });
});
