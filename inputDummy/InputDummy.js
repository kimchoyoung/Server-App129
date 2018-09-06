const mongoose         = require('mongoose')
const bodyParser  = require ('body-parser');
const request = require('request')


mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
let db = mongoose.connection;
db.on('error', () => { console.log('Connection Failed!')})
db.once('open', () => { console.log('Connect!') })

const post_define=mongoose.Schema({
    lecture_name: 'string',
    lecture_comp: 'string',
    lecture_area: 'string',
    lecture_call: 'string',
    lecture_fee: 'string',
    lecture_pay: 'string',
    lecture_term: 'string',
    lecture_time: 'string',
    lecture_num: 'string',
    support_qua: 'string',
    support_dcm: 'string',
    support_intro: 'string',
    support_content: 'string',
    support_course: 'string',
    support_cer: 'string',
    support_teacher: 'string',
    counting : 'number',
    category : 'number'
})

const Post= mongoose.model('Welfare', post_define)


let func=()=>{
    let getJS =require('./InputDummy')
    var options = { method: 'GET',
        url: 'http://73aabd37.ngrok.io/all',
        headers:
            { 'Postman-Token': 'af580449-b85c-489e-a23b-940b3c9f151f',
                'Cache-Control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        json_data =JSON.parse(body);

        json_data.forEach((value, idx, arr)=>{
            let c = Math.floor(Math.random()*35)+1

            const newPost= new Post({
                lecture_name: value.lecture_name,
                lecture_comp: value.lecture_comp,
                lecture_area: value.lecture_area,
                lecture_call: value.lecture_call,
                lecture_fee: value.lecture_fee,
                lecture_pay: value.lecture_fee,
                lecture_term: value.lecture_term,
                lecture_time: value.lecture_time,
                lecture_num: value.lecture_num,
                support_qua: value.support_qua,
                support_intro: value.support_intro,
                support_content: value.support_content,
                support_course: value.support_course,
                support_cer: value.support_cer,
                support_teacher: value.support_teacher,
                counting : c,
                category : 1
            })


            newPost.save((err, data)=> {
                if (err) console.log(err);
                else console.log('new Log is Added!')
            })

        })
    })
}

func();

