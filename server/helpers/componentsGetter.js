const fs = require('fs');
const path = require('path');

module.exports = type => {
    const fileList = [];

    fs
        .readdirSync(`${__dirname}/../entries`)
        .filter(file => (file.slice(-3) !== '.js'))
        .forEach(folder => {
            fs.readdirSync(path.join(`${__dirname}/../entries`, folder))
                .filter(file => file.slice(-(type.length + 3)) === `${type}.js`)
                .forEach(file => {
                    fileList.push({
                        folder,
                        file,
                    });
                });
        });

    return fileList;
};
