import { messages, names } from './data.js';
import { getRandomInt } from './util.js';

let photos = [];

for(let i = 1; i <= 25; i++) {
    let comments = [];

    for(let j = 0; j < getRandomInt(0, 30); j++) {
        let message = messages[getRandomInt(0, 500) % messages.length]
        let name = names[getRandomInt(0, 500)% names.length]
        comments.push({
            id: j,
            url: `img/avatar-${getRandomInt(0, 7)}.svg`,
            message,
            name: name,
        });
    }

    photos.push({
        id: i,
        url: `photos/${i}.jpg`,
        description: `мандарин`,
        likes: getRandomInt(15, 200),
        comments: comments
    });
}

console.log(photos);
