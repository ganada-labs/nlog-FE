"use client";

import "@blocknote/core/style.css";

import { type Block, BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  onEdit?: (blocks: Block[]) => void;
  init?: Block[];
}

export function BlockNote(props: Props) {
  const { onEdit, init } = props;

  const onEditorContentChange = (editor: BlockNoteEditor) => {
    if (!onEdit) return;
    onEdit(editor.topLevelBlocks);
  };

  const editor: BlockNoteEditor | null = useBlockNote({
    initialContent: init,
    onEditorContentChange,
  });

  return <BlockNoteView editor={editor} />;
}
