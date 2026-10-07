export default function TitleOfCategory(){
    return(
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <div className="w-2 h-6 rounded-2xl bg-[#004AC6]"></div>
            <p className="font-bold text-xl">Khám phá danh mục</p>
          </div>
          <button className="!text-[#004AC6] font-medium text-sm">
            {"Xem tất cả>"}
          </button>
        </div>
    )
}