import Link from "next/link";
import { PiCaretRightBold } from "react-icons/pi";
import EditPost from "./components/EditPost";

const page = async ({ params }) => {
  const { postId } = params;

  return (
    <section className="wrapper grow">
      <div className="flex items-center gap-1 mb-10">
        <Link href="/admin" className="text-md" title="Home">
          Home
        </Link>
        <PiCaretRightBold className="text-sm mt-[.15rem]" />
        <Link href="/admin/posts" className="text-md" title="Posts">
          Posts
        </Link>
        <PiCaretRightBold className="text-sm mt-[.15rem]" />
        <Link
          href="/admin/posts/new-post"
          className="text-md text-primary"
          title="Upload a post"
        >
          Edit Post
        </Link>
      </div>
      <EditPost postId={postId} />
    </section>
  );
};

export default page;
