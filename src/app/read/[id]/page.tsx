type Props = {
  params: {
    id: string;
  };
};

export default function Read({ params }: Props) {
  return (
    <section>
      <h2>Read</h2>
      <p>parameters: {params.id}</p>
    </section>
  );
}
