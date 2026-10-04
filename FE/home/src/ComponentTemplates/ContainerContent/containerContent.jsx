function ContainerContent({children}){
      return(
        <div className="bg-white p-5 rounded-2xl mt-7 gap-5 flex flex-col shadow">
        {children}
        </div>
      )
    }

export default ContainerContent;