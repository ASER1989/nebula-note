const fs = require('fs');
const path = require('path');

function isFileExisted(filePath) {
    return new Promise((resolve, reject) => {
        fs.access(filePath, (err) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function isFileExistedSync(filePath) {
    return fs.accessSync(filePath);
}

function mkdir(destPath) {
    return new Promise((resolve, reject) => {
        isFileExisted(destPath).then((isExist) => {
            if (!isExist) {
                fs.mkdirSync(destPath);
            }
            resolve();
        });
    });
}

function writeFile(filePath, content) {
    return new Promise((resolve, reject) => {
        const dirname = path.dirname(filePath);
        isFileExisted(dirname).then((isExist) => {
            if (!isExist) {
                fs.mkdirSync(dirname);
            }

            fs.writeFile(filePath, content, {recursive: true}, (error) => {
                if (error) {
                    reject(error);
                }
                resolve('success');
            });
        });
    });
}

function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    })

}

function readFileSync(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}

function getFileList(dirPath) {
    const files = fs.readdirSync(dirPath, {withFileTypes: true});
    const fileList = files
        .filter((item) => item.isFile());
    return fileList;
}

module.exports = {
    isFileExisted,
    isFileExistedSync,
    writeFile,
    readFile,
    readFileSync,
    getFileList,
    mkdir
};
