import React from "react"
import { Link } from "react-router-dom"

const Banner = () => {
  const socialMedia = [
    {
      link: "",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/018/930/752/small/twitter-logo-twitter-icon-transparent-free-free-png.png",
    },
    {
      link: "",
      image:
        "https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png",
    },
    {
      link: "",
      image:
        "https://static.vecteezy.com/system/resources/previews/042/127/122/non_2x/red-circle-bordered-youtube-logo-with-long-shadow-on-transparent-background-free-png.png",
    },
    {
      link: "",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/042/148/632/small/instagram-logo-instagram-social-media-icon-free-png.png",
    },
  ];

  return (
    <section className="relative bg-linear-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 py-20 mt-10 shadow-xl ">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left gap-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-800 dark:text-blue-300 leading-tight">
            Order Your <br /> Favorite Food Online
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-md leading-relaxed">
            Craving something delicious? Get your favorite meals delivered to
            your door — fast, fresh, and hassle-free.
          </p>

          <Link to="/restaurants">
            <button className="mt-2 bg-blue-600 hover:bg-white dark:hover:bg-gray-800 text-white hover:text-blue-800 dark:hover:text-blue-300 border border-blue-800 dark:border-blue-400 px-6 py-3 rounded-xl text-base font-semibold shadow-md hover:shadow-xl transition duration-300">
              Order Now
            </button>
          </Link>

          <div className="flex gap-5 pt-4">
            {socialMedia.map((item) => (
              <a
                key={item.image}
                href={item.link}
                className="w-10 h-10 rounded-full overflow-hidden border hover:border-blue-800 dark:hover:border-blue-400 transition"
              >
                <img
                  className="w-full h-full object-cover"
                  src={item.image}
                  alt="social-icon"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center">
          <img
            className="w-full max-w-xs sm:max-w-md md:max-w-lg"
            src="https://toxsl.com/themes/new/img/screen/food_banner_image.png"
            alt="Food delivery App"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner