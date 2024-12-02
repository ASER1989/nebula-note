const fs = require('fs');
const path = require('path');

function isPathExisted(filePath) {
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

function isPathExistedSync(filePath) {
    try {
        fs.accessSync(filePath);
        return true;
    } catch (ex) {
        return false;
    }
}

function mkdir(destPath) {
    return new Promise((resolve, reject) => {
        isPathExisted(destPath).then((isExist) => {
            if (!isExist) {
                fs.mkdirSync(destPath, { recursive: true });
            }
            resolve();
        });
    });
}

function writeFile(filePath, content) {
    return new Promise((resolve, reject) => {
        const dirname = path.dirname(filePath);
        isPathExisted(dirname).then((isExist) => {
            if (!isExist) {
                fs.mkdirSync(dirname, { recursive: true });
            }

            fs.writeFile(filePath, content, { recursive: true }, (error) => {
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
    });
}

function readFileSync(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}

function getFileList(dirPath) {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    return files.filter((item) => item.isFile());
}

function rename(oldPath, newPath) {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, (error) => {
            if (error) {
                reject(error);
            }
            resolve('success');
        });
    });
}

function isDirectoryEmptySync(dirPath) {
    try {
        const files = fs.readdirSync(dirPath);
        return files.length === 0;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    isPathExisted,
    isPathExistedSync,
    writeFile,
    readFile,
    readFileSync,
    getFileList,
    rename,
    mkdir,
    isDirectoryEmptySync
};
