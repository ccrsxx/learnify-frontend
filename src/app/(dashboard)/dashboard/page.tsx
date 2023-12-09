'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { formatDate } from '@/lib/format';
import { generateRandomUserPayment } from '@/lib/random';
import { Table } from '@/components/table/table';
import type { ColumnDef } from '@tanstack/react-table';
import type { UserPayment } from '@/lib/types/schema';

export default function Dashboard(): JSX.Element {
  return (
    <section>
      <Table columns={columns} rows={userPayments} />
    </section>
  );
}

const { accessor } = createColumnHelper<UserPayment>();

const columns: ColumnDef<UserPayment>[] = [
  accessor('id', {
    header: 'ID',
    cell: ({ getValue }) => getValue().split('-').at(0)
  }),
  accessor('course.course_category.name', {
    header: 'Kategori'
  }),
  accessor('course.name', {
    header: 'Kelas'
  }),
  accessor('status', {
    header: 'Status',
    cell: ({ getValue }) =>
      getValue() === 'COMPLETED' ? 'SUDAH BAYAR' : 'BELUM BAYAR'
  }),
  accessor('payment_method', {
    header: 'Metode Pembayaran',
    cell: ({ getValue }) =>
      getValue() === 'BANK_TRANSFER' ? 'Transfer Bank' : 'Credit Card'
  }),
  accessor('created_at', {
    header: 'Tanggal Bayar',
    cell: ({ getValue }) => formatDate(new Date(getValue()))
  })
];

const userPayments: UserPayment[] = Array.from(
  { length: 12 },
  generateRandomUserPayment
);
