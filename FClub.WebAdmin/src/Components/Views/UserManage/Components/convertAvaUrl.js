import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function convertUrl(urlImage) {
  if (!!urlImage) {
    const storage = getStorage();
    getDownloadURL(ref(storage, urlImage))
      .then((url) => {
        return url;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    return "";
  }
}
