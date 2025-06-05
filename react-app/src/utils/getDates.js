
export function getDatesInMonth(year, month) {
  const result = [];

  // Note: JavaScript months are 0-based (January is 0, June is 5)
  const date = new Date(year, month - 1, 1);

  while (date.getMonth() === month - 1) {
    // Get local year, month, and day
    const localYear = date.getFullYear();
    const localMonth = String(date.getMonth() + 1).padStart(2, '0'); // convert back to 1-based
    const localDay = String(date.getDate()).padStart(2, '0');

    const dateString = `${localYear}-${localMonth}-${localDay}`;
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

    result.push({
      date: dateString,
      weekday: weekday
    });

    date.setDate(date.getDate() + 1);
  }

  return result;
}
