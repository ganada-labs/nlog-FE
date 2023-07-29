import { BlockNote } from "src/components/BlockNote";

import { css } from "styled-system/css";

const pandaStyle = css({
  bg: "red",
  fontSize: "2xl",
  fontWeight: "bold",
});

export default function HomePage() {
  return (
    <>
      <div className={pandaStyle}>PANDA CSS WORKING AS SERVER COMPONENT</div>
      <BlockNote />
    </>
  );
}
