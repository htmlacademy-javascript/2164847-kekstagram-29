let photos = [];
let messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
   ' Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

let names = [
'Алексей', 'Андрей', 'Вячеслав', 'Антон', 'Марк', 'Александр',
'Артём', 'Георгий', 'Дмитрий', 'Сергей'
];
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

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
