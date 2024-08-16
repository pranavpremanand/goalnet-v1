import Image from "next/image";

const ContactUs = () => {
  return (
    <div className="wrapper grow relative">
      <div className="flex flex-col gap-8 my-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Connect with <br />
            <span className="text-white">Goal</span>
            <span className="text-primary">Net.</span>
          </h2>
          <p className="text-gray-300">
            Whether you’re curious about the latest transfer rumors, want to
            dive deeper into tactical analysis, or have feedback on our content,
            we’d love to hear from you! Click the button below to drop us an
            email—let’s keep the football conversation going. Your passion fuels
            GoalNet!
          </p>
        </div>
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={500}
          height={500}
          className="blur-sm absolute -rotate-12 inset-0 w-full h-full object-contain sm:object-cover -z-10 brightness-[25%]"
        />

        {/* <form className="flex flex-col items-center gap-3 w-full md:w-1/2 bg-[#191919] bg-opacity-70 p-5 rounded-3xl"> */}
          {/* <h2 className="text-2xl">Contact Us</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="text-gray-300 ml-3">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="px-3 py-2 text-black outline-none border-primary rounded-md border"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="text-gray-300 ml-3">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="px-3 py-2 text-black outline-none border-primary rounded-md border"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="text-gray-300 ml-3">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="px-3 py-2 text-black outline-none border-primary rounded-md border"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="text-gray-300 ml-3">
              Message
            </label>
            <textarea
              rows="6"
              id="message"
              className="px-3 py-2 text-black outline-none border-primary rounded-md border"
            />
          </div> */}
          <button className="primary-btn h-fit w-[15rem]">Contact Us</button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default ContactUs;
