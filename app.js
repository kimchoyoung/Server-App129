// Before server start, you should install modules ==> 'body-parser', 'serve-static'
const express     = require ('express'), http=require('http'), path=require('path')
const app         = express()
const router      = express.Router()
const bodyParser  = require ('body-parser');
const mongoose    = require ('mongoose')
const request     = require('request')
const normalizePort = require('normalize-port')

//default setting
//app.use('/public', static(path.join(__dirname,'public'))) // 이레하면 /Users/ch02/WebstormProjects/bokgiking/public으로 접근 가능
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//DB setting
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
var db = mongoose.connection;
db.on('error', () => { console.log('Connection Failed!')})
db.once('open', () => { console.log('Connect!') })

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

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


app.use('/inputDummy',(req,res)=>{
    var getJS= require('./inputDummy/Testing')
    var data=(getJS.addUser(req))
})

//code
app.use('/RecommendPosts',(req,res)=>{
    var getJS=require('./RecommendPost')
    var _promise = function () {
        return new Promise((resolve, reject) => {
            getJS.Recommend(req.query.User_id).then((data) => {
                resolve(data);
            })
        })
    }
    _promise().then((data) => { console.log(data) });
})

app.use('/supportEducation', (req,res)=>{
    var request = require("request");
    var options = { method: 'GET',
        url: 'http://crawling.paas-ta.co.kr/search',
        qs: { lecture_name: req.query.lecture_name },
        };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
    });
})



app.use('/addUser', (req,res)=>{ //post
    var getJS =require('./mongo')
    var data =getJS.addUser(req) // parameter
})

app.use('/addLog', (req,res)=>{ //post
    var getJS =require('./mongo')
    var data =getJS.addLog(req) // parameter
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

cmp =(a,b)=>{
    if(a.Title==b.Title) return 0
    return a.Title > b.Title ? 1:-1
}


app.use('/Category', (req,res)=>{
    Post.find()
        .where('Category').equals(req.query.Category)
        .exec((err,items)=>{
            if(err) console.log("ERROR")

            items.sort(cmp)

            console.log(items)
            res.header('Content-Type','application/json')
            res.end(JSON.stringify(items))
        })

})

app.use('/delete', (req,res)=>{
    Post.findByIdAndRemove(req.query.category)
        .where('category').equals(1)
        .exec((err,user)=>{
            if(err) throw err;
            console.log(removed);
        })
})

app.use('/getInfo', (req,res)=>{
    Post.find()
        .where('lecture_name').equals(req.query.lecture_name)
        .exec((err,items)=>{
            if(err) console.log("ERROR")


            console.log(items)
            res.header('Content-Type','application/json')
            res.end(JSON.stringify(items))
        })
})



module.exports=app;

app.listen(app.get('port'), ()=>{
    console.log('server is starting')
})


