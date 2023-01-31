// document type for saving posts
// author, uid
export default {
    name: 'save',
    type: 'document',
    title: 'Save',
    fields: [
        {
            name: 'author',
            type: 'author',
            title: 'Author',
        },
        {
            name: 'uid',
            type: 'string',
            title: 'UID',
        },
    ]
}