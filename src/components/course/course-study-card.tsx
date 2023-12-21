import { CourseProgressBar } from './course-progress-bar';
import { CourseMaterial } from './course-material';
import type { Course } from '@/lib/types/schema';

type CourseStudyCardProps = {
  course: Course;
  courseEnrolled: boolean;
  selectedMaterialId?: string;
  openPurchaseCourseModal: () => void;
};

export function CourseStudyCard({
  course,
  courseEnrolled,
  selectedMaterialId,
  openPurchaseCourseModal
}: CourseStudyCardProps): JSX.Element {
  const { course_chapter, total_materials, total_completed_materials } = course;

  return (
    <div className='grid w-full content-start gap-4 rounded-medium bg-white p-6 shadow-high'>
      <div className='flex justify-between'>
        <h2 className='text-xl font-bold text-black'>Materi Belajar</h2>
        {courseEnrolled && (
          <CourseProgressBar
            total_materials={total_materials}
            total_completed_materials={total_completed_materials as number}
          />
        )}
      </div>
      <ol className='grid gap-6'>
        {course_chapter?.map(
          ({
            id,
            name,
            duration,
            course_material,
            order_index: chapter_index
          }) => (
            <li className='grid gap-3' key={id}>
              <div className='flex justify-between gap-2'>
                <h3 className='font-bold text-primary-blue-500'>
                  Chapter {chapter_index} - {name}
                </h3>
                <p className='min-w-fit font-bold text-primary-blue-300'>
                  {duration} Menit
                </p>
              </div>
              <ol className='grid gap-3'>
                {course_material?.map((material) => (
                  <CourseMaterial
                    course={course}
                    chapter_index={chapter_index}
                    course_material={material}
                    courseEnrolled={courseEnrolled}
                    selectedMaterialId={selectedMaterialId}
                    openPurchaseCourseModal={openPurchaseCourseModal}
                    key={material.id}
                  />
                ))}
              </ol>
            </li>
          )
        )}
      </ol>
    </div>
  );
}
