require('dotenv').config({ path: '../../.env.local' });



/* const date = new Date(); */

/* const option1 = { month: 'short', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric', timeZone: 'UTC+8', timeZoneName: 'long', hour12: false }; */
/* const option2 = {
    timeZone: 'Australia/Sydney',
    hour: 'numeric', 
    minute: 'numeric'
}
const formattedDate = date.toLocaleString('en-GB', option2);

console.log(formattedDate); */



//Get timezone from lat & long
async function getTimeZone(latitude, longitude) {
    const apiKey = process.env.GOOGLE_MAP_KEY;

    if (!apiKey) {
        throw new Error('Google Maps API key is not set');
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${timestamp}&key=${apiKey}`;

    // Log URL without API key for debugging
    console.log(`Request URL (without API key): ${url.replace(apiKey, 'API_KEY')}`);

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Log full response for debugging
        console.log('Full API response:', JSON.stringify(data, null, 2));

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
getTimeZone(59.3293, 18.0686)
    .then(timeZone => {
        console.log(`Time zone for Stockholm: ${timeZone}`);
    })
    .catch(error => {
        console.error(`Error fetching time zone: ${error.message}`);
    });
