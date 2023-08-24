// 08-08

// 월을 영어로 변환한다. (11 -> 'Nov')
var month = 11;
var monthName;

switch (month) {
    case 1: monthName = 'Jan'; break;
    case 2: monthName = 'Feb'; break;
    case 3: monthName = 'Mar'; break;
    case 4: monthName = 'Apr'; break;
    case 5: monthName = 'May'; break;
    case 6: monthName = 'Jun'; break;
    case 7: monthName = 'Jul'; break;
    case 8: monthName = 'Aug'; break;
    case 9: monthName = 'Sep'; break;
    case 10: monthName = 'Oct'; break;
    case 11: monthName = 'Nov'; break;
    case 12: monthName = 'Dec'; break;
    default: monthName = 'Invalid month';
}

console.log(monthName); // Nov
