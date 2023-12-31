import { Topic } from "@/model/topic";

type Props = {
  params: {
    id: string;
  };
};

export default async function Read({ params }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}topics/${params.id}`,
    {
      cache: "no-store",
    }
  );
  const topic: Topic = await res.json();
  return (
    <section>
      <h2>{topic.title}</h2>
      <p>{topic.body}</p>
    </section>
  );
}
