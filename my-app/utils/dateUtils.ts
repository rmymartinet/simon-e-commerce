// lib/dateUtils.ts
export const formattedDate = (date?: Date | string) =>
  date ? new Date(date).toLocaleDateString("fr-FR") : "N/A";

export const calculateNextPayment = (
  startDate?: Date | string,
  endDate?: Date | string,
): string => {
  const start = startDate ? new Date(startDate) : new Date();
  const end = endDate ? new Date(endDate) : new Date();
  const now = new Date();

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return "Invalid Date";
  if (now < start) return formattedDate(start);
  if (now > end) return "expired";

  const nextPayment = new Date(start);
  while (nextPayment <= now) nextPayment.setMonth(nextPayment.getMonth() + 1);

  return nextPayment > end ? "expired" : formattedDate(nextPayment);
};
