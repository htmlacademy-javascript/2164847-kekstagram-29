let a, b, c;

function checkLength (str, l) {
  if (str.length <= l) {
      return true
  }
  return false

}

// Cтрока короче 20 символов
a = checkLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
b = checkLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
c = checkLength('проверяемая строка', 10); // false

console.log(a);
console.log(b);
console.log(c);

function palindrome(str = '') {
  let x = str
      .toLowerCase()
      .split(' ')
      .join('');
  let y = x
      .split('')
      .reverse()
      .join('');

  if (x == y) {
      return true
  }

  return false;
}

// Строка является палиндромом
a = palindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
b = palindrome('ДовОд'); // true
// Это не палиндром
c = palindrome('Кекс');  // false


console.log(a);
console.log(b);
console.log(c);

function calcMeetingTime(startWork = '', endWork = '', startMeeting = '', meetingDuration = 0) {
  let [
    startWorkHours = 0,
    startWorkMinutes = 0
  ] = startWork.split(':').map(substr => parseInt(substr, 10));

  startWorkMinutes += startWorkHours * 60;

  let [
    endWorkHours = 0,
    endWorkMinutes = 0
  ] = endWork.split(':').map(substr => parseInt(substr, 10));

  endWorkMinutes += endWorkHours * 60;

  let [
    startMeetingHours = 0,
    startMeetingMinutes = 0
  ] = startMeeting.split(':').map(substr => parseInt(substr, 10));

  startMeetingMinutes += startMeetingHours * 60;

  if(startMeetingMinutes < startWorkMinutes) {
    return false;
  }

  if(startMeetingMinutes + meetingDuration > endWorkMinutes) {
    return false;
  }

  return true;
}
console.log(
  "module5-task2",
  calcMeetingTime('08:00', '17:30', '14:00', 90), // true
  calcMeetingTime('8:0', '10:0', '8:0', 120),     // true
  calcMeetingTime('08:00', '14:30', '14:00', 90), // false
  calcMeetingTime('14:00', '17:30', '08:0', 90),  // false
  calcMeetingTime('8:00', '17:30', '08:00', 900) // false
);

