"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function Control() {
  const params = useParams();
  const router = useRouter();
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
            <button
              onClick={() => {
                const options = { method: "DELETE" };
                fetch(`http://localhost:9999/topics/${id}`, options).then(
                  (_) => {
                    router.refresh();
                    router.push("/");
                  }
                );
              }}
            >
              delete
            </button>
          </li>
        </section>
      ) : null}
    </ul>
  );
}
