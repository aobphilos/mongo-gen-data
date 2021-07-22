// var networkId = ObjectId("60f750c1c4dd965f35cd8bdf");
// var networkId = ObjectId("60f750cbc4dd965f4a24daee");
// var networkId = ObjectId("60f750cdc4dd965f59272a0f");
// var networkId = ObjectId("60f750cfc4dd965f625093fd");
var networkId = ObjectId("60f750cfc4dd965f6b5093fd");
// var networkId = ObjectId("60f750d0c4dd965f74233d51");
// db.networks.distinct('_id')
// db.users.count({ networkId })

// var channelId = ObjectId("60f750c1c4dd965f35cd8be0");
// var channelId = ObjectId("60f750cbc4dd965f4a24daef");
// var channelId = ObjectId("60f750cdc4dd965f59272a10");
// var channelId = ObjectId("60f750cfc4dd965f625093fe");
var channelId = ObjectId("60f750cfc4dd965f6b5093fe");
// var channelId = ObjectId("60f750d0c4dd965f74233d52");
// db.channels.distinct('_id')
// db.channelusers.count({ channelId })

// 1K ~ 0.015 s [avg ~0.006 s]
// 5K ~ 0.025 s [avg ~0.010 s]
// 10K ~ 0.016 s [avg ~0.014 s]
// 50K ~ 0.028 s [avg ~0.028 s]
// 100K ~ 0.048 s [avg ~0.036 s]
// 500K ~ 0.104 s [avg ~0.075 s]

var char1 = 'Pr'

db.users.aggregate([
{
    $match: { 
        
            networkId,
            $or: [ 
               { displayName: { $regex: new RegExp(`^${char1}`, 'i') } }, 
               { publicId:    { $regex: new RegExp(`^${char1}`, 'i') } } 
            ]
        
    }
},
{
    $lookup: {
       from: 'channelusers',
       localField: '_id',
       foreignField: 'userId',
       as: 'channelusers'
    }
},
{
    $unwind: '$channelusers'
},    
{
    $match: {
        "channelusers.channelId": channelId
    }
},
{
    $project: {
        _id: 0,
        publicId: 1,
        displayName: 1
    }
},  
{
    $sort: { displayName: 1, publicId: 1 }
},
{
    $limit: 20
}
],
{
//     collation: { locale: 'en', strength: 2 },
    allowDiskUse: true,
    explain: false
})

db.users.aggregate([
{
    $match: { 
        $and: [
            { networkId },
            { $text: { $search: char1 }}
        ]
    }
},
{
    $lookup: {
       from: 'channelusers',
       localField: '_id',
       foreignField: 'userId',
       as: 'channelusers'
    }
},
{
    $unwind: '$channelusers'
},    
{
    $match: {
        "channelusers.channelId": channelId
    }
},
{
    $project: {
        _id: 0,
        publicId: 1,
        displayName: 1,
        score: { $meta: "textScore" }  
    }
},
// {
//     $count: 'Total'
// }    
{
    $sort: { score: { $meta: "textScore" }  }
},
{
    $limit: 20
}
],
{
//     collation: { locale: 'en', strength: 2 },
    allowDiskUse: true,
    explain: false
})

// db.channelusers.createIndex({ networkId: 1, userId: 1, channelId: 1 }, { background: true })
// db.channelusers.createIndex({ networkId: 1, channelId: 1, userId: 1 }, { background: true })
// db.channelusers.createIndex({ userId: 1, networkId: 1, channelId: 1 }, { background: true })
// db.channelusers.createIndex({ userId: 1, channelId: 1, networkId: 1 }, { background: true })
// db.channelusers.createIndex({ channelId: 1, userId: 1, networkId: 1 }, { background: true })
// db.channelusers.createIndex({ channelId: 1, networkId: 1, userId: 1 }, { background: true })
// db.channelusers.createIndex(
//   { userId: 1, channelId: 1},
//   { name: "find-user-channel", background: true }
// );
//   db.channelusers.dropIndexes()
// db.channelusers.aggregate([{ $indexStats: {} }, { $sort: { 'accesses.ops': -1 } }]);