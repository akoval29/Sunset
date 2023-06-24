import React, { useEffect, useState } from "react";

import { getInfo } from "../../shared/useAPI";

import "./userStyle.css";

export const Users = () => {
  const [userItems, setuserItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInfo("users");
        if (response) {
          setuserItems(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <article className="app__main">
      <h3 className="app__main-title">Users</h3>
      <div className="user__container">
        <p className="user__userId">Name </p>
        <p className="user__userId">User name</p>
      </div>
      {userItems.map((item) => (
        <div className="user" key={item.id}>
          <div className="user__wrap">
            <p className="user__userId">
              {item.id}. {item.name}
            </p>
            <p className="user__userId">{item.username}</p>
          </div>
        </div>
      ))}
    </article>
  );
};
