import { useState, useContext, useEffect } from "react";
import { getUserByUserId } from "../Allservices/firebase";
import UserContext from "../contextFire/user";

export default function useUser() {
  const [activeUser, setActiveUserEngactivi] = useState({});
  const { user } = useContext(UserContext);

  async function getUserObjByUserId() {
    const [response] = await getUserByUserId(user.uid);
    setActiveUserEngactivi(response);
  }

  const updateProfile = () => {
    getUserObjByUserId();
  };

  useEffect(() => {
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { user: activeUser, updateProfile };
}
