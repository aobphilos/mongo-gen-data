var networkId = ObjectId("60f750c1c4dd965f35cd8bdf");
// var networkId = ObjectId("60f750cbc4dd965f4a24daee");
// var networkId = ObjectId("60f750cdc4dd965f59272a0f");
// var networkId = ObjectId("60f750cfc4dd965f625093fd");
// var networkId = ObjectId("60f750cfc4dd965f6b5093fd");
// var networkId = ObjectId("60f750d0c4dd965f74233d51");

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