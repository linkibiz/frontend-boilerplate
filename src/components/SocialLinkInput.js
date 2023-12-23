const SocialLinkInput = ({ name, IconComponent, placeholder }) => {
  return (
    <div className="flex">
      <div className="w-10">
        <IconComponent />
      </div>
    </div>
  );
};

export default SocialLinkInput;
