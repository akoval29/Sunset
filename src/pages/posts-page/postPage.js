let lastCity1 = null; // уникнути повторних запитів на сервер 1/3
export const Posts = () => {
  return (
    <article className="app__main">
      <h3 className="app__main-title">Posts</h3>
      <p className="app__paragraph">Lorem ipsum dolor,</p>
      <p className="app__paragraph">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </p>
      <p className="app__paragraph">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure, numquam
        temporibus!
      </p>
    </article>
  );
};

// export async function getWeatherTop(city) {
//   if (!city || (lastCity1 && lastCity1 === city)) {
//     return;
//   } // уникнути пустих і повторних запитів на сервер 2/3
//   try {
//     const response = await axios.get(
//       `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
//     );
//     lastCity1 = city; // уникнути повторних запитів на сервер 3/3
//     return response;
//   } catch (error) {
//     onError();
//     console.error(error);
//     throw error;
//   }
// }
