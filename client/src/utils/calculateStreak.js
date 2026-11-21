export function calculateStreak(interview) {
  const dates = interview.map((interview) => {
    return new Date(interview.created_at).toLocaleDateString("en-CA", {timeZone: "Australia/Sydney"});
  })

  const uniqueDates = [...new Set(dates)];
  uniqueDates.sort((a, b) => b.localeCompare(a));

  let streak = 0;
  let index = 0;
  let expectedDate;

  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  const todayString = today.toLocaleDateString("en-CA", {timeZone: "Australia/Sydney"});
  const yesterdayString = yesterday.toLocaleDateString("en-CA", {timeZone: "Australia/Sydney"});

  if (uniqueDates[0] === todayString) {
    expectedDate = today;
  } else if (uniqueDates[0] === yesterdayString) {
    expectedDate = yesterday;
  } else {
    return 0;
  }

  while (index < uniqueDates.length) {
    const expectedDateString = expectedDate.toLocaleDateString("en-CA", {timeZone: "Australia/Sydney"})
    if ((uniqueDates[index]) === expectedDateString) {
      streak++;
      index++;
      expectedDate.setDate(expectedDate.getDate() - 1)
    } else {
      break;
    }
  }
  return streak;
}