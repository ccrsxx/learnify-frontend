import { MdWarning } from 'react-icons/md';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';
import { getYoutubeVideoId } from '@/lib/helper';
import { Button } from './button';
import type { MaterialStatus } from '@/lib/hooks/mutation/use-material-status';

type VideoPlayerProps = {
  src: string | undefined;
  courseId: string;
  onNextMaterial?: () => Promise<void>;
} & Pick<MaterialStatus, 'updateMaterialStatusMutation'>;

export function VideoPlayer({
  src,
  courseId,
  updateMaterialStatusMutation,
  onNextMaterial
}: VideoPlayerProps): JSX.Element {
  const { user } = useAuth();

  const youtubeId = getYoutubeVideoId(src) ?? 'dQw4w9WgXcQ';

  return (
    <div className='grid h-72 grid-rows-[1fr,auto] md:h-96'>
      <div className='h-full rounded-t-medium'>
        {user ? (
          <iframe
            className='h-full w-full rounded-t-medium bg-black'
            src={`https://www.youtube.com/embed/${youtubeId}`}
          />
        ) : (
          <div
            className='grid h-full w-full content-center justify-items-center
                             gap-4 rounded-t-medium bg-gray-200'
          >
            <MdWarning className='text-5xl text-primary-alert-warning' />
          </div>
        )}
      </div>
      <div className='flex justify-end gap-3 rounded-b-medium bg-primary-blue-50 p-3'>
        {user ? (
          <>
            <Link
              href='/courses'
              className='clickable bg-primary-blue-300 px-4 py-2 text-white'
            >
              Kelas lainnya
            </Link>
            <Button
              className='clickable bg-primary-blue-500 px-4 py-2 text-white'
              loading={updateMaterialStatusMutation.isPending}
              onClick={onNextMaterial}
            >
              Next
            </Button>
          </>
        ) : (
          <Link
            className='clickable bg-primary-blue-500 px-4 py-2 text-white'
            href={`/login?redirect=/courses/${courseId}`}
          >
            Login untuk melihat video
          </Link>
        )}
      </div>
    </div>
  );
}
