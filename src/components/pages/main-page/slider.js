import React, { useState, useEffect } from "react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

import { useHttp } from "../../../hooks/useAPI";
import { CheckBox } from "../../common/Forms/sliderForm/checkBox";
import { SliderForm } from "../../common/Forms/sliderForm/SliderForm";
import { ErrorMessage } from "../../common/error/errorMessage";

import "./sliderStyle.scss";

export const Slider = () => {
  const [current, setCurrent] = useState(0); // current slide
  const [isLoaded, setIsLoaded] = useState("loading");
  const [search, setSearch] = useState("sport car");
  const [perPage, setPerPage] = useState(15);
  const [result, setResult] = useState([]);

  // connect Formik to axios
  const FormikHandler = (values) => {
    setSearch(values.inputSearch);
    setPerPage(values.inputAmount);
    setIsLoaded("loading"); // for spinner
  };

  // Navigation
  const nextSlide = () => {
    setCurrent(current === result.length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? result.length - 1 : current - 1);
  };

  const moveDot = (index) => {
    setCurrent(index);
  };

  // const GetData = useCallback(async () => {
  //   const { request } = useHttp();

  //   const ACCESS_TOKEN =
  //     "563492ad6f91700001000001ff981c4ab12a4096aa425dfe9d443dd0";
  //   const API_URL = "https://api.pexels.com/v1/search?query=";

  //   const response = await request(`${API_URL}${search}&per_page=${perPage}`);

  //   setResult(response);
  // }, [search, perPage]);

  // useEffect(() => {
  //   GetData();
  // }, [GetData]);

  switch (isLoaded) {
    case "loading":
      return (
        <section className="container">
          <article className="slider">
            <span className="slider__spinner"></span>
          </article>
          <CheckBox />
          <SliderForm />
        </section>
      );
    case false:
      return <ErrorMessage />;
    case true:
      return (
        <section className="container">
          <a href="https://www.pexels.com">Photos provided by Pexels</a>
          <article className="slider">
            <RiArrowLeftSLine
              className="slider__arrows slider__arrows--left"
              onClick={prevSlide}
            />
            <RiArrowRightSLine
              className="slider__arrows slider__arrows--right"
              onClick={nextSlide}
            />

            <div className="slider__slide__dots">
              {Array.from({ length: result.length }).map((item, index) => (
                <div
                  key={index}
                  onClick={() => moveDot(index)}
                  className={
                    current === index
                      ? "slider__slide__dots--dot slider__slide__dots--dotActive"
                      : "slider__slide__dots--dot"
                  }
                ></div>
              ))}
            </div>

            {result.map((obj, idx) => {
              return (
                <>
                  <div
                    className={
                      idx === current
                        ? "slider__slide slider__slide--active"
                        : "slider__slide"
                    }
                    key={idx}
                  >
                    <img
                      className="slider__slide__image"
                      id={obj.id}
                      src={obj.src.landscape}
                      alt={`PhotoID: ${obj.id}`}
                    />

                    <p>
                      {`Photographer: ${obj.photographer}`}
                      <span></span>
                    </p>
                  </div>
                </>
              );
            })}

            {/* <Slider
              result={result}
              current={current}
              setCurrent={setCurrent}
              nextSlide={nextSlide}
              prevSlide={prevSlide}
            /> */}
          </article>
          <CheckBox nextSlide={nextSlide} />
          <SliderForm FormikHandler={FormikHandler} />
        </section>
      );
    default:
      return null;
  }
};
