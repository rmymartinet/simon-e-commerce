const UserFilter = ({
  isProgram,
  setIsProgram,
}: {
  isProgram: string;
  setIsProgram: (value: string) => void;
}) => {
  return (
    <div className="program-button-container padding flex items-center gap-10 self-end rounded-xl">
      <button
        onClick={() => setIsProgram("program")}
        className={`padding ${isProgram === "program" ? "bg-button-gradient" : "bg-black opacity-50"} rounded-xl`}
      >
        Programme
      </button>
      <button
        onClick={() => setIsProgram("subscription")}
        className={`padding ${isProgram === "subscription" ? "bg-button-gradient" : "bg-black opacity-50"} rounded-xl`}
      >
        Abonnement
      </button>
    </div>
  );
};

export default UserFilter;
