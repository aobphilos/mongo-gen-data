var minGram = 1;
var maxGram = 10;
var separator = " ";

function tokenize(str) {
  return str
    .slice(0, 10)
    .split(separator)
    .reduce((memo, token) => {
      for (var i = minGram; i <= maxGram && i <= token.length; ++i) {
        memo = [...memo, token.substr(0, i)];
      }
      return memo;
    }, []);
}

var round = 0;
var base = 0;

var limit = 100000;
var skip = base + limit * round;
var batchSize = 800;
var bucket = [];

function updateSet(items) {
  print("updateSet: ", items.length);
  try {
    db.users.bulkWrite(items);
  } catch (e) {
    print(e);
  }
}

var users = db.users
  .find()
  .skip(skip)
  .limit(limit)
  .batchSize(batchSize)
  .forEach((u) => {
    var updateItem = {
      updateOne: {
        filter: { _id: u._id },
        update: {
          $set: {
            publicIdTokenize: tokenize(u.publicId || "").join(" "),
            displayNameTokenize: tokenize(u.displayName || "").join(" "),
          },
        },
      },
    };

    bucket.push(updateItem);

    if (bucket.length >= batchSize) {
      updateSet([...bucket]);
      bucket.splice(0, bucket.length);
    }
  });

// Final call for the rest
if (bucket.length > 0) {
  updateSet([...bucket]);
  bucket = [];
  print("end update");
}
