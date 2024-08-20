import Banner from "../components/Banner";
import PostsList from "@/components/PostsList";

export const metadata = {
  title: "Football News, Results, Transfers and More | GoalNet",
};

export default function Home() {
  return (
    <section className="w-full grow">
      <Banner />
      <PostsList />
    </section>
  );
}
