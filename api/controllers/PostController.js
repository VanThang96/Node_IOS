//dummy data
const post1 = {
    id : 1,
    title : 'Post title 1',
    body  : 'Body of title 1'
}
const post2 = {
    id : 2,
    title : 'post tilte 2',
    body : 'body of title 2'
}
const post3 = {
    id : 3,
    title : 'post tilte 3',
    body : 'body of title 3'
}
const allPosts = [post1, post2, post3]

module.exports = {
    posts : function(req, res) {
        res.send(allPosts)
    },
    create : function(req ,res) {
        const title = req.param('title')
        const body = req.param('body')
        console.log(title + " " + body)
        const newPost = {
            id : 4,
            title : title,
            body : body
        }
        allPosts.push(newPost)
        res.end()
    },
    findById : function(req , res) {
        const postId = req.param('postId')

        const filterPost = allPosts.filter(p => {return p.id == postId})

        if (filterPost.length > 0) {
            res.send(filterPost[0])
        }else {
            res.send('Fail to find post id : ' + postId)
        }
    }
}