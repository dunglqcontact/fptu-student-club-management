import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export async function GetMemberId(token, userId, clubId) {
  try {
    const response = await fetch(
      `https://club-management-service.azurewebsites.net/api/v1/members?UserId=${userId}&ClubId=${clubId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      if (responseData.length !== 0) {
        return responseData.data[0].id;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export function deleteActivity(token, idActivity) {
  fetch(
    `https://club-management-service.azurewebsites.net/api/v1/events/${idActivity}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  )
    .then((response) => response.ok)
    .catch((error) => console.log(error));
}

function editActivity(token, idActivity, data, memberId, responseImageUrl) {
  fetch("https://club-management-service.azurewebsites.net/api/v1/events", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      ...data,
      id: idActivity,
      creatorId: memberId,
      status: 1,
      image: responseImageUrl,
    }),
  })
    .then((response) => response.ok)
    .catch((error) => console.log(error));
}

export function editActivityHandler(image, token, idActivity, data, memberId) {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${image.name}`); // folder path in firebase console

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
        editActivity(token, idActivity, data, memberId, downloadURL);
      });
    }
  );
}
