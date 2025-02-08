import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Strike from "@tiptap/extension-strike";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import {
  HiBold,
  HiLink,
  HiListBullet,
  HiArrowUturnLeft,
  HiArrowUturnRight,
  HiMinus,
  HiArrowPath,
} from "react-icons/hi2";

import { BsTypeH3, BsTypeH2, BsTypeH1, BsBlockquoteLeft } from "react-icons/bs";
import { AiOutlineOrderedList } from "react-icons/ai";
import {
  BiItalic,
  BiStrikethrough,
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiCodeBlock,
} from "react-icons/bi";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const IconButton = ({
  active,
  onClick,
  children,
  title,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}) => (
  <button
    onClick={onClick}
    title={title}
    className={`p-2 rounded text-sm transition-colors ${
      active
        ? "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white"
    }`}
  >
    {children}
  </button>
);

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Strike,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base max-w-none focus:outline-none",
      },
    },
  });

  const setLink = () => {
    const url = window.prompt("URL:");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="border dark:border-gray-600 rounded-t-lg bg-gray-50 dark:bg-gray-800 p-2 flex flex-wrap gap-1">
        <div className="flex space-x-1 border-r dark:border-gray-600 pr-2">
          <IconButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Bold"
          >
            <HiBold size={18} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Italic"
          >
            <BiItalic size={18} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            title="Strikethrough"
          >
            <BiStrikethrough size={18} />
          </IconButton>
        </div>

        <div className="flex space-x-1 border-r dark:border-gray-600 pr-2">
          <IconButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <BsTypeH1 size={18} />
          </IconButton>
          <IconButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <BsTypeH2 size={18} />
          </IconButton>
          <IconButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive("heading", { level: 3 })}
            title="Heading 2"
          >
            <BsTypeH3 size={18} />
          </IconButton>
        </div>

        <div className="flex space-x-1 border-r dark:border-gray-600 pr-2">
          <IconButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <HiListBullet size={18} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Ordered List"
          >
            <AiOutlineOrderedList size={18} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
            title="Code Block"
          >
            <BiCodeBlock size={18} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Blockquote"
          >
            <BsBlockquoteLeft size={18} />
          </IconButton>
        </div>

        <div className="flex space-x-1 border-r dark:border-gray-600 pr-2">
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <BiAlignLeft size={18} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            <BiAlignMiddle size={18} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <BiAlignRight size={18} />
          </IconButton>
        </div>

        <div className="flex space-x-1 border-r dark:border-gray-600 pr-2">
          <IconButton
            onClick={setLink}
            active={editor.isActive("link")}
            title="Insert Link"
          >
            <HiLink size={18} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Line"
          >
            <HiMinus size={18} />
          </IconButton>
        </div>

        <div className="flex space-x-1">
          <IconButton
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo"
          >
            <HiArrowUturnLeft size={18} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo"
          >
            <HiArrowUturnRight size={18} />
          </IconButton>
          <IconButton
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }
            title="Clear Formatting"
          >
            <HiArrowPath size={18} />
          </IconButton>
        </div>
      </div>
      <div className="border dark:border-gray-600 border-t-0 rounded-b-lg overflow-hidden">
        <EditorContent
          editor={editor}
          className="min-h-[200px] p-4 bg-white dark:bg-gray-800"
        />
      </div>
      <style>{`
        .ProseMirror {
          min-height: 200px;
          outline: none;
        }
        .ProseMirror p {
          margin: 0.5em 0;
        }
        .ProseMirror > *:first-child {
          margin-top: 0;
        }
        .ProseMirror > *:last-child {
          margin-bottom: 0;
        }
        .ProseMirror ul {
          padding-left: 1.5em;
          list-style-type: disc;
        }
        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: 600;
          margin: 1em 0 0.5em;
        }
        .dark .ProseMirror {
          color: #e5e7eb;
        }
        .dark .ProseMirror h2 {
          color: #f3f4f6;
        }
      `}</style>
    </div>
  );
}
