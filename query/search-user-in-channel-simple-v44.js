var networkId = ObjectId("60f750a5c4dd965edfb1c87e");
// var networkId = ObjectId("60f750aec4dd965ef4e5887b");
// var networkId = ObjectId("60f750b0c4dd965efd570e8b");
// var networkId = ObjectId("60f750b1c4dd965f06031a70");
// var networkId = ObjectId("60f750b2c4dd965f0fed2e3d");
// var networkId = ObjectId("60f750b2c4dd965f1eed2e3d");

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