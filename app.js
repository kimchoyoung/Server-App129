// Before server start, you should install modules ==> 'body-parser', 'serve-static'

const express     = require ('express'), http=require('http'), path=require('path')
const app         = express()
const static      = require('serve-static')
const router      = express.Router()
const bodyParser  = require ('body-parser');
const mongoose    = require ('mongoose')

//default setting
app.use('/public', static(path.join(__dirname,'public'))) // 이레하면 /Users/ch02/WebstormProjects/bokgiking/public으로 접근 가능
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//DB setting
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
let db = mongoose.connection;
db.on('error', () => { console.log('Connection Failed!')})
db.once('open', () => { console.log('Connect!') })


const post_define=mongoose.Schema({
    Title: 'string',
    SubTitle: 'string',
    AppObj: 'string',
    Content: 'string',
    Method: 'string',
    Contact: 'string',
    Category: 'number',
    Counting: 'number'
})
const Post= mongoose.model('Welfare', post_define)


//code
app.use('/RecommendPostss',(req,res)=>{ //함수 제대로 안되어있음 ㅠㅠ 추천 함수.
    let getJS=require('./RecommendPost')
    let data=(getJS.promise(7))
    console.log(data);
})

app.use('/addUser', (req,res)=>{ //post로 받자
    let getJS =require('./mongo')
    let data =getJS.addUser(req) // parameter
})

app.use('/addLog', (req,res)=>{ //post로 받자
    let getJS =require('./mongo')
    let data =getJS.addLog(req) // parameter
})

app.use('/getWelfare',(req,res)=>{
    Post.find()
        .select('Title SubTitle AppObj Content Method Contact')
        .where('Title').equals(req.query.Title)
        .exec((err,items)=>{
            if(err) console.log("ERROR")

            console.log(items)
            res.header('Content-Type','application/json')
            res.end(JSON.stringify(items))
        })
})


app.use('/Ranking', (req,res)=>{

    Post.find()
        .limit(5)
        .select('Title SubTitle AppObj Content Method Contact')
        .sort({Counting: -1})
        .exec((err,items)=>{
            if(err) console.log("ERROR")

            console.log(items)
            res.header('Content-Type','application/json')
            res.end(JSON.stringify(items))
        })
})


app.use('/Category', (req,res)=>{
    Post.find()
        .where('Category').equals(req.query.Category)
        .select('Title SubTitle AppObj Content Method Contact')
        .exec((err,items)=>{
            if(err) console.log("ERROR")


            console.log(items)
            res.header('Content-Type','application/json')
            res.end(JSON.stringify(items))
        })
})

app.listen(3000, ()=>{
    console.log('server is starting')
})