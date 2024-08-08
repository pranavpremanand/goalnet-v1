import Banner from "../components/Banner";
import PostsList from "@/components/PostsList";

export const revalidate = 120;
export const metadata = {
  title: "Home",
}

export default function Home() {
    return (
      <section className="w-full grow">
        <Banner />
        <PostsList />
      </section>
    );
  }
