import React from "react";
import "./Tabs.css";

interface Props{
    headers: string[],
    components: JSX.Element[],
}


const Tabs: React.FC<Props> = ({headers, components}) => {
    const [openTab, setOpenTab] = React.useState(0);
    return (
        <div>
            <div className="flex flex-wrap mb-4">
                <div className="w-full">
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 flex-row bg-lightBlue-600"
                        role="tablist"
                    >
                        {headers.map((value,index) => (
                            <li className="last:mr-0 text-center" key={index}>
                                <a
                                    className={
                                        `text-xs font-bold uppercase px-6 py-3 block leading-normal tab${openTab === index
                                            ? " bg-blueGray-100 text-lightBlue-600 border-top-rounded"
                                            : " bg-lightBlue-600 text-white"}`
                                    }
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpenTab(index);
                                    }}
                                    data-toggle="tab"
                                    role="tablist"
                                >
                                    {value}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div
                        className="relative flex flex-col min-w-0 break-words bg-blueGray-100 w-full mb-6 rounded"
                    >
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">

                                {components.map((value, index) => (
                                    <div key={index} className={`bg-blueGray-100 ${openTab === index ? "block" : "hidden"}`} >
                                        {value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Tabs;
