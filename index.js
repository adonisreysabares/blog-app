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

app.get('/create', (req,res)=>{
    res.render('create')
})

app.post('/create', (req,res)=>{
    const {title, content} = req.body
    const newPost = {id: nextId++, title,content}
    blogPost.push(newPost)
    res.redirect('/')
})

app.get('/edit/:id', (req, res) => {
    const { id } = req.params
    const post = blogPost.find(p => p.id == id);
    if (post) {
        res.render('edit', { post })
    } else {
        res.status(404).send('Post not found')
    }
})

app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = blogPost.find(p => p.id == id);
    if (post) {
        post.title = title;
        post.content = content;
        res.redirect('/');
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/delete/:id', (req, res) => {
    const { id } = req.params
    blogPost = blogPost.filter(post => post.id != id)
    res.redirect('/')
});

app.listen(port,()=>{
    console.log(`Server is listening http://localhost:${port}`)
})