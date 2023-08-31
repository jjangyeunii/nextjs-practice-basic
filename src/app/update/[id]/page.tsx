"use client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface CustomElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  body: HTMLTextAreaElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export default function Update() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  useEffect(() => {
    fetch(`http://localhost:9999/topics/${id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setTitle(result.title);
        setBody(result.body);
      });
  }, [id]);
  return (
    <form
      onSubmit={(e: FormEvent<CustomForm>) => {
        e.preventDefault();
        const target = e.currentTarget.elements;
        const title = target.title.value;
        const body = target.body.value;
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        fetch(`http://localhost:9999/topics/${id}`, options)
          .then((res) => res.json())
          .then((result) => {
            const lastid = result.id;
            router.refresh();
            router.push(`/read/${lastid}`);
          });
      }}
    >
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setBody(e.target.value)
          }
        ></textarea>
      </p>
      <p>
        <button type="submit">Create</button>
      </p>
    </form>
  );
}
