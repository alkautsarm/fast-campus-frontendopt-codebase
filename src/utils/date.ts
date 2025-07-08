export const formatDate = (s: string, e: string) => {
  const start = new Date(s);
  const end = new Date(e);

  const startMonth = start.toLocaleString("en-US", { month: "short" });
  const endMonth = end.toLocaleString("en-US", { month: "short" });

  const startDate = start.getDate();
  const endDate = end.getDate();

  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startMonth === endMonth && startYear === endYear) {
    return `${startMonth} ${startDate} - ${endDate}`;
  }

  if (startYear === endYear) {
    return `${startMonth} ${startDate} - ${endMonth} ${endDate}`;
  }

  return `${startMonth} ${startDate}, ${startYear} - ${endMonth} ${endDate}, ${endYear}`;
};

export const formatReviewDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
};
