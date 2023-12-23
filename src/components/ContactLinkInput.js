import QuestionMark from './Icons/QuestionMark'; // Update the import path as needed

const ContactLinkInput = ({ name, IconComponent, placeholder }) => {
  return (
    <div className="flex items-end gap-4">
      <div className="w-9">
        <IconComponent />
      </div>
      <div className="flex flex-col grow gap-1">
        <p className="flex text-black font-bold text-[12px] gap-1">
          {name}
          <span className="w-[18px]">
            <QuestionMark />
          </span>
        </p>
        <div className="relative">
          <input type="text" className="rounded-md py-1 px-2 w-full" placeholder={placeholder}></input>
          <span className="absolute w-[18px] h-[18px] rounded-full bg-[#d36a6a] text-white left-[95%] bottom-[75%] font-bold flex items-center justify-center text-[10px]">
            X
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactLinkInput;
