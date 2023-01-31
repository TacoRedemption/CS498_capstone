// document type for online image post
// title, description, destination, category, image, uid, author, save, comments
export default {
    name: 'post',
    type: 'document',
    title: 'Post',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title',
        },
        {
            name: 'description',
            type: 'string',
            title: 'Description',
        },
        {
            name: 'destination',
            type: 'url',
            title: 'Destination',
        },
        {
            name: 'category',
            type: 'string',
            title: 'Category',
        },
        {
            name: 'image',
            type: 'image',
            title: 'Image',
            options: {
                hotspot: true // enable specific cropping specifications of image when resizing
            }
        },
        {
            name: 'uid',
            type: 'string',
            title: 'UID',
        },
        {
            name: 'author',
            type: 'string',
            title: 'Author',
        },
        {
            name: 'save',
            type: 'array',
            title: 'Save',
            of: [{type: 'save'}]
        },
        {
            name: 'comments',
            type: 'array',
            title: 'Comments',
            of: [{type: 'comment'}]
        },
    ]
}