
export const TitleScreenButton = ({text}) => {

    return(
        <>
            <div className="flex items-center justify-center gap-8">
                <button
                    className="bg-slate-800 text-white text-lg px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 hover:bg-slate-700 transition-all duration-300 ease-in-out">
                    {text}
                </button>
            </div>


        </>
    )
}