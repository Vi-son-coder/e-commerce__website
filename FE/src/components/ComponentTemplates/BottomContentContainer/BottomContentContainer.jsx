function BottomContentContainer({ icon, iconColor, iconBgColor, title, desc }) {
  return (
    <div className="flex gap-2 items-center ">
      <div style={{color:iconColor, background:iconBgColor}} className=" p-3 rounded-xl">{icon}</div>
      <div>
        <p className="text-[18px] font-semibold capitalize">{title}</p>
        <p className="text-[13px] text-[#595a5a]">{desc}</p>
      </div>
    </div>
  );
}

export default BottomContentContainer;