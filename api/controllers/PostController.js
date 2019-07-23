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
    posts : async function(req, res) {
        Post.find().exec(function(err,posts){
            res.send(posts)
        })
        try {
            const posts = await Post.find()
            res.send(posts)
        }catch(err){
            res.serverError(err.toString())
        }
    },
    create : function(req ,res) {
        const title = req.body.title
        const body = req.body.body
        sails.log.debug('My title : ' + title + 'My body : ' + body)

        Post.create({title : title , body : body}).exec(function(err) {
            if (err) {
                return res.serverError(err.toString())
            }
            console.log('Finish creating post object')
            return res.redirect('/home')
        })
        // res.end()
    },
    findById : function(req , res) {
        const postId = req.param('postId')

        const filterPost = allPosts.filter(p => {return p.id == postId})

        if (filterPost.length > 0) {
            res.send(filterPost[0])
        }else {
            res.send('Fail to find post id : ' + postId)
        }
    },
    delete : async function(req,res){
        const postId = req.param('postId')
        await Post.destroy({id : postId})
        res.send('Finish delete')
    }
}