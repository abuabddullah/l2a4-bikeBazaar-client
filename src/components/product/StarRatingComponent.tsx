import { StarIcon } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  rating: number;
  handleRatingChange?: (callback: (prevState: any) => any) => void;
}

function StarRatingComponent({ rating, handleRatingChange }: StarRatingProps) {
  const [selectedStar, setSelectedStar] = useState<null | number>(null);
  return [1, 2, 3, 4, 5].map((star) => (
    <button
      className={`p-2 rounded-full hover:bg-orange-500 ${
        selectedStar === star ? "bg-orange-500" : ""
      }`}
      onClick={
        handleRatingChange
          ? () => {
              setSelectedStar(star);
              console.log({ star });
              return handleRatingChange((prevState) => ({
                ...prevState,
                rating: star,
              }));
            }
          : undefined
      }
    >
      <StarIcon
        className={`w-6 h-6 text-white ${
          star <= rating ? "fill-yellow-500" : "fill-gray-300"
        }`}
      />
    </button>
  ));
}

export default StarRatingComponent;
