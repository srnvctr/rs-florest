import React from "react";

import Layoutpage from "../components/Layoutpage";
import UserProfile from "../components/UserProfile";

const Profile: React.FC = () => {
  return (
    <Layoutpage>
      <div style={{ padding: "0px 100px" }}>
        <UserProfile />
      </div>
    </Layoutpage>
  );
};

export default Profile;
