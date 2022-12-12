import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../../Allservices/firebase";
import { useNavigate } from "react-router-dom";
import { NOT_FOUND } from "../../utils/routes";
import Header from "./../../components/ProfilePage/Header";
import UserProfile from "./../../components/ProfilePage/UserProfile";

const UserPage = () => {
  const { username } = useParams();
  const [user, setUserJavlon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserExists = async () => {
      const [user] = await getUserByUsername(username);
      if (user?.userId) {
        setUserJavlon(user);
      } else {
        navigate(NOT_FOUND);
      }
    };

    checkUserExists();
  }, [username, navigate]);

  return user ? (
    <div className="bg-gray-background mt-10">
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
};

export default UserPage;
