import { useEffect, useState, useContext } from "react";
import { getPhotos, getUserByUserId } from "../Allservices/firebase";
import UserContext from "../contextFire/user";

export default function usePhotos() {
  const [photos, setPhotosYanirasmlar] = useState(null);
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimeLinePhotos() {
      const [user] = await getUserByUserId(userId);
      let followedUserPhotos = [];
      if (user.following.length > 0) {
        followedUserPhotos = await getPhotos(userId, user.following);
      }

      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotosYanirasmlar(followedUserPhotos);
    }

    getTimeLinePhotos();
  }, [userId]);

  return { photos };
}
