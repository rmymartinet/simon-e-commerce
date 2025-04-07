const RegisterCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid w-full place-content-center">
      <div className="flex w-full flex-col items-center gap-10 rounded-lg border border-[--border-color] bg-[--card-bg] p-8 md:w-[400px]">
        {children}
      </div>
    </section>
  );
};

export default RegisterCard;
