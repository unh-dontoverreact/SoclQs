import React from "react";
import "materialize-css/dist/css/materialize.min.css";

function User(props) {

    return (
      <div>
        <img className="fit-picture"
          src="http://i.pravatar.cc/300"
          alt="profile pic" />

        Username:  randomUser {/* {props.username} */ }
      </div>
    );
}

export default User;