


const date = new Date();

const options = {
  timeZone: 'Australia/Sydney',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

const formattedTime = date.toLocaleString('en-GB', options);

console.log(formattedTime); // This will output the time in Sydney