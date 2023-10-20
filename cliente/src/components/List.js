import React, { useEffect, useState } from "react";

function List({ updateList }) {
    const endpoint = "http://localhost:4000/api/register";
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(endpoint)
            .then((res) => res.json())
            .then((data) => setList(data));
    }, []);

    useEffect(() => {
        if (updateList) {
            fetch(endpoint)
                .then((res) => res.json())
                .then((data) => setList(data));
        }
    }, [updateList]);

    return (
        <div className="">
            <table className=" ">
                <thead className="">
                    <tr>
                        <th scope="col" className="px-6 py-3">Placa del Vehiculo</th>
                        <th scope="col" className="px-6 py-3">Tiempo estacionado minutos</th>
                        <th scope="col" className="px-6 py-3">Cantidad a Pagar $</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr className="" key={index}>
                            <td className=" px-6 py-4">{item.placa}</td>
                            <td className="px-6 py-4">{item.tiempo}</td>
                            <td className="px-6 py-4">{item.tiempo * 0.05}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default List;
