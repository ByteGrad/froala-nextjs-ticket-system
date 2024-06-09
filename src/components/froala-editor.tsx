"use client";

import dynamic from "next/dynamic";

const FroalaEditorComponent = dynamic(
  async () => {
    const results = await Promise.all([
      import("react-froala-wysiwyg"),
      import("froala-editor/js/plugins.pkgd.min.js"),
    ]);
    return results[0];
  },
  {
    ssr: false,
  }
);

export default FroalaEditorComponent;
