const mongoose         = require('mongoose')
const bodyParser  = require ('body-parser');

addWelfare =()=>{

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
    const newPost= new Post({
        Title: '민영교통시설이용',
        SubTitle: '국가를 위해 희생하고 공헌한 애국지사, 국가유공상이자 등의 예우 및 복지향상을 위해 민영버스 및 내항여객선, 열차 등 교통시설의 무임 또는 할인을 지원합니다.',
        AppObj: '애국지사, 국가유공상이자(1급~7급), 5.18민주화운동 부상자(1급~14급)를 지원합니다.',
        Content: '민영버스, 내항여객선, 고속철도를 무료 또는 감면하여 이용할 수 있습니다',
        Method: '거주지역의 보훈관서에 신청합니다.',
        Contact: '국가보훈처 보훈상담센터 ☎ 1577-0606',
        Category: 3,
        Counting: 10
    })


    newPost.save((err, data)=> {
        if (err) console.log(err);
        else console.log('new Log is Added!')
    })
}


addWelfare();