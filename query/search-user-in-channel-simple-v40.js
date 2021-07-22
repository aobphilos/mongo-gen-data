var networkId = ObjectId("60f75077c4dd965e64667e15");
// var networkId = ObjectId("60f75087c4dd965e84f57856");
// var networkId = ObjectId("60f7508dc4dd965e99239048");
// var networkId = ObjectId("60f7508fc4dd965ea84d5914");
// var networkId = ObjectId("60f75090c4dd965eb1b4827f");
// var networkId = ObjectId("60f75090c4dd965ebab4827f");

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

