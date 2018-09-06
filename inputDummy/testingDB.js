var Promise = require('promise');
var mongoose         = require('mongoose');

    mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
    let db = mongoose.connection;

    db.on('error', () => {
        console.log('Connection Failed!');
    });
    db.once('open', () => {
        console.log('Connect!');
    });

    let myId = 7; // assume my user_id is 5

    const user_define = mongoose.Schema({
        User_id: 'string',
        age: 'number',
        gender: 'bool'
    });
    const count_define = mongoose.Schema({
        board_id: 'number',
        User_id: 'string',
        Counting: 'number'

    });
    const Count = mongoose.model('Counting', count_define);
    const User = mongoose.model('User_info', user_define);


    let my_age=0;
    function getMyage() {
        return new Promise(
            (resolve, reject) => {
                User.find()
                    .select('age')
                    .where('User_id').equals(myId)
                    .exec((err, res) => {
                        console.log(res)
                        this.my_age = res[0].age
                        console.log(res[0].age)
                    })
            })
    }


    getMyage().then(console.log("HI"));


// let SameAgePeople=[];
//
// function getSameAge() {
//     console.log("HI");
//     User.find()
//         .select('User_id')
//         .where('age').equals([my_age - 3, my_age + 3])
//         .exec((err, res)=>{
//             console.log(res);
//             this.SameAgePeople=res;
//         })
// }
