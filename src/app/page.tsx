import { TestButton } from "src/components/TestButton";

import { css } from "styled-system/css";

import dynamic from "next/dynamic";
import Link from "next/link";

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
      <Link href='/login'>go to login</Link>
      <div className={pandaStyle}>PANDA CSS WORKING AS SERVER COMPONENT</div>
      <BlockNote />
      <TestButton />
    </>
  );
}
