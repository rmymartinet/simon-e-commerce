const UserFilter = ({
  isProgram,
  setIsProgram,
}: {
  isProgram: string;
  setIsProgram: (value: string) => void;
}) => {
  return (
    <div className=" flex items-center gap-10 self-end">
      <button
        onClick={() => setIsProgram("program")}
        className={`px-4 py-2 ${isProgram === "program" ? "bg-button-gradient" : "bg-black opacity-50"} rounded-xl`}
      >
        Programme
      </button>
      <button
        onClick={() => setIsProgram("subscription")}
        className={`px-4 py-2 ${isProgram === "subscription" ? "bg-button-gradient" : "bg-black opacity-50"} rounded-xl`}
      >
        Abonnement
      </button>
    </div>
  );
};

export default UserFilter;
