"use client";

import "@blocknote/core/style.css";

import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

export function BlockNote() {
  const editor: BlockNoteEditor | null = useBlockNote({});

  const handleCick = () => {
    console.log(editor?.blockCache);
    alert("blocknote cache printed in console");
  };

  return (
    <>
      <button onClick={handleCick} type='button'>
        click
      </button>
      <BlockNoteView editor={editor} />
    </>
  );
}
