export const isDateOver = (rent_end_date: Date) => {
  const now = new Date();
  const bookingStartDate = new Date(rent_end_date);

  return now > bookingStartDate;
};
