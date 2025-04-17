const Title = ({ title }) => {
  return (
    <div className="px-2 py-5 shadow-md bg-white">
      <h1 className="text-xl font-semibold spacing tracking-wider text-center">
        {title}
      </h1>
    </div>
  );
};

export default Title;
