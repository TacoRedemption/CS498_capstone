import { client } from "../client";

// get all info of user of given userID from Sanity
export const userQuery = (userID) => {
    const query = `*[_type == "user" && _id == '${userID}']`;
    return query;
}

// get all info of user of given email from Sanity
export const userQueryEmail = (email) => {
    const query = `*[_type == "user" && email == '${email}']`;
    return query;
}


// function to get user info from local storage
export const fetchUser = () => {
    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    return userInfo;
}

// query to get posts matching given searchTerm
// returns post image url, id, author info
// array of users who have saved the post
export const searchQuery = (searchTerm) => {
    const query = `*[_type == 'post' && !(_id in path('drafts.**')) && (title match '${searchTerm}*' || artform match '${searchTerm}*' || description match '${searchTerm}*')]{
        image {
            asset -> {
                url
            }
        },
        _id,
        destination,
        author -> {
            _id,
            username,
            image,
            email
        },
        save[] {
            _key,
            author -> {
                _id,
                username,
                image,
                email
            },
        },
    }`

    return query
}

// query to get all posts for feed
export const feedQuery = `*[_type == 'post' && !(_id in path('drafts.**'))] | order(_createAt desc) {
    image {
        asset -> {
            url
        }
    },
    _id,
    destination,
    author -> {
        _id,
        username,
        image,
        email
    },
    save[] {
        _key,
        author -> {
            _id,
            username,
            image,
            email
        },
    },
}`