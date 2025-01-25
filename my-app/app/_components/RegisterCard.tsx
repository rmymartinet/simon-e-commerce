const RegisterCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid w-full place-content-center">
      <div className="flex w-[400px] flex-col items-center gap-10 rounded-lg bg-white p-8">
        {children}
      </div>
    </section>
  );
};

export default RegisterCard;
