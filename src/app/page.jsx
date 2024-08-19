import Banner from "../components/Banner";
import PostsList from "@/components/PostsList";
import LatestTransfers from "@/components/LatestTransfers";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <section className="w-full grow">
      <Banner />
      <LatestTransfers />
      <PostsList />
    </section>
  );
}
