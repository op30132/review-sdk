export const dateFormat = (date: Date) => {
  const td = date.toISOString().split('T')[0];
  const t = date.toTimeString().split(' ')[0];
  return td + ' ' + t;
};
