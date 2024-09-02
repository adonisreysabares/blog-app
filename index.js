import express from 'express'
import bodyParser from 'body-parser'
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

var blogPost = []
var nextId = 1

app.get('/',(req,res)=>{
    res.render('index', {
        post:blogPost
    })
})

app.post('/create', (req,res)=>{
    const {title, content} = req.body
    const newPost = {id: nextId++, title,content}
    blogPost.push(newPost)
    res.redirect('/')
})

app.put('/create:id', (req,res) => {

})

app.delete('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);
  
    if (postIndex !== -1) {
      posts.splice(postIndex, 1);
    }
  
    res.redirect('/')
  });

app.listen(port,()=>{
    console.log(`Server is listening http://localhost:${port}`)
})