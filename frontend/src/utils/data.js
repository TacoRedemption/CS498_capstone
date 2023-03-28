// get all info of user of given userID from Sanity
export const userQuery = (userID) => {
    const query = `*[_type == "user" && _id == '${userID}']`;
    return query;
}

// query to get posts matching given searchTerm
// returns post image url, id, author info
// array of users who have saved the post
export const searchQuery = (searchTerm) => {
    const query = `*[_type == "post" && title match '${searchTerm}*' || artform match '${searchTerm}*' || about match '${searchTerm}*']{
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
            image
        },
        save[] {
            _key,
            author -> {
                id,
                username,
                image
            },
        },
    }`

    return query
}

// query to get all posts for feed
export const feedQuery = `*[_type == 'post'] | order(_createAt desc) {
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
        image
    },
    save[] {
        _key,
        author -> {
            id,
            username,
            image
        },
    },
}`