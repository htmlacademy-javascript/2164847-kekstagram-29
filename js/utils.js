
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function getRandomItems(arr = [], count = 5) {
  let i = 0;
  const result = [];
  const shuffleArray = shuffle([ ...arr ]);

  while(result.length < count) {
    let shift = 0;
    const sign = (i ? (Math.round(Math.random()) || (-1)) : 1);

    if(sign === 1) {
      shift = Math.ceil(Math.random() * (shuffleArray.length - i));
    } else {
      shift = Math.ceil(Math.random() * i);
    }

    i += sign * shift;

    if(i === shuffleArray.length) {
      i = shuffleArray.length - 1;
    }

    const [element] = shuffleArray.splice(i, 1);
    result.push(element);
  }
  return result;
}

export function debounce(f, ms) {

  let isCooldown = false;

  return function() {
    if (isCooldown) {
      return;
    }

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() =>{
      isCooldown = false;
    }, ms);
  };

}
