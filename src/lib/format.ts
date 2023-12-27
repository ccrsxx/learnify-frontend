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

const RELATIVE_TIME_FORMATTER = new Intl.RelativeTimeFormat('id-ID', {
  style: 'long'
});

type Units = Partial<Record<Intl.RelativeTimeFormatUnit, number>>;

const UNITS: Units = {
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000
};

export function formatRelativeTime(date: Date): string {
  const elapsed = +date - +new Date();

  if (elapsed > 0) return 'Baru saja';

  const unitsItems = Object.entries(UNITS) as [keyof Units, number][];

  for (const [unit, millis] of unitsItems)
    if (Math.abs(elapsed) > millis)
      return RELATIVE_TIME_FORMATTER.format(Math.round(elapsed / millis), unit);

  return RELATIVE_TIME_FORMATTER.format(Math.round(elapsed / 1000), 'second');
}
