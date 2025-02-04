import React from "react";
import { Card } from "./Styles";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

export default function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const api_key = "d9afef24eae14bc3b050931347e07272";

    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${api_key}&number=15`
    );
    const data = await api.json();

    setPopular(data.recipes);

    console.log(popular);
  };

  return (
    <div>
      <Wrapper>
        <h2>Popular Recipes</h2>
        <Splide
          options={{
            perPage: 3,
            breakpoints: {
              650: {
                perPage: 2,
                gap: "1rem"
              }
            },
            gap: "2rem",
            drag: "free",

            pauseOnHover: true,
            arrows: false
          }}
        >
          {popular?.map((x) => (
            <SplideSlide key={x.id}>
              <Card>
                <Link to={"/recipe/" + x.id} className="text-link">
                  <img src={x.image} alt={x.title} />
                  <p>{x.title}</p>
                </Link>
              </Card>
            </SplideSlide>
          ))}
        </Splide>
      </Wrapper>
    </div>
  );
}
const Wrapper = styled.div`
  margin: 5rem 0;
`;
