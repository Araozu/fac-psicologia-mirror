import React from "react";

import {UserData} from "@/views/admin/Users/Interfaces/User";

import {useHistory} from "react-router";

export function UserRow(props:{user:UserData}){
    const history = useHistory();
    let names = "";
    if(props.user.name==="null" && props.user.lastName==="null"){
        names= "Invitación con respuesta pendiente"
    }else{
        names = props.user.name+" "+props.user.lastName;
    }
    console.log(names);

const prueba:string="prueba";
    return(
        <tr
            className={"table-row"}
        >
            <th className="px-6 text-xs whitespace-nowrap p-4 text-left">
                {names.toUpperCase()}
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {props.user.email}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {prueba}
            </td>
            {/*
             <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {prueba}
            </td>
            */}
        </tr>
    )

}
