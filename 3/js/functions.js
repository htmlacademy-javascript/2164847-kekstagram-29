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
