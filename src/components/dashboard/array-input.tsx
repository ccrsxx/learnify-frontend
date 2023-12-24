import { MdAdd, MdDelete } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Alert } from '../ui/alert';
import type { MotionProps } from 'framer-motion';
import type {
  Path,
  Merge,
  FieldError,
  FieldValues,
  FieldErrorsImpl,
  UseFormRegister,
  FieldArrayWithId
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
  disabled?: boolean;
  placeholder: string;
  register: UseFormRegister<T>;
  onAppend: () => void;
  onRemove: (index: number) => () => void;
};

export function ArrayInput<T extends FieldValues>({
  id,
  label,
  fields,
  errors,
  disabled,
  placeholder,
  register,
  onAppend,
  onRemove
}: ArrayInputProps<T>): JSX.Element {
  return (
    <ul className='grid gap-2'>
      <AnimatePresence mode='popLayout'>
        {fields.map(({ id: fieldId }, index) => (
          <motion.li {...variant} layout='position' key={fieldId}>
            <Input
              id={`${String(id)}.${index}.name`}
              type='text'
              label={index === 0 ? label : undefined}
              error={errors?.[index]?.name}
              disabled={disabled}
              placeholder={placeholder}
              register={register(`${String(id)}.${index}.name` as Path<T>)}
            >
              <div className='flex gap-2 text-white'>
                {fields.length > 1 && (
                  <Button
                    className='smooth-tab rounded-medium bg-primary-alert-error
                               p-2 transition hover:brightness-90'
                    disabled={disabled}
                    onClick={onRemove(index)}
                  >
                    <MdDelete className='text-xl' />
                  </Button>
                )}
                {fields.length !== 5 && index === fields.length - 1 && (
                  <Button
                    type='button'
                    className='smooth-tab rounded-medium bg-primary-blue-300
                               p-2 transition hover:brightness-90'
                    disabled={disabled}
                    onClick={onAppend}
                  >
                    <MdAdd className='text-xl' />
                  </Button>
                )}
              </div>
            </Input>
          </motion.li>
        ))}
      </AnimatePresence>
      {errors?.message && (
        <Alert className='mt-1' variant='error' message={errors.message} />
      )}
    </ul>
  );
}

export const variant: MotionProps = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};
