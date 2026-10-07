function BrandContainer({logo,name,follower,voucher}){
    return (
        <div className=" flex flex-col items-center bg-[#FAF8FF] p-3 rounded-xl shrink-0 w-[180px] gap-2">
        <img className="object-cover aspect-square rounded-[50%] w-15" src={logo} alt="" />
        <p className="font-bold text-xl">{name}</p>
        <p className="text-[12px] text-[#73747f]">{`${follower} theo dõi`}</p>
        <button className="bg-[#E2E7FF] w-full rounded-[4px] text-[12px] font-bold p-[3px_0] !text-[#004AC6]">{voucher}</button>
        </div>
    )
}

export default BrandContainer;