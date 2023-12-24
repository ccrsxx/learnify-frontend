'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { formatDate } from '@/lib/format';
import { usePayments } from '@/lib/hooks/use-payments';
import { Table } from '@/components/table/table';
import type { ColumnDef } from '@tanstack/react-table';
import type { UserPayment } from '@/lib/types/schema';

export default function Dashboard(): JSX.Element {
  const { data, isLoading } = usePayments();

  const userPayments = data?.data ?? [];

  return <Table columns={columns} rows={userPayments} loading={isLoading} />;
}

const { accessor } = createColumnHelper<UserPayment>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<UserPayment, any>[] = [
  accessor('id', {
    header: 'ID',
    size: 112,
    cell: ({ getValue }) => (getValue() as string).split('-').at(0)
  }),
  accessor('course.course_category.name', {
    header: 'Kategori',
    size: 192
  }),
  accessor('course.name', {
    header: 'Kelas',
    size: 320
  }),
  accessor('status', {
    header: 'Status',
    size: 144,
    cell: ({ getValue }) =>
      getValue() === 'COMPLETED' ? 'SUDAH BAYAR' : 'BELUM BAYAR'
  }),
  accessor('payment_method', {
    header: 'Pembayaran',
    size: 144,
    cell: ({ getValue }) =>
      getValue() === 'BANK_TRANSFER' ? 'Transfer Bank' : 'Credit Card'
  }),
  accessor('paid_at', {
    size: 240,
    header: 'Tanggal Bayar',
    cell: ({ getValue }) => formatDate(new Date(getValue() as string))
  })
];
