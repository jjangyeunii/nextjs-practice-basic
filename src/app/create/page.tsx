"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

// form 이벤트 type 관련 참고 블로그
// https://claritydev.net/blog/typescript-typing-form-events-in-react

interface CustomElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  body: HTMLTextAreaElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export default function Create() {
  const router = useRouter();
  return (
    <form
      onSubmit={(e: FormEvent<CustomForm>) => {
        e.preventDefault();
        const target = e.currentTarget.elements;
        const title = target.title.value;
        const body = target.body.value;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        fetch(`${process.env.NEXT_PUBLIC_API_URL}topics`, options)
          .then((res) => res.json())
          .then((result) => {
            const lastid = result.id;
            router.refresh();
            router.push(`/read/${lastid}`);
          });
      }}
    >
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body"></textarea>
      </p>
      <p>
        <button type="submit">Create</button>
      </p>
    </form>
  );
}
