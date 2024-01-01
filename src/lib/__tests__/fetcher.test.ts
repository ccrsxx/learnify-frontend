describe('fetcher', () => {
  const PUBLIC_URL = 'http://localhost:3000';

  beforeAll(() => {
    global.fetch = jest.fn();
    global.process.env.NEXT_PUBLIC_BACKEND_URL = PUBLIC_URL;
  });

  it('should be able to import fetcher', () => {
    expect(() => import('../fetcher')).not.toThrow();
  });

  it('should be able to fetch data', async () => {
    const { fetcher } = await import('../fetcher');

    const data = { foo: 'bar' };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => data
    });

    const endpoint = '/courses';

    const result = await fetcher(endpoint);
    const calledWith = `${PUBLIC_URL}${endpoint}`;

    expect(global.fetch).toHaveBeenCalledWith(calledWith, undefined);
    expect(result).toEqual(data);
  });

  it('should throw an error if the response is not ok', async () => {
    const { fetcher } = await import('../fetcher');

    const data = { message: 'error' };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => data
    });

    const endpoint = '/courses';

    await expect(fetcher(endpoint)).rejects.toThrow(data.message);
  });
});
