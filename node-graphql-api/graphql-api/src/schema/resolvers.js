import { Storage } from "@google-cloud/storage";
import { gql } from "apollo-server-express";
import path from "path";

let Data = [];

export const Query = {
  getUser: () => {
    return Data;
  },
};

const removeWhiteSpaces = (name) => {
  let newName = name.replace(/\s+/g, "");

  return newName;
};

export const Mutation = {
  createUser: async (_, { username, image }) => {
    const bucketName = "node-graphql-application"; // our GCS bucket name, should be in kept in our .env file

    const storage = new Storage({
      keyFilename: path.join(__dirname, "../remotify-secret-key.json"),
    });

    const { filename, createReadStream } = await image;

    let sanitizedName = removeWhiteSpaces(filename);
    await new Promise((resolve, reject) => {
      createReadStream().pipe(
        storage
          .bucket(bucketName)
          .file(sanitizedName)
          .createWriteStream()
          .on("finish", () => {
            storage
              .bucket(bucketName)
              .file(sanitizedName)
              .makePublic()
              .then(() => {
                //empties the db-storage-like array :)
                Data = [];
                // pushes a new data into the db-storage-like array :)
                Data.push({
                  id: Math.ceil(Math.random() * 100),
                  username: username,
                  imageuri: `https://storage.googleapis.com/${bucketName}/${sanitizedName}`,
                });

                resolve(Data);
              })
              .catch((e) => {
                reject((e) => console.log(`exec error : ${e}`));
              });
          })
      );
    });
  },

  deleteUser: (_, {}) => {
    Data = [];

    if (Data.length < 1) {
      return true;
    } else {
      return false;
    }
  },
};
