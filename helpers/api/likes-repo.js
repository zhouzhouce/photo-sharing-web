import { timestamp } from 'rxjs';

const fs = require('fs');

// likes in JSON file for simplicity, store in a db for production applications
let likes = require('data/likes.json');

export const likesRepo = {
    getAll: () => likes,
    getById: id => likes.find(x => x.id.toString() === id.toString()),
    find: x => likes.find(x),
    create,
    update,
    delete: _delete
};

function create(phtoId, counts) {
    // generate new like id
    let like = {};
    like.id = phtoId;
    like.counts = counts;

    // set date created and updated
    like.timeCreated = new timestamp().toISOString();
    like.timeUpdated = new timestamp().toISOString();

    // add and save like
    likes.push(like);
    saveData();
}

function update(id, params) {
    const like = likes.find(x => x.id.toString() === id.toString());

    // set date updated
    like.timeUpdated = new timestamp().toISOString();

    // update and save
    Object.assign(like, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted like and save
    likes = likes.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/likes.json', JSON.stringify(likes, null, 4));
}