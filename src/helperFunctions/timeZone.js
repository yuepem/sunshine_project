const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;

// Get timezone from lat & long. If the Google key is unavailable, keep the
// existing timezone instead of throwing inside the UI render cycle.
export default async function getTimeZone(latitude, longitude, fallbackTimeZone) {
    if (!GOOGLE_MAPS_KEY) {
        return fallbackTimeZone ?? null;
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${timestamp}&key=${GOOGLE_MAPS_KEY}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Timezone request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'OK' && data.timeZoneId) {
            return data.timeZoneId;
        }

        throw new Error(
            `API returned status: ${data.status}, error message: ${data.errorMessage || 'No error message provided'}`
        );
    } catch (error) {
        console.warn('Failed to fetch time zone, falling back to current value.', error);
        return fallbackTimeZone ?? null;
    }
}

// Usage
// getTimeZone(29.3293, 38.0686)
//     .then(timeZone => {
//         console.log(`Time zone for Stockholm: ${timeZone}`);
//     })
//     .catch(error => {
//         console.error(`Error fetching time zone: ${error.message}`);
//     });


// Time Format Helper
