var networkId = ObjectId("60f75077c4dd965e64667e15");
// var networkId = ObjectId("60f75087c4dd965e84f57856");
// var networkId = ObjectId("60f7508dc4dd965e99239048");
// var networkId = ObjectId("60f7508fc4dd965ea84d5914");
// var networkId = ObjectId("60f75090c4dd965eb1b4827f");
// var networkId = ObjectId("60f75090c4dd965ebab4827f");
// db.networks.distinct('_id')
// db.users.count({ networkId })

var channelId = ObjectId("60f75077c4dd965e64667e16");
// var channelId = ObjectId("60f75087c4dd965e84f57857");
// var channelId = ObjectId("60f7508dc4dd965e99239049");
// var channelId = ObjectId("60f7508fc4dd965ea84d5915");
// var channelId = ObjectId("60f75090c4dd965eb1b48280");
// var channelId = ObjectId("60f75090c4dd965ebab48280");
// db.channels.distinct('_id')
// db.channelusers.count({ channelId })

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