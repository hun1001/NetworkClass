const fs = require('fs');

fs.readdir('NetworkClass', function (err, file_list) {
    console.log(file_list);
});

// 이런식을로 파일 목록을 읽어올 수 있음