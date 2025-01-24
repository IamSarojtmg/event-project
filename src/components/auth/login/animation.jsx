import React from "react";
import abba from "../../images/abba.png";
import concert from "../../images/concer.png";
import dino from "../../images/dino.png";
import mamaMia from "../../images/mamamia.png";
import tedtalk from "../../images/tedtalk.jpeg";
import theatre from "../../images/theatre.png";

const images = [abba, concert, dino, mamaMia, tedtalk, theatre];

function Animation() {
  return (
    <>

        <main style={styles.animationCont}>
          <div className="imgWrapper">
            {images.map((image, index) => {
              return <img src={image} alt="" srcset="" key={index} />;
            })}
          </div>
          <div className="imgWrapper">
            {images.map((image, index) => {
              return <img src={image} alt="" srcset="" key={index} />;
            })}
          </div>
        </main>
    </>
  );
}

const styles = {

animationCont:{
    border: "1px solid red",
}

}





export default Animation;
