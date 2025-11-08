const pad = (value: number) => value.toString().padStart(2, '0');

export const toISODate = (date = new Date()): string => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

export const addDays = (base: Date, days: number): Date => {
  const copy = new Date(base);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
};

export const buildDateRange = (days = 7) => {
  const start = new Date();
  const end = addDays(start, days);
  return { start: toISODate(start), end: toISODate(end) };
};

export const formatDateTime = (value: string) =>
  new Date(value).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

export const formatDate = (value: string) => new Date(value).toLocaleDateString('pt-BR');
export const formatTime = (value: string) => new Date(value).toLocaleTimeString('pt-BR', { timeStyle: 'short' });
