var Promise = require('promise');
var mongoose         = require('mongoose');



exports.promise = (user_id)=> {
    return new Promise(function (resolve, reject) {

        max_idx_record=[];
        rank = Array.apply(null, Array(50)).map(Number.prototype.valueOf,0);
        record=[];

        mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
        let db = mongoose.connection;

        db.on('error', () => {
            console.log('Connection Failed!');
        });
        db.once('open', () => {
            console.log('Connect!');
        });

        let myId = user_id; // assume my user_id is 5

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


        User.find({User_id: myId}, (err, docs) => {
            let low = docs[0].age - 3;
            let high = docs[0].age + 3;
            let cnt = 0;
            User.find({age: {$gt: low, $lt: high}}, (err, doc) => {

                var xx = 1;
                var arr = [];

                let i = 0, p = Promise.resolve();

                doc.forEach((selected_user, index, array) => {
                    if (i < array.length) {
                        Count.find({User_id: selected_user.User_id}, (err, dddd) => {

                            dddd.forEach((value, idx, arr) => {
                                rank[value.board_id]++;
                            });


                            if (i == doc.length - 1) {
                                for (k = 0; k < 3; ++k) {
                                    max_idx = getMAX(rank);
                                    max_idx_record.push(max_idx);
                                    if(k===2) {
                                        console.log(max_idx_record);
                                    }
                                }
                            }
                            i++;
                        })
                    }
                });

            });
        });
    })
}

let getMAX= function(rank){
    max=0;
    max_idx=0;
    for(j=0; j<rank.length; ++j) {
        if (max < rank[j]) {
            max = rank[j]
            max_idx = j;
        }
    }

    rank[max_idx]=0;
    return max_idx;
}



