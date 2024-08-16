import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Contact Us",
};

const ContactUs = () => {
  return (
    <div className="wrapper grow relative">
      <div className="flex flex-col gap-8 my-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Get in Touch with <br />
            <span className="text-white">Goal</span>
            <span className="text-primary">Net.</span>
          </h2>
          <p className="text-gray-300">
            At GoalNet, we value your input and are always eager to hear from
            our fellow football enthusiasts. Whether you have a question,
            feedback, or want to discuss football news and trends, we’re here to
            connect!
          </p>
          <h5 className="font-semibold text-lg">How can we help?</h5>
          <p>
            <span className="font-semibold text-lg">&bull; General Inquiries: </span>
            {
              "Got a question about our content or want to know more about GoalNet? We’re here to assist you."
            }
          </p>
          <p>
            <span className="font-semibold text-lg">&bull; Feedback: </span>
            {
              "Your thoughts help us improve! Share your opinions on our articles, features, or anything else you’d like to see on GoalNet."
            }
          </p>
          <p>
            <span className="font-semibold text-lg">&bull; Collaborations: </span>
            {
              "Interested in working with us? Whether it's a partnership or a feature request, we’re open to collaborating with like-minded football enthusiasts."
            }
          </p>
          <h5 className="font-semibold text-lg">How to Reach Us:</h5>
          <p>
            Simply click the button below to send us an email. We’ll do our best
            to get back to you as quickly as possible. Let’s keep the football
            conversation going and make GoalNet even better together!
          </p>
          <h5 className="font-semibold text-lg">[Email Us Now]</h5>
        </div>
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={500}
          height={500}
          className="blur-sm absolute -rotate-12 inset-0 w-full h-full object-contain sm:object-cover -z-10 brightness-[20%]"
        />
        <Link href="mailto:contactgoalnet@gmail.com" rel="noopener noreferrer" target="_blank" className="primary-btn text-center h-fit w-[15rem]">Contact Us</Link>
      </div>
    </div>
  );
};

export default ContactUs;
