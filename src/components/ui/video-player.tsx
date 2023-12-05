import Link from 'next/link';
import { Button } from './button';

type VideoPlayerProps = {
  src: string;
  handleNextMaterial: () => void;
};

export function VideoPlayer({
  src,
  handleNextMaterial
}: VideoPlayerProps): JSX.Element {
  const youtubeId = src.split('/').pop();

  return (
    <div className='group relative h-80 rounded-xl bg-black'>
      <iframe
        className='h-full w-full rounded-xl'
        src={`https://www.youtube.com/embed/${youtubeId}`}
      />
      <div
        className='absolute bottom-0 right-0 flex gap-3 p-4 
                   opacity-0 transition-opacity group-hover:opacity-100'
      >
        <Link
          href='/courses'
          className='clickable bg-primary-blue-50 px-4 py-2 text-primary-blue-300'
        >
          Kelas lainnya
        </Link>
        <Button
          className='clickable bg-primary-blue-500 px-4 py-2 text-white'
          onClick={handleNextMaterial}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
