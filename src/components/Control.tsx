"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Control() {
  const params = useParams();
  const id = params.id;
  return (
    <ul>
      <li>
        <Link href="/create">Create</Link>
      </li>
      {id ? (
        <section>
          <li>
            <Link href={`/update/${id}`}>Update</Link>
          </li>
          <li>
            <button>delete</button>
          </li>
        </section>
      ) : null}
    </ul>
  );
}
