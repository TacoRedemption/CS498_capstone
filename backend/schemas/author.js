// document type for referencing user who created a post/comment
// one-to-one relationship
export default {
    name: 'author',
    type: 'reference',
    title: 'Author',
    to: [{type: 'user'}]
}