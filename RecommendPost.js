let mongoose         = require('mongoose');
mongoose.Promise     = global.Promise;


mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
let db = mongoose.connection;

db.on('error', () => {
    console.log('Connection Failed!');
});
db.once('open', () => {
    console.log('Connect!');
});


const user_define = mongoose.Schema({
    User_id: 'string',
    age: 'number',
    gender: 'bool'
})
const count_define = mongoose.Schema({
    board_id: 'number',
    User_id: 'string',
    Counting: 'number'

})
const Count = mongoose.model('Counting', count_define);
const User = mongoose.model('User_info', user_define);


exports.Recommend =(myId)=>{
    return new Promise((resolve,reject)=>{
        var posts=[]
        User.find({
            User_id : myId
        }).then((result)=>{
            return User.find()
                .select('User_id')
                .where('age').equals(result[0].age)
        }).then((User_id)=>{
            return Promise.all(User_id.map((user,idx,arr)=>{
                return Count.find()
                    .select('board_id')
                    .where('User_id').equals(user.User_id)
            }))
        }).then((Users_id)=>{
            Users_id.forEach(items=>{
                items.forEach(post=>{
                    posts.push(post.board_id)
                })
            })
        }).then(()=>{
            resolve (getMax(posts));
        })
    })
}


getMax = (posts) => {
    var rank = new Array()
    TestJson = []

    posts.forEach((value, index) => {
        if (rank[value] == undefined)
            rank[value] = 1;
        else
            rank[value]++;
    })

    rank.forEach((value, index) => {
        TestJson.push([index, value]);
    })

    TestJson.sort((lhs, rhs) => {
        return rhs[1] - lhs[1];
    });

    var recommend=[]
    for (var i = 0; i < 3; ++i) {
        recommend.push(TestJson[i][0]);
    }

    return recommend
}
