import React from "react";
import "./Carrousel.css";
import useCarrouselHook from "../../customHooks/CarrouselHook";

const images = ["fullers.png", "guldenDraak.png", "leffe.png", "paulaner.png"];

export default function Carrousel() {
  const { index } = useCarrouselHook({ images });

  const BuildImgUrl = (img) => "./carrouseIImages/" + img;

  return (
    <div>
      <img className="img-home-beer" src={BuildImgUrl(images[index])}></img>{" "}
    </div>
  );
}
