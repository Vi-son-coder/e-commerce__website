import './category.css'

function ListOnHeader({children,active, selectTab}){
    const isActive = selectTab === children
    return(
        <>
         <button onClick={active} className = {`${isActive?"active":undefined} cursor-pointer text-sm font-medium`}>{children}</button>
        </>
    )
}

function ListCategory({icon,title}){
    return(
        <>
        <li className='flex flex-col items-center gap-3'>
            <div className='bg-[#F2F3FF] w-15 h-15 flex justify-center items-center rounded-[50%] text-[#004AC6]'>{icon}</div>
            <p className='text-sm font-medium'>{title}</p>
        </li>
        </>
    )
}

export {ListOnHeader, ListCategory} ;