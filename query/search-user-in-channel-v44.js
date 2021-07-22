var networkId = ObjectId("60f750a5c4dd965edfb1c87e");
// var networkId = ObjectId("60f750aec4dd965ef4e5887b");
// var networkId = ObjectId("60f750b0c4dd965efd570e8b");
// var networkId = ObjectId("60f750b1c4dd965f06031a70");
// var networkId = ObjectId("60f750b2c4dd965f0fed2e3d");
// var networkId = ObjectId("60f750b2c4dd965f1eed2e3d");
// db.networks.distinct('_id')
// db.users.count({ networkId })

var channelId = ObjectId("60f750a5c4dd965edfb1c87f");
// var channelId = ObjectId("60f750aec4dd965ef4e5887c");
// var channelId = ObjectId("60f750b0c4dd965efd570e8c");
// var channelId = ObjectId("60f750b1c4dd965f06031a71");
// var channelId = ObjectId("60f750b2c4dd965f0fed2e3e");
// var channelId = ObjectId("60f750b2c4dd965f1eed2e3e");
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