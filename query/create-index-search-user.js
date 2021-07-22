db.users.createIndex(
  { networkId: 1, displayNameTokenize: "text", publicIdTokenize: "text" },
  {
    name: "fts-user",
    background: true,
    collation: { locale: "simple" },
    default_language: "none",
    weights: {
      displayNameTokenize: 10,
      publicIdTokenize: 5,
    },
  }
);

db.users.createIndex(
  { networkId: 1, displayName: 1, publicId: 1 },
  { name: "find-user", background: true }
);

db.channelusers.createIndex(
  { userId: 1, channelId: 1 },
  { name: "find-user-channel", background: true }
);
