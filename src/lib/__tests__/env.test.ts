describe('env', () => {
  it('should be able to import env', () => {
    expect(() => import('../env')).not.toThrow();
  });
});
