import { NFTStorage, File } from "nft.storage";
import mime from "mime";
import fs from "fs";
import path from "path";

const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFBNzk5M0FkRjgwZDdEMzhlODIyNjc3MDcxYjc1RUFFMGY2ZGJFMmEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MDEwNjU5NjExOSwibmFtZSI6IkVUSEluZGlhIn0.fk5h_NSW1PEF2G_vGezHTWXMUhPvft-dI3m77klG7Xo";

export const UploadFileToIPFS = async ({
  file,
  builder,
  name,
  description,
}) => {
  return new Promise((resolve, reject) => {
    try {
      (async () => {
        const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
        const result = await nftstorage.store({
          image: new File([file], `${name}_${builder}`),
          builder,
          name,
          description,
        });
        resolve(result);
      })();
    } catch (err) {
      reject(err.message);
    }
  });
};
