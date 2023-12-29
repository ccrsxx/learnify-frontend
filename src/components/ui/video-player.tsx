import type { PropsWithChildren } from 'react';

type VideoPlayerProps = PropsWithChildren<{
  src: string;
}>;

export function VideoPlayer({ src, children }: VideoPlayerProps): JSX.Element {
  const youtubeId = src.split('/').pop();

  return (
    <div className='group relative h-64 rounded-medium bg-black lg:h-80'>
      <iframe
        className='h-full w-full rounded-medium'
        src={`https://www.youtube.com/embed/${youtubeId}`}
      />
      {children}
    </div>
  );
}
