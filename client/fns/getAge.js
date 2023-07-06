export default function getAge(dateString) {
	const currentDate = new Date();
	const targetDate = new Date(dateString);

	const timeDiff = currentDate - targetDate; // Get the time difference in milliseconds
	const oneYearInMillis = 365 * 24 * 60 * 60 * 1000; // Approximate milliseconds in a year
	const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000; // Approximate milliseconds in a month
	const oneDayInMillis = 24 * 60 * 60 * 1000; // Milliseconds in a day

	let result;

	if (timeDiff >= oneYearInMillis) {
		const years = Math.floor(timeDiff / oneYearInMillis);
		result = `${years}y`;
	} else if (timeDiff >= oneMonthInMillis) {
		const months = Math.floor(timeDiff / oneMonthInMillis);
		result = `${months}mo`;
	} else {
		const days = Math.floor(timeDiff / oneDayInMillis);
		result = `${days}d`;
	}
	return result;
}