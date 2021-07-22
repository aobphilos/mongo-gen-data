
var networkId = ObjectId("60f75030c4dd965dd398a273");
// var networkId = ObjectId("60f75035c4dd965de2d65fae");
// var networkId = ObjectId("60f75037c4dd965df1e9693b");
// var networkId = ObjectId("60f75037c4dd965dfae9693b");
// var networkId = ObjectId("60f75038c4dd965e037b25a1");
// var networkId = ObjectId("60f75038c4dd965e0c7b25a1");

var char1 = 'Pr';

db.users.find({
    networkId,
    $or: [ 
       { displayName: { $regex: new RegExp(`^${char1}`, 'i') } }, 
       { publicId:    { $regex: new RegExp(`^${char1}`, 'i') } } 
    ]
},
{ _id: 0, displayName: 1, publicId: 1})
.sort({ displayName: 1, publicId: 1 })
// .skip(0)
// .limit(20)
// .explain(2)

db.users
.find({ networkId, $text: { $search: char1 } }, { _id: 0, displayName: 1, publicId: 1, score: { $meta: "textScore" }})
// .collation({ locale: 'en'})
.sort({ score: { $meta: "textScore" }  })
// .skip(0)
// .limit(20)
// .explain(2)

