"use client";

import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import { FroalaOptions } from "froala-editor";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createTicket } from "../actions/actions";

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

export const froalaOptions: Partial<FroalaOptions> = {
  heightMin: 175,
  placeholderText: "Compose a support ticket...",
  charCounterCount: false,
  wordCounterCount: false,
  quickInsertEnabled: false,
  toolbarButtons: [
    ["fontSize", "bold", "italic", "underline", "strikeThrough"],
    [
      "alignLeft",
      "alignCenter",
      "alignRight",
      "alignJustify",
      "textColor",
      "backgroundColor",
    ],
    ["formatOLSimple", "formatUL", "insertLink", "insertImage", "insertFile"],
  ],
  imageEditButtons: [
    "imageAlign",
    "imageCaption",
    "imageRemove",
    "|",
    "imageLink",
    "linkOpen",
    "linkEdit",
    "linkRemove",
    "-",
    "imageDisplay",
    "imageStyle",
    "imageAlt",
    "imageSize",
  ],
  imageOutputSize: true,
  fontSize: ["14", "16", "18", "24", "36"],
  imageUploadURL: "/api/upload",
};

export default function SupportPage() {
  const [froalaHtml, setFroalaHtml] = useState("");

  return (
    <main className="flex flex-col min-h-screen items-center pt-24 relative bg-zinc-200">
      <div className="bg-zinc-800 h-[300px] w-full absolute top-0" />

      <h1 className="text-4xl font-bold text-white mb-8 relative">
        Hello, how can we help you?
      </h1>

      <section className="bg-white shadow-lg px-8 py-6 w-[820px] min-h-[500px] rounded flex flex-col relative">
        <h2 className="text-xl font-medium">Create a ticket</h2>

        <form
          action={async (formData) => {
            await createTicket(
              formData.get("email"),
              formData.get("subject"),
              froalaHtml
            );
          }}
          className="flex flex-col gap-y-2 mt-3 flex-1"
        >
          <Input type="text" name="email" placeholder="Your email" />
          <Input type="text" name="subject" placeholder="Subject" />

          <FroalaEditorComponent
            tag="textarea"
            model={froalaHtml}
            onModelChange={setFroalaHtml}
            config={froalaOptions}
          />

          <Button className="mt-auto">Submit</Button>
        </form>
      </section>
    </main>
  );
}
