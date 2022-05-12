const fs = require('fs');

fs.readFile('sample.txt', 'utf8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

// 문법 연습