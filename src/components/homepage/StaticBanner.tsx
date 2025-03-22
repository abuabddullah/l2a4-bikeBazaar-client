import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const StaticBanner: React.FC = () => {
  const eidDate = new Date("2025-04-1");
  const now = new Date();
  const difference = eidDate.getTime() - now.getTime();
  const totalSeconds = Math.floor(difference / 1000);

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
              <div className="text-lg font-bold text-white mb-4">
                Eid Countdown
              </div>
              <div className="flex gap-8 ">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticBanner;
