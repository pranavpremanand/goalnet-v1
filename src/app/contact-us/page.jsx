import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Contact Us",
};

const ContactUs = () => {
  return (
    <div className="wrapper grow relative">
      <div className="flex flex-col gap-8 my-10">
        <div className="flex flex-col gap-6">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
            Get in Touch with <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl">
              <span className="text-white">Goal</span>
              <span className="text-primary">Net.</span>
            </span>
          </div>
          <p className="text-gray-300">
            At GoalNet, we value your input and are always eager to hear from
            our fellow football enthusiasts. Whether you have a question,
            feedback, or want to discuss football news and trends, we’re here to
            connect!
          </p>
          <h5 className="font-semibold text-lg">How can we help?</h5>
          <div className="flex flex-col gap-3">
            <p>
              <span className="font-semibold">&bull; General Inquiries: </span>
              {
                "Got a question about our content or want to know more about GoalNet? We’re here to assist you."
              }
            </p>
            <p>
              <span className="font-semibold">&bull; Feedback: </span>
              {
                "Your thoughts help us improve! Share your opinions on our articles, features, or anything else you’d like to see on GoalNet."
              }
            </p>
            <p>
              <span className="font-semibold">&bull; Collaborations: </span>
              {
                "Interested in working with us? Whether it's a partnership or a feature request, we’re open to collaborating with like-minded football enthusiasts."
              }
            </p>
          </div>
          <h5 className="font-semibold text-lg">How to Reach Us:</h5>
          <p>
            Simply click the button below to send us an email. We’ll do our best
            to get back to you as quickly as possible. Let’s keep the football
            conversation going and make GoalNet even better together!
          </p>
        </div>
        <Image
          src="/assets/images/messi-training.jpeg"
          alt="#"
          width={500}
          height={500}
          className="absolute inset-0 w-full h-full object-cover -z-10 brightness-[20%]"
        />
        <Link
          href="mailto:contactgoalnet@gmail.com"
          rel="noopener noreferrer"
          target="_blank"
          className="primary-btn text-center h-fit w-[15rem]"
        >
          Email Us Now
        </Link>
      </div>
    </div>
  );
};

export default ContactUs;
