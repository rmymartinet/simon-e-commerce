import { UserDataProps } from "@/types/types";
import { useState } from "react";

const UserProfile = ({ userData }: { userData: UserDataProps }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name || "",
    email: userData.email || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = () => {
    setIsEditing(false);

    const fecthData = async () => {
      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("An error occurred");
      }

      const data = await response.json();

      setFormData({
        name: data.name,
        email: data.email,
      });
    };

    fecthData();
  };

  return (
    <div className="flex flex-col rounded-xl bg-gray-900 p-10">
      <p className="mb-4 text-xl font-bold">Profile</p>
      <div className="flex items-center gap-2">
        <strong>Nom:</strong>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="rounded-md border p-1 text-black"
          />
        ) : (
          <p>{userData.name || userData.firstName || "Aucun"}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <strong>Email:</strong>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="rounded-md border p-1 text-black"
          />
        ) : (
          <p>{userData.email || "N/A"}</p>
        )}
      </div>
      {isEditing ? (
        <button
          onClick={handleUpdateProfile}
          className="w-max self-end rounded-md bg-button-gradient px-4 py-2 font-bold text-white"
        >
          Enregistrer
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="mt-10 w-max self-end rounded-md bg-button-gradient px-4 py-2 font-bold text-white"
        >
          Gérer
        </button>
      )}
    </div>
  );
};

export default UserProfile;
