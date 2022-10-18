import React from "react";

interface Props{
    headers: string[],
    components: any[],
}


const Tabs: React.FC<Props> = ({ headers, components}) => {
    const [openTab, setOpenTab] = React.useState(0);
    return(
        <div>
            <div className={"flex flex-wrap"}>
                <div className={"w-full"}>
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                        role="tablist"
                    >
                        {headers.map((value,index)=>{
                            return(
                                <li className="-mb-px last:mr-0 flex-auto text-center">
                                    <a
                                        className={
                                            "text-xs font-bold uppercase px-5 py-3 shadow-lg  block leading-normal " + (openTab === index
                                                ? "text-lightBlue-600  bg-white"
                                                : "text-white bg-lightBlue-600")
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(index);
                                        }}
                                        data-toggle="tab"
                                        role="tablist"
                                    >
                                        {value}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                    <div
                        className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">

                                {components.map((value,index)=>{
                                    return(
                                        <div className={openTab === index ? "block" : "hidden"} >
                                            {value}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Tabs;
