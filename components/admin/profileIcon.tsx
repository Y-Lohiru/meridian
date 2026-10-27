export default function ProfileIcon() {
  const letter = "A";
  const name = "Name";
  
  return (
    <div className="text-white mt-auto absolute bottom-0 m-2.5">
      <hr />
      <div className="border m-1.5 text-black bg-on-brand w-8 h-8 rounded-full pl-2.5">
        {letter}
      </div>
      <div>{name}</div>
      <span>Store admin</span>
    </div>
  );
}
