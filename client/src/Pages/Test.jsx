import React, { useEffect, useState } from "react";
import axios from "axios";

function Test() {
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    try {
      const response = await axios.get("/api/profile");
      if (response) {
        console.log("the data is >>>>", response.data);
        setProfile(response.data); // save data to state
      }
    } catch (error) {
      console.log("from test Error fetching profile:", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <h1 className="text-9xl text-white">
     {profile.title}
    </h1>
  );
}

export default Test;
