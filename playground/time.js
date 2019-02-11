const moment = require('moment');

const someTimestamp = moment().valueOf();
console.log(someTimestamp)

const createAt = 1234;
const date = moment(createAt)
console.log(date.format('h:mm a'))