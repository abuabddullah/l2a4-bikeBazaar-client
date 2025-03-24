import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaComment, FaStar } from "react-icons/fa6";
import { useAppSelector } from "../../store/hooks";
import {
  selectCurrentUser,
  selectUserToken,
} from "../../store/slices/authSlice";
import { IReview } from "../../types";
import HeadLine from "../shared/HeadLine";
import StarRatingComponent from "./StarRatingComponent";

const ReviewManagement = ({ productId }: { productId: string }) => {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectUserToken);

  // Combine all state values into one object state
  const [state, setState] = useState({
    review: "",
    rating: 5,
    isLoading: false,
    isSuccess: false,
    error: null as string | null,
    reviews: [] as IReview[],
    averageRating: 0,
    totalReviews: 0,
    isReviewsLoading: true,
    userReview: null as IReview | null,
  });

  // Fetch reviews and check if the current user has already reviewed
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/reviews/${productId}`
        );
        const data = await response.json();
        setState((prevState) => ({
          ...prevState,
          reviews: data.reviews || [],
          averageRating: data.averageRating || 0,
          totalReviews: data.totalReviews || 0,
          isReviewsLoading: false,
        }));

        // Check if the current user has already reviewed
        const userReview = data.reviews.find(
          (review: IReview) => review.userId?._id === user?._id
        );
        if (userReview) {
          setState((prevState) => ({
            ...prevState,
            userReview,
            review: userReview.review,
            rating: userReview.rating,
          }));
        }
      } catch (err) {
        console.error(err);
        setState((prevState) => ({
          ...prevState,
          isReviewsLoading: false,
        }));
      }
    };

    fetchReviews();
  }, [productId, user?._id]);

  const handleAddReview = async () => {
    if (!user?._id) {
      toast.error("You must be logged in to add a review.");
      return;
    }

    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user._id,
          productId,
          rating: state.rating,
          review: state.review,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("🚀 ~ handleAddReview ~ data:", data);
        setState((prevState) => ({
          ...prevState,
          isSuccess: true,
          isLoading: false,
          userReview: data.review,
        }));
        // Refresh reviews
        window.location.reload();
      }
      toast.error(data.message);
      setState((prevState) => ({
        ...prevState,
        error: "Error Handling review",
        isLoading: false,
      }));
    } catch (err) {
      setState((prevState) => ({
        ...prevState,
        error: "Error adding/updating review",
        isLoading: false,
      }));
      console.error(err);
    }
  };

  // Destructure state
  const {
    review,
    rating,
    isLoading,
    isSuccess,
    error,
    reviews,
    averageRating,
    totalReviews,
    isReviewsLoading,
    userReview,
  } = state;

  return (
    <div className="p-4 border rounded-lg shadow-lg mt-12">
      <h2 className="text-xl font-bold text-[#F97316]">Product Reviews</h2>

      {isReviewsLoading ? (
        <p>Loading reviews...</p>
      ) : (
        <>
          <div className="mb-4 p-4 ">
            <div className="flex items-center mb-3">
              <FaStar className="text-yellow-400 mr-2" size={20} />
              <span className="mr-2 font-semibold text-gray-800">
                Average Rating:
              </span>

              <div className="text-orange-500 flex items-center  mt-2">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`h-4 w-4 ${
                      index < Math.floor(averageRating || 0)
                        ? "text-orange-500 fill-orange-300"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <FaComment className="text-orange-400 mr-2" size={20} />
              <span className="mr-2 font-semibold text-gray-800">
                Total Reviews:
              </span>
              <span className="text-gray-600">{totalReviews}</span>
            </div>
          </div>

          <div className="mt-6">
            <div>
              <textarea
                value={review}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    review: e.target.value,
                  }))
                }
                placeholder="Write your review here..."
                className="w-full p-2 border rounded"
                rows={4}
              ></textarea>
            </div>
            <div className="flex items-center justify-between my-4">
              <div className="border border-orange-200 rounded-lg p-4 bg-orange-100">
                <StarRatingComponent
                  rating={averageRating}
                  handleRatingChange={setState}
                />
              </div>

              <button
                onClick={handleAddReview}
                disabled={isLoading}
                className="bg-[#F97316] text-white py-2 px-4 rounded mt-4"
              >
                {isLoading
                  ? "Submitting..."
                  : userReview
                  ? "Update Review"
                  : "Submit Review"}
              </button>
            </div>

            {isSuccess && (
              <p className="text-green-500 mt-2">
                Review {userReview ? "updated" : "added"} successfully!
              </p>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <div className="my-10">
            <div className="text-center">
              <HeadLine heading="Customer's Feedback" />
            </div>
            <div className="space-y-2 grid grid-cols-1 lg:grid-cols-4 gap-4">
              {reviews.length > 0 ? (
                reviews.map((review: IReview) => (
                  <div
                    key={review._id}
                    className="border-b py-4 px-6 bg-gradient-to-r from-yellow-400 via-red-400 to-red-600 shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="font-semibold text-lg text-white">
                      {review.userId?.name}
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="text-white text-sm font-medium">
                        <div className="text-orange-500 flex items-center  mt-2">
                          {[...Array(5)].map((_, index) => (
                            <StarIcon
                              key={index}
                              className={` ${
                                index < Math.floor(review.rating || 0)
                                  ? "text-orange-500 fill-orange-300"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </span>
                    </div>
                    <p className="mt-3 text-white text-base">
                      `{review.review}`
                    </p>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewManagement;
