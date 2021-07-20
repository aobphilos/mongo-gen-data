[
  {
    "database": "eko-messaging",
    "collection": "networks",
    "count": numberOfNetworks,
    "content": {
      "_id": {
        "type": "ref",
        "id": 1,
        "refContent": {
          "type": "objectId"
        }
      },
      "name": { "type": "faker", "unique": true, "method": "Company" },
      "createdAt": {
        "type": "date",
        "startDate": "2016-01-10T00:00:00+00:00",
        "endDate": "2021-07-31T00:00:00+00:00"
      },
      "updatedAt": {
        "type": "date",
        "startDate": "2016-01-10T00:00:00+00:00",
        "endDate": "2021-07-31T00:00:00+00:00"
      }
    }
  },
  {
    "database": "eko-messaging",
    "collection": "channels",
    "count": numberOfChannels,
    "content": {
      "_id": {
        "type": "ref",
        "id": 2,
        "refContent": {
          "type": "objectId"
        }
      },
      "networkId": { "type": "ref", "id": 1 },
      "publicId": { "type": "uuid" },
      "createdAt": {
        "type": "date",
        "startDate": "2016-01-10T00:00:00+00:00",
        "endDate": "2021-07-31T00:00:00+00:00"
      },
      "updatedAt": {
        "type": "date",
        "startDate": "2016-01-10T00:00:00+00:00",
        "endDate": "2021-07-31T00:00:00+00:00"
      },
      "isDistinct": { "type": "boolean" },
      "lastActivity": {
        "type": "date",
        "startDate": "2016-01-10T00:00:00+00:00",
        "endDate": "2021-07-31T00:00:00+00:00"
      },
      "messageCount": { "type": "int" },
      "rateLimit": { "type": "int" },
      "rateLimitWindow": { "type": "int" },
      "tags": { "type": "array" },
      "type": { "type": "string" },
      "hasFlaggedMessage": { "type": "boolean" },
      "autoDeleteMessageByFlagLimit": { "type": "int" },
      "messageAutoDeleteEnabled": { "type": "boolean" },
      "isCommunity": { "type": "boolean" },
      "isDeleted": { "type": "boolean" }
    }
  },
  {
    "database": "eko-messaging",
    "collection": "users",
    "count": numberOfUsers,
    "content": {
      "_id": {
        "type": "ref",
        "id": 3,
        "refContent": {
          "type": "objectId"
        }
      },
      "networkId": { "type": "ref", "id": 1 },
      "publicId": { "type": "faker", "method": "Username" },
      "createdAt": {
        "type": "date",
        "startDate": "2016-01-10T00:00:00+00:00",
        "endDate": "2021-07-31T00:00:00+00:00"
      },
      "updatedAt": {
        "type": "date",
        "startDate": "2016-01-10T00:00:00+00:00",
        "endDate": "2021-07-31T00:00:00+00:00"
      },
      "displayName": { "type": "faker", "method": "Name" },
      "roleIds": { "type": "array" },
      "flagCount": { "type": "int" },
      "flags": { "type": "array" },
      "isAdmin": { "type": "boolean" }
    }
  },
  {
    "database": "eko-messaging",
    "collection": "channelusers",
    "count": numberOfChannelUsers,
    "content": {
      "_id": { "type": "objectId" },
      "networkId": { "type": "ref", "id": 1 },
      "channelId": { "type": "ref", "id": 2 },
      "userId": { "type": "ref", "id": 3 },
      "isBanned": { "type": "boolean" },
      "isModerator": { "type": "boolean" },
      "membership": { "type": "string" },
      "rateLimit": { "type": "int" },
      "rateLimitWindow": { "type": "int", "minInt": 60000, "maxInt": 60000 },
      "readToSegment": { "type": "int", "minInt": 60000, "maxInt": 60000 },

      "createdAt": {
        "type": "date",
        "startDate": "2016-01-10T00:00:00+00:00",
        "endDate": "2021-07-31T00:00:00+00:00"
      },
      "updatedAt": {
        "type": "date",
        "startDate": "2016-01-10T00:00:00+00:00",
        "endDate": "2021-07-31T00:00:00+00:00"
      },
      "lastActivity": {
        "type": "date",
        "startDate": "2016-01-10T00:00:00+00:00",
        "endDate": "2021-07-31T00:00:00+00:00"
      },
      "lastJoin": {
        "type": "date",
        "startDate": "2016-01-10T00:00:00+00:00",
        "endDate": "2021-07-31T00:00:00+00:00"
      },
      "roleIds": { "type": "array" }
    }
  }
]
