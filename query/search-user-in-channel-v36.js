var networkId = ObjectId("60f75030c4dd965dd398a273");
// var networkId = ObjectId("60f75035c4dd965de2d65fae");
// var networkId = ObjectId("60f75037c4dd965df1e9693b");
// var networkId = ObjectId("60f75037c4dd965dfae9693b");
// var networkId = ObjectId("60f75038c4dd965e037b25a1");
// var networkId = ObjectId("60f75038c4dd965e0c7b25a1");
// db.networks.distinct('_id')
// db.users.count({ networkId })

var channelId = ObjectId("60f75030c4dd965dd398a274");
// var channelId = ObjectId("60f75035c4dd965de2d65faf");
// var channelId = ObjectId("60f75037c4dd965df1e9693c");
// var channelId = ObjectId("60f75037c4dd965dfae9693c");
// var channelId = ObjectId("60f75038c4dd965e037b25a2");
// var channelId = ObjectId("60f75038c4dd965e0c7b25a2");
// db.channels.distinct('_id')
// db.channelusers.count({ channelId })

// 1K ~ 0.06 s
// 5K ~ 0.08 s
// 10K ~ 0.11 s
// 50K ~ 0.20 s
// 100K ~ 0.22 s
// 500K ~ 0.25 s
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