import React, { useState } from "react";

export const Main = () => {
  const localDb = "http://localhost:3001";
  const fakeApi = "https://jsonplaceholder.typicode.com";
  const [source, setSource] = useState(localDb);

  return (
    <article className="app__main">
      <h3 className="app__main-title">Main</h3>
      <p className="app__paragraph">Chose your database</p>
    </article>
  );
};
