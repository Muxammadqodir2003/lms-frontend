"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { Box, Flex } from "@chakra-ui/react";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <Box h="400px" bg="gray.700" borderRadius="md" opacity={0.5} />
  ),
});

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
}

const QuillEditor: React.FC<EditorProps> = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "blockquote", "code-block"],
      ["clean"],
    ],
  };

  return (
    <Flex
      direction="column"
      w="full"
      // minH="400px"
      className="quill-dark-theme"
      css={{
        ".quill": {
          display: "flex",
          flexDirection: "column",
          flex: "1",
          bg: "#2D3748", // gray.700 rangi
          borderRadius: "md",
          border: "1px solid",
          borderColor: "whiteAlpha.300",
          overflow: "hidden",
          _focusWithin: { borderColor: "blue.400" },
        },
        // 1. TOOLBAR (Uskunalar paneli)
        ".ql-toolbar.ql-snow": {
          border: "none !important",
          borderBottom: "1px solid !important",
          borderColor: "rgba(255, 255, 255, 0.16) !important", // whiteAlpha.300
          bg: "#1A202C", // gray.800 (biroz to'qroq tepa qismi)
          padding: "10px",
        },
        // 2. IKONKALAR RANGI (Hammasini oq qilamiz)
        ".ql-snow .ql-stroke": {
          stroke: "white !important",
          strokeWidth: "2px",
        },
        ".ql-snow .ql-fill": {
          fill: "white !important",
        },
        ".ql-snow .ql-picker": {
          color: "white !important",
        },
        // 3. MATN MAYDONI
        ".ql-container.ql-snow": {
          border: "none !important",
          flex: "1",
          display: "flex",
          flexDirection: "column",
          fontSize: "16px",
          color: "white", // Matn doim oq
          cursor: "text !important",
          userSelect: "text !important",
        },
        ".ql-editor": {
          flex: "1",
          minH: "350px",
          padding: "20px !important",
          lineHeight: "1.7",
          outline: "none !important",
          boxShadow: "none !important",
        },
        "p, span, h1, h2, h3, li": {
          backgroundColor: "transparent !important",
          color: "white !important", // Yoki o'zingizga ma'qul rang
          lineHeight: "1.7",
        },
        // Placeholder stili
        ".ql-editor.ql-blank::before": {
          color: "whiteAlpha.400 !important",
          left: "20px",
          fontStyle: "normal",
        },
        // Link ko'rinishi
        ".ql-snow .ql-editor a": {
          color: "#63B3ED !important", // blue.300
          textDecoration: "underline !important",
        },
        // Dropdown menyular (masalan sarlavhalar tanlovi)
        ".ql-picker-options": {
          bg: "#2D3748 !important",
          color: "white !important",
          border: "1px solid rgba(255, 255, 255, 0.16) !important",
          boxShadow: "xl",
        },
      }}
    >
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder="Kurs matnini bu yerga yozing..."
      />
    </Flex>
  );
};

export default QuillEditor;
