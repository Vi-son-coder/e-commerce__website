function TitleOfAIRecomment(){
    return(
        <div className="flex justify-between bg-[#F2F3FF] p-3 rounded-[9px] items-center">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="size-9 p-2 bg-[#8A4CFC] text-white rounded-[8px]"
            >
              <path d="m10.852 14.772-.383.923" />
              <path d="m10.852 9.228-.383-.923" />
              <path d="m13.148 14.772.382.924" />
              <path d="m13.531 8.305-.383.923" />
              <path d="m14.772 10.852.923-.383" />
              <path d="m14.772 13.148.923.383" />
              <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771" />
              <path d="M17.998 5.125a4 4 0 0 1 2.525 5.771" />
              <path d="M19.505 10.294a4 4 0 0 1-1.5 7.706" />
              <path d="M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516" />
              <path d="M4.5 10.291A4 4 0 0 0 6 18" />
              <path d="M6.002 5.125a3 3 0 0 0 .4 1.375" />
              <path d="m9.228 10.852-.923-.383" />
              <path d="m9.228 13.148-.923.383" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <div>
              <p className="font-bold text-[17px]">Gợi ý thông minh AI</p>
              <span className="text-[12px] text-[#787983]">
                Phân tích hành vi duyệt gần đây: Danh mục "Tai nghe & Phụ kiện
                cao cấp
              </span>
            </div>
          </div>
          <button>
            {
              <div className="flex gap-1 items-center bg-white p-2 rounded-[8px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-3 text-[#8A4CFC]"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[12px]">Làm mới gợi ý</span>
              </div>
            }
          </button>
        </div>
    )
}

export default TitleOfAIRecomment;