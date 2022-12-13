import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/likes`;
const likeSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('like')));

export const likeService = {
    like: likeSubject.asObservable(),
    get likeValue () { return likeSubject.value },
    getAll,
    getById,
    update,
    delete: _delete
};

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {  //photo id
    console.log("getById like")
    const like = fetchWrapper.get(`${baseUrl}/${id}`);
    console.log(like.id)
    console.log(like.counts)
    return like;
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(x => {
            // update stored like if the like counts changes
            if (id === likeSubject.value.id) {
                // update local storage
                const like = { ...likeSubject.value, ...params };
                localStorage.setItem('like', JSON.stringify(like));

                // publish updated like to subscribers
                likeSubject.next(like);
            }
            return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
