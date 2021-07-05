import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { IMAGES } from "src/common";

const Wrapper = styled.article`
  padding-top: 50px;
  h1 {
    text-align: center;
  }
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ImageImport = () => {
  return (
    <Wrapper>
      <h1>import 비교(next/image vs img)</h1>
      <section>
        <Image
          src={"/static/heart-smile.png"}
          alt="heart-smile"
          width={50}
          height={50}
          priority
        />
        <div>public, next/image의 경우</div>
      </section>
      <section>
        <img src={IMAGES.SMILE} alt="heart-smile" width={50} height={50} />
        <div>image import, img태그의 경우</div>
      </section>
      <br />
      <br />
      <br />
      <br />
      <h1>pre-load 비교(next/image)</h1>
      <section>
        <Image
          src={"/static/star.png"}
          alt="star"
          width={100}
          height={100}
          priority
        />
        <div>pre-load(priority)의 경우</div>
      </section>
      <section>
        <Image src={"/static/star.png"} alt="star" width={100} height={100} />
        <div>lazy-load의 경우</div>
      </section>
    </Wrapper>
  );
};

export default ImageImport;
