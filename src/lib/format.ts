const NUMBER_FORMATTER = new Intl.NumberFormat();

export function formatNumber(value: number): string {
  return NUMBER_FORMATTER.format(value);
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0
});

export function formatCurrency(value: number): string {
  return CURRENCY_FORMATTER.format(value);
}

const DATE_FORMATTER = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'medium',
  timeStyle: 'short'
});

export function formatDate(value: Date): string {
  return DATE_FORMATTER.format(value);
}
