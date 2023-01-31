// document type for comments written on posts
// author, comment
export default {
    name: 'comment',
    type: 'document',
    title: 'Comment',
    fields: [
        {
            name: 'author',
            type: 'author',
            title: 'Author',
        },
        {
            name: 'comment',
            type: 'string',
            title: 'Comment',
        },
    ]
}