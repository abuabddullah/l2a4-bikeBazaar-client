import { motion } from "framer-motion";
import { useGetProfileQuery } from "../../store/api";
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaIdCard } from "react-icons/fa"; // Import icons

const Profile = () => {
  const { data: profile, isLoading } = useGetProfileQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center text-red-500 p-8 animate-pulse">
        Profile not found
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 m-8"
    >
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column - Avatar & Basic Info */}
        <motion.div
          className="md:col-span-1 flex flex-col items-center p-6 bg-gradient-to-b from-orange-50 to-white rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative group">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={profile.avatar}
              alt={profile.name}
              className="w-40 h-40 rounded-full border-4 border-orange-500 shadow-lg object-cover"
            />
            <span
              className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-white ${
                profile.status === "active"
                  ? "bg-green-500 animate-pulse"
                  : "bg-gray-400"
              }`}
            ></span>
          </div>
          <h2 className="text-2xl font-bold mt-4 text-gray-800">
            {profile.name}
          </h2>
          <span className="px-4 py-1.5 mt-3 bg-orange-500 text-white rounded-full text-sm font-medium">
            {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
          </span>
        </motion.div>

        {/* Right Column - Detailed Info */}
        <motion.div
          className="md:col-span-2 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Contact Information */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <FaEnvelope className="text-orange-500 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-700">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <FaPhone className="text-orange-500 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-700">{profile.phone || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <FaMapMarkerAlt className="text-orange-500 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-700">{profile.address || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <FaIdCard className="text-orange-500 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="text-gray-700 text-sm font-mono">
                    {profile._id}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                <span className="text-gray-600">Created Account</span>
                <span className="text-gray-700">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                <span className="text-gray-600">Last Updated</span>
                <span className="text-gray-700">
                  {new Date(profile.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
