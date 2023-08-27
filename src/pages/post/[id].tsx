import { fetchPost } from "src/requests";

import { type Block, InlineContent } from "@blocknote/core";
import { type GetServerSideProps } from "next";
import { HTMLAttributes } from "react";

type meta = {
  author: string;
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  post: {
    title: string;
    meta: meta;
    contents: Block[];
  };
}

export default function Post(props: Props) {
  const { post } = props;

  const groupedContents = post.contents.reduce((acc: (Block | Block[])[], content: Block) => {
    if (content.type === "numberedListItem") {
      if (acc.length === 0) {
        return [[content]];
      }

      const lastContent = acc.at(-1);
      if (!Array.isArray(lastContent)) {
        return [...acc, [content]];
      }
      if (lastContent[0].type === "numberedListItem") {
        return [...acc.slice(0, -1), [...lastContent, content]];
      } else {
        return [...acc, [content]];
      }
    }

    if (content.type === "bulletListItem") {
      if (acc.length === 0) {
        return [[content]];
      }

      const lastContent = acc.at(-1);
      if (!Array.isArray(lastContent)) {
        return [...acc, [content]];
      }
      if (lastContent[0].type === "bulletListItem") {
        return [...acc.slice(0, -1), [...lastContent, content]];
      } else {
        return [...acc, [content]];
      }
    }

    return [...acc, content];
  }, []);
  console.log(groupedContents);

  return (
    <>
      <h1>{post.title}</h1>
      <span>author: {post.meta.author}</span>
      {groupedContents.map((content) => contentOrContentListToElement(content))}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const { data } = await fetchPost(id as string);

  return {
    props: {
      post: data,
    },
  };
};

const contentOrContentListToElement = (blockOrBlocks: Block | Block[]) => {
  if (Array.isArray(blockOrBlocks)) {
    const blocks = blockOrBlocks;
    if (blocks[0].type === "bulletListItem") {
      return <ul>{blocks.map(contentToElement)}</ul>;
    } else {
      return <ol>{blocks.map(contentToElement)}</ol>;
    }
  }

  const block = blockOrBlocks;
  return contentToElement(block);
};
/**
 * TODO: 리팩토링
 *
 * TODO: 분리
 */
const contentToElement = (block: Block) => {
  if (block.type === "heading") {
    const level = block.props.level;
    const innerContent = block.content.map((c: InlineContent, idx) =>
      inlineContentToElement(c, `${idx}`),
    );

    if (level === "1") return <h1>{innerContent}</h1>;
    if (level === "2") return <h2>{innerContent}</h2>;
    if (level === "3") return <h3>{innerContent}</h3>;
  }

  if (block.type === "paragraph") {
    const innerContent = block.content.map((c: InlineContent, idx) =>
      inlineContentToElement(c, `${idx}`),
    );
    return <p>{innerContent}</p>;
  }

  if (block.type === "bulletListItem") {
    const children = block.children;
    if (children.length <= 0) {
      const innerContent = block.content.map((c: InlineContent, idx) =>
        inlineContentToElement(c, `${idx}`),
      );
      return <li>{innerContent}</li>;
    }
    const innerContent = block.content.map((c: InlineContent, idx) =>
      inlineContentToElement(c, `${idx}`),
    );
    const nestedList = <ul>{block.children.map((child) => contentToElement(child))}</ul>;
    return (
      <li>
        {innerContent}
        {nestedList}
      </li>
    );
  }

  if (block.type === "numberedListItem") {
    const children = block.children;
    if (children.length <= 0) {
      const innerContent = block.content.map((c: InlineContent, idx) =>
        inlineContentToElement(c, `${idx}`),
      );
      return <li>{innerContent}</li>;
    }
    const innerContent = block.content.map((c: InlineContent, idx) =>
      inlineContentToElement(c, `${idx}`),
    );
    const nestedList = <ol>{block.children.map((child) => contentToElement(child))}</ol>;
    return (
      <li>
        {innerContent}
        {nestedList}
      </li>
    );
  }
};

const inlineContentToElement = (content: InlineContent, key?: string) => {
  if (content.type === "link") {
    const { href, content: innerContent } = content;
    const innerElems = innerContent.map((c, i) => <span key={i}>{c[c.type]}</span>);
    return (
      <a key={key} href={`//${href}`}>
        {innerElems}
      </a>
    );
  }

  if (content.styles) {
    const style: Record<string, string> = {};
    if (content.styles.italic) {
      style.fontStyle = "italic";
    }
    if (content.styles.bold) {
      style.fontWeight = "bold";
    }
    if (content.styles.strike) {
      style.textDecoration = "line-through";
    }
    if (content.styles.underline) {
      style.textDecoration = "underline";
    }
    if (content.styles.code) {
      return <code key={key}>{content["text"]}</code>;
    }

    return (
      <span key={key} style={style}>
        {content["text"]}
      </span>
    );
  }

  return <span key={key}>{content["text"]}</span>;
};
