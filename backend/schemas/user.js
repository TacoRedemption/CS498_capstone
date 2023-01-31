// document type for user information
// username, image
export default {
    name: 'user',
    type: 'document',
    title: 'User',
    fields: [
        {
            name: 'username',
            type: 'string',
            title: 'Username',
        },
        {
            name: 'image',
            type: 'string',
            title: 'Image',
        },
    ]
}