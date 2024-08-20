import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "About Us",
};

export default function About() {
  return (
    <section className="w-full my-2">
      <div className="flex flex-col wrapper gap-10">
        <Image  
          src="/assets/images/about-us-banner.jpg"
          alt="About Us"
          width={1000}
          height={1000}
          className="lg:h-[55vh] object-cover object-bottom w-full"
        />
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl">
            Welcome to{" "}
            <b className={`${poppins.className} text-white`}>
              Goal<span className="text-primary">Net.</span>
            </b>
          </h1>
          <div className="flex flex-col gap-2">
            <p>
              Passionately crafted with the love of the beautiful game at its
              core, GoalNet is your go-to destination for everything
              football-related.
            </p>
            <p>
              {`At GoalNet, our mission is simple: to provide football enthusiasts
          worldwide with the latest news, fixtures, and transfer rumors, all in
          one convenient location. Whether you're a die-hard supporter of a
          storied club or a casual observer looking to stay informed, GoalNet
          has something for everyone.`}
            </p>
            <p>
              {`Driven by a deep-seated love for the sport and a commitment to
          excellence, GoalNet is more than just a website – it's a community. A
          place where fans from every corner of the globe can come together to
          celebrate the sport they love and share in the excitement of the game.`}
            </p>
            <p>
              {`But GoalNet is more than just a repository of information – it's a
          celebration of the rich tapestry of cultures and identities that make
          football the global phenomenon that it is. From the bustling streets
          of Rio de Janeiro to the pristine pitches of Barcelona, football has
          the power to unite us all in a shared love of the game.`}
            </p>
            <p>
              {`So whether you're here to catch up on the latest headlines, engage in
          lively debates with fellow fans, or simply bask in the sheer beauty of
          the game, we're thrilled to have you join us on this journey.
          Together, let's celebrate the sport that brings us together and
          inspires us to dream – because when it comes to football, the
          possibilities are endless, and the journey is just beginning.`}
            </p>
          </div>
          <h2 className="text-2xl">
            Welcome to{" "}
            <b className={`${poppins.className} text-white`}>
              Goal<span className="text-primary">Net.</span>
            </b>{" "}
            – where football lives and breathes.
          </h2>
        </div>
      </div>
    </section>
  );
}
