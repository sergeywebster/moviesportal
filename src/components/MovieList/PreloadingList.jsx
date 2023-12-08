import { Fragment } from "react";

const PreloadingList = () => {
    return (
        <Fragment>
            <div className="flex gap-5 bg-slate-50 rounded-md p-5 my-5">
                <div className="flex items-center animate-pulse w-7"><span className="block bg-slate-200 h-4 w-2 rounded-sm"></span></div>
                <div className="bg-slate-200 h-[123px] w-[80px] rounded-lg animate-pulse"></div>
                <div>
                    <div className="bg-slate-200 h-3 w-38 rounded-lg animate-pulse"></div>
                    <div className="bg-slate-200 h-3 w-36 rounded-lg  mt-2 animate-pulse"></div>
                    <div className="bg-slate-200 h-3 w-30 rounded-lg mt-5 animate-pulse"></div>
                </div>
            </div>
            <div className="flex gap-5 bg-slate-50 rounded-md p-5 my-5">
                <div className="flex items-center animate-pulse w-7"><span className="block bg-slate-200 h-4 w-2 rounded-sm"></span></div>
                <div className="bg-slate-200 h-[90px] w-[60px] rounded-lg animate-pulse"></div>
                <div>
                    <div className="bg-slate-200 h-3 w-36 rounded-lg animate-pulse"></div>
                    <div className="bg-slate-200 h-3 w-32 rounded-lg  mt-2 animate-pulse"></div>
                    <div className="bg-slate-200 h-3 w-28 rounded-lg mt-5 animate-pulse"></div>
                </div>
            </div>
            <div className="flex gap-5 bg-slate-50 rounded-md p-5 my-5">
                <div className="flex items-center animate-pulse w-7"><span className="block bg-slate-200 h-4 w-2 rounded-sm"></span></div>
                <div className="bg-slate-200 h-[90px] w-[60px] rounded-lg animate-pulse"></div>
                <div>
                    <div className="bg-slate-200 h-3 w-36 rounded-lg animate-pulse"></div>
                    <div className="bg-slate-200 h-3 w-32 rounded-lg  mt-2 animate-pulse"></div>
                    <div className="bg-slate-200 h-3 w-28 rounded-lg mt-5 animate-pulse"></div>
                </div>
            </div>
            
        </Fragment>
    )
}

export default PreloadingList;