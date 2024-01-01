import type { SyntheticEvent } from 'react';

describe('helper', () => {
  it('should be able to import helper', () => {
    expect(() => import('../helper')).not.toThrow();
  });

  it('should prevent bubbling', async () => {
    const { preventBubbling } = await import('../helper');

    const mockCallback = jest.fn();

    const mockEvent = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn()
    };

    preventBubbling({ callback: mockCallback })(
      mockEvent as unknown as SyntheticEvent
    );

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalled();
  });

  it('should prevent default with prevent default', async () => {
    const { preventBubbling } = await import('../helper');

    const mockCallback = jest.fn();

    const mockEvent = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn()
    };

    preventBubbling({ preventDefault: true, callback: mockCallback })(
      mockEvent as unknown as SyntheticEvent
    );

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalled();
  });

  it('should sleep', async () => {
    const { sleep } = await import('../helper');

    const mockCallback = jest.fn();

    await sleep(100).then(mockCallback);

    expect(mockCallback).toHaveBeenCalled();
  });

  it('should get youtube video id from valid urls', async () => {
    const { getYoutubeVideoId } = await import('../helper');

    const validUrls = [
      'https://youtube.com/shorts/dQw4w9WgXcQ?feature=share',
      '//www.youtube-nocookie.com/embed/up_lNV-yoK4?rel=0',
      'http://www.youtube.com/user/Scobleizer#p/u/1/1p3vcRhsYGo',
      'http://www.youtube.com/watch?v=cKZDdG9FTKY&feature=channel',
      'http://www.youtube.com/watch?v=yZ-K7nCVnBI&playnext_from=TL&videos=osPknwzXEas&feature=sub',
      'http://www.youtube.com/ytscreeningroom?v=NRHVzbJVx8I',
      'http://www.youtube.com/user/SilkRoadTheatre#p/a/u/2/6dwqZw0j_jY',
      'http://youtu.be/6dwqZw0j_jY',
      'http://www.youtube.com/watch?v=6dwqZw0j_jY&feature=youtu.be',
      'http://youtu.be/afa-5HQHiAs',
      'http://www.youtube.com/user/Scobleizer#p/u/1/1p3vcRhsYGo?rel=0',
      'http://www.youtube.com/watch?v=cKZDdG9FTKY&feature=channel',
      'http://www.youtube.com/watch?v=yZ-K7nCVnBI&playnext_from=TL&videos=osPknwzXEas&feature=sub',
      'http://www.youtube.com/ytscreeningroom?v=NRHVzbJVx8I',
      'http://www.youtube.com/embed/nas1rJpm7wY?rel=0',
      'http://www.youtube.com/watch?v=peFZbP64dsU',
      'http://youtube.com/v/dQw4w9WgXcQ?feature=youtube_gdata_player',
      'http://youtube.com/vi/dQw4w9WgXcQ?feature=youtube_gdata_player',
      'http://youtube.com/?v=dQw4w9WgXcQ&feature=youtube_gdata_player',
      'http://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player',
      'http://youtube.com/?vi=dQw4w9WgXcQ&feature=youtube_gdata_player',
      'http://youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player',
      'http://youtube.com/watch?vi=dQw4w9WgXcQ&feature=youtube_gdata_player',
      'http://youtu.be/dQw4w9WgXcQ?feature=youtube_gdata_player'
    ];

    for (const url of validUrls) {
      const result = getYoutubeVideoId(url);

      expect(typeof result).toBe('string');
    }
  });

  it('should return null if the url is not a valid youtube url', async () => {
    const { getYoutubeVideoId } = await import('../helper');

    const invalidUrls = [
      'https://www.github.com',
      'https://www.reddit.com',
      'https://www.youtube.com/account'
    ];

    for (const url of invalidUrls) {
      const result = getYoutubeVideoId(url);

      expect(result).toBeNull();
    }
  });
});
