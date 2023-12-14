import { MdAdd, MdDelete } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Alert } from '../ui/alert';
import type { MotionProps } from 'framer-motion';
import type {
  Merge,
  FieldError,
  FieldValues,
  FieldErrorsImpl,
  FieldArrayWithId,
  UseFormRegisterReturn
} from 'react-hook-form';

type CustomFieldErrors = Merge<
  FieldError,
  (
    | Merge<
        FieldError,
        FieldErrorsImpl<{
          name: string;
        }>
      >
    | undefined
  )[]
>;

type ArrayInputProps<T extends FieldValues> = {
  id: keyof T;
  label: string;
  fields: FieldArrayWithId<T>[];
  errors: CustomFieldErrors | undefined;
  register: UseFormRegisterReturn;
  placeholder: string;
  onAppend: () => void;
  onRemove: (index: number) => () => void;
};

export function ArrayInput<T extends FieldValues>({
  id,
  label,
  fields,
  errors,
  register,
  placeholder,
  onAppend,
  onRemove
}: ArrayInputProps<T>): JSX.Element {
  return (
    <>
      <AnimatePresence mode='popLayout'>
        {fields.map(({ id: fieldId }, index) => (
          <motion.div {...variant} layout='position' key={fieldId}>
            <Input
              id={`${String(id)}.${index}.name`}
              type='text'
              label={index === 0 ? label : undefined}
              error={errors?.[index]?.name}
              placeholder={placeholder}
              {...register}
            >
              <div className='flex gap-2 text-white'>
                {fields.length > 1 && (
                  <Button
                    className='smooth-tab rounded-medium bg-primary-alert-error
                               p-2 transition hover:brightness-90'
                    onClick={onRemove(index)}
                  >
                    <MdDelete className='text-xl' />
                  </Button>
                )}
                {fields.length !== 5 && index === fields.length - 1 && (
                  <button
                    type='button'
                    className='smooth-tab rounded-medium bg-primary-blue-300
                               p-2 transition hover:brightness-90'
                    onClick={onAppend}
                  >
                    <MdAdd className='text-xl' />
                  </button>
                )}
              </div>
            </Input>
          </motion.div>
        ))}
      </AnimatePresence>
      {errors && (
        <Alert
          className='mt-1'
          variant='error'
          message={errors.message as string}
        />
      )}
    </>
  );
}

const variant: MotionProps = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};
