import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { motion } from "framer-motion";

const StaticBanner: React.FC = () => {
  const now = new Date();
  const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 11); // 11 days ahead, at 00:00
  const difference = targetDate.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(difference / 1000));

  const renderTime = (dimension: string, time: number) => {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold text-white">{time}</div>
        <div className="text-sm text-white">{dimension}</div>
      </div>
    );
  };

  return (
    <div className="relative h-[70vh] w-full overflow-hidden bg-[#F97316]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dglsw3gml/image/upload/v1742619839/bicycle-shop/bike_bazar_banner_pgqpyi.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-0">
          <div className="container mx-auto h-full flex items-center justify-center relative">
            <div className="hidden lg:block absolute lg:bottom-6 lg:right-20 bg-white/10 backdrop-blur-sm rounded-lg p-6 text-black">
              <motion.h4
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                className="text-xl  font-bold mb-8 text-white relative"
              >
                <span className="relative">
                  Countdown
                  <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-orange-500"></span>
                </span>
              </motion.h4>
              <div className="flex gap-8 ">
                <motion.div
                  animate={{ y: ["0px", "20px", "0px"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0, // No delay for the first one
                  }}
                >
                  <CountdownCircleTimer
                    isPlaying
                    duration={86400}
                    colors={["#F97316", "#FB923C", "#FDBA74", "#FED7AA"]}
                    colorsTime={[45, 30, 15, 0]}
                    size={80}
                    trailColor="#ffffff33"
                  >
                    {({ value }) =>
                      renderTime("Days", Math.floor(totalSeconds / 86400))
                    }
                  </CountdownCircleTimer>
                </motion.div>

                <motion.div
                  animate={{ y: ["0px", "20px", "0px"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5, // Add a delay to create the wave effect
                  }}
                >
                  <CountdownCircleTimer
                    isPlaying
                    duration={3600}
                    colors={["#F97316", "#FB923C", "#FDBA74", "#FED7AA"]}
                    colorsTime={[45, 30, 15, 0]}
                    size={80}
                    trailColor="#ffffff33"
                  >
                    {({ value }) =>
                      renderTime(
                        "Hours",
                        Math.floor((totalSeconds % 86400) / 3600)
                      )
                    }
                  </CountdownCircleTimer>
                </motion.div>

                <motion.div
                  animate={{ y: ["0px", "20px", "0px"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1, // Add a delay to create the wave effect
                  }}
                >
                  <CountdownCircleTimer
                    isPlaying
                    duration={60}
                    colors={["#F97316", "#FB923C", "#FDBA74", "#FED7AA"]}
                    colorsTime={[45, 30, 15, 0]}
                    size={80}
                    trailColor="#ffffff33"
                  >
                    {({ value }) =>
                      renderTime(
                        "Minutes",
                        Math.floor((totalSeconds % 3600) / 60)
                      )
                    }
                  </CountdownCircleTimer>
                </motion.div>

                <motion.div
                  animate={{ y: ["0px", "20px", "0px"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5, // Add a delay to create the wave effect
                  }}
                >
                  <CountdownCircleTimer
                    isPlaying
                    duration={60}
                    colors={["#F97316", "#FB923C", "#FDBA74", "#FED7AA"]}
                    colorsTime={[45, 30, 15, 0]}
                    size={80}
                    trailColor="#ffffff33"
                  >
                    {({ value }) => renderTime("Seconds", totalSeconds % 60)}
                  </CountdownCircleTimer>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticBanner;
