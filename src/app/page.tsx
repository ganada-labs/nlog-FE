import { Header } from "src/components/Header";

import { css } from "styled-system/css";

import dynamic from "next/dynamic";

const BlockNote = dynamic(
  async () => {
    const { BlockNote } = await import("src/components/BlockNote");
    return { default: BlockNote };
  },
  { ssr: false },
);

const pandaStyle = css({
  bg: "red",
  fontSize: "2xl",
  fontWeight: "bold",
});

export default function HomePage() {
  return (
    <>
      <Header />
      <div className={pandaStyle}>PANDA CSS WORKING AS SERVER COMPONENT</div>
      <BlockNote />
    </>
  );
}
