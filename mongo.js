const mongoose         = require('mongoose')
const bodyParser  = require ('body-parser');

exports.addUser =(req)=>{
    mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
    let db = mongoose.connection;
    db.on('error', () => { console.log('Connection Failed!')})
    db.once('open', () => { console.log('Connect!') })

    //define Schema
    const user_define = mongoose.Schema({
        User_id: 'number',
        email: 'string',
        pwd: 'string',
        name: 'string',
        birth: 'string',
        gender: 'bool', //0 is male 1 is female.
        married: 'bool', // 0 is not-married 1 is married
        employed: 'bool',
        income_division: 'number',
        final_edu: 'string'
    });
    const User=mongoose.model('User_info', user_define)


    let newUser=new User({
        email:req.body.email,
        pwd:req.body.pwd,
        name:req.body.name,
        birth: req.body.birth,
        gender: req.body.gender,
        married: req.body.married,
        employed: req.body.employed,
        income_division: req.body.income_division,
        final_edu: req.body.final_edu
    })

    newUser.save((err, data)=> {
        if (err) console.log(err);
        else console.log('User Info is Added!')
    })


    //For Making Dummy Data
    /*

        for(i=0; i<50; ++i){

            let _age = Math.floor(Math.random()*16)+19 // 19~35살
            let _g=Math.floor(Math.random()*10);
            _g= (_g%2);

            let newUser= new User({User_id:i ,age:_age ,gender:_g });

            newUser.save((err,data)=>{
                if(err) throw (err);
                else console.log('Saved!! ');
            });

        }
     */

}

exports.addWelfare =()=>{

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

    // 추후에 API 가져와서 추가하는 것.
}

exports.addLog =(req)=>{
    mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
    let db = mongoose.connection;
    db.on('error', () => { console.log('Connection Failed!')})
    db.once('open', () => { console.log('Connect!') })

    const Log_Define=mongoose.Schema({
        post_Title: 'string',
        User_id: 'string'
    })

    console.log(req.query)
    const Log= mongoose.model('Logs', Log_Define)
    let newLog= new Log({
        post_Title: req.query.post_Title,
        User_id: req.query.User_id
    })


    newLog.save((err, data)=> {
        if (err) console.log(err);
        else console.log('new Log is Added!')
    })


    //AddDummyLog
    /*
    *
        for(i=0; i<50; ++i) {

            let p_id=Math.floor(Math.random()*50);
            let u_id=Math.floor(Math.random()*50);
            let num=0

            let newCount=new Count({post_Title:p_id, User_id:u_id});
            newCount.save((err, data)=>{
                if(err) console.log(err);
                else console.log('new Log Saved!');
            });
        };
    *
    * */

}

