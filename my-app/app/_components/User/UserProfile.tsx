import { UserDataProps } from "@/types/types";

const UserProfile = ({ userData }: { userData: UserDataProps }) => {
  return (
    <div className="program-button-container flex flex-col rounded-xl p-10">
      <p className="mb-4 text-xl font-bold">Profil</p>
      <div className="flex items-center gap-2">
        <strong>Nom:</strong>
        <p>{userData.name || "N/A"}</p>
      </div>
      <div className="flex items-center gap-2">
        <strong>Email:</strong>
        <p>{userData.email || "N/A"}</p>
      </div>
      <button
        onClick={() => {}}
        className="w-max self-end rounded-md bg-button-gradient px-4 py-2 font-bold text-white"
      >
        Gérer
      </button>
    </div>
  );
};

export default UserProfile;
