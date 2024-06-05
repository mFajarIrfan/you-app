export function ageCalculate(date: string) {
  const [day, month, year] = date.split("/").map(Number);

  const birthDate = new Date(year, month - 1, day); // Note: Month is 0-indexed

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
