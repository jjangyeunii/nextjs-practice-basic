import Image from "next/image";
import hello from "@/../public/hello.jpg";

export default function Home() {
  return (
    <main>
      <h2>Welcome</h2>
      <p>Hello, WEB!</p>
      <Image src={hello} alt="welcomImage" width={250} height={200} />
    </main>
  );
}
