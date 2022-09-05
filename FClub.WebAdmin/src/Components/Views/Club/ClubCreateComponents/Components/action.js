import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function dataHandler(token, data, responseImageUrl) {
  fetch("https://club-management-service.azurewebsites.net/api/v1/clubs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      ...data,
      logo: responseImageUrl,
    }),
  })
    .then((response) => response.ok)
    .catch((error) => console.log(error));
}

export function createClubHandler(image, token, data) {
  const storage = getStorage();
  const storageRef = ref(storage, `club-logo/${image.name}`); // folder path in firebase console

  const uploadTask = uploadBytesResumable(storageRef, image);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      //const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
          break;
      }
    },
    (error) => {
      console.log(error.code);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        dataHandler(token, data, downloadURL);
      });
    }
  );
}
