// 08-07

// 월을 영어로 변환한다. (11 -> 'Nov')
var month = 11;
var monthName;

switch (month) {
    case 1: monthName = 'Jan';
    case 2: monthName = 'Feb';
    case 3: monthName = 'Mar';
    case 4: monthName = 'Apr';
    case 5: monthName = 'May';
    case 6: monthName = 'Jun';
    case 7: monthName = 'Jul';
    case 8: monthName = 'Aug';
    case 9: monthName = 'Sep';
    case 10: monthName = 'Oct';
    case 11: monthName = 'Nov';
    case 12: monthName = 'Dec';
    default: monthName = 'Invalid month';
}

console.log(monthName); // Invalid month
