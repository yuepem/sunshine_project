// require('dotenv').config({ path: '../../.env.local' });
// dotenv is required in node environment. For React app, use use it as below instead. So, the below code works well in Browser but not in Node.

//Get timezone from lat & long
export default async function getTimeZone(latitude, longitude) {
    const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY;

    if (!apiKey) {
        throw new Error('Google Maps API key is not set');
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${timestamp}&key=${apiKey}`;


    try {
        const response = await fetch(url);
        const data = await response.json();

        // Log full response for debugging
        // console.log('Full API response:', JSON.stringify(data, null, 2));

        if (data.status === 'OK') {
            return data.timeZoneId;
        } else {
            throw new Error(`API returned status: ${data.status}, error message: ${data.errorMessage || 'No error message provided'}`);
        }
    } catch (error) {
        console.error('Full error:', error);
        throw new Error(`Failed to fetch time zone: ${error.message}`);
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
export function timeDisplayFormat(date,timeZone) {
    const options = {
        day: "2-digit",
        month: "short", 
        year: "numeric", 
        hour: "numeric", 
        minute: "2-digit",
        hour12: false, 
        timeZone: timeZone
    };
    return date.toLocaleString('en-GB', options);
}
