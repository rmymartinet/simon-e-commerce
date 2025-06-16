import { Button } from "../ui/button";

const UserFilter = ({
  isProgram,
  setIsProgram,
}: {
  isProgram: string;
  setIsProgram: (value: string) => void;
}) => {
  return (
    <div className=" flex items-center gap-10 self-end">
      <Button
        variant={isProgram === "program" ? "whiteBg" : "default"}
        onClick={() => setIsProgram("program")}
      >
        Programme
      </Button>
      <Button
        variant={isProgram === "subscription" ? "whiteBg" : "default"}
        onClick={() => setIsProgram("subscription")}
      >
        Abonnement
      </Button>
    </div>
  );
};

export default UserFilter;
