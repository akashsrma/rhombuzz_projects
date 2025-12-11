export const getMonthLabels = () => {
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
};

export const getDaysLabels = (count) => {
  return Array.from({ length: count }, (_, i) => `Dec ${i + 1}`);
};
