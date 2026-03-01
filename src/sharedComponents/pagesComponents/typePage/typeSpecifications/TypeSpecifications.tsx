"use client";

import Head from "next/head";
import { Type } from "../../../../stores/types-store-interfaces";
import Input from "antd/es/input/Input";
import { useTypeStore } from "../../../../stores/typesStore/data.store";
import { useEffect, useState } from "react";


export default function TypesSpecifications({ name, admin_description, salesman_description, id,
    grouptype_id, brand, manufacturing_date, price_for_piece,
    percentage, online_percentage, quantity }: Type) {
    useEffect(() => { getIngredientsForType(+id); console.log(grouptype.name) }, [])
    const { dataIngredientsForType, getIngredientsForType, dataGroupTypes } = useTypeStore()
    const grouptype = dataGroupTypes?.find(e => e.id == grouptype_id)
    const [page_name, setPageName] = useState(name)
    const [page_grouptype_id, setPageGroupTypeId] = useState(grouptype.name)
    return (
        <>
            <Head>
                <title>Blog Page</title>
                <meta name="description" content="Latest blog posts" />
            </Head>

            <main>
                <div className="grid grid-cols-12 gap-2">
                    <div className="grid grid-cols-12 col-span-12 xl:col-span-6 gap-2">
                        <div className="col-span-12 xl:col-span-6">
                            <h3>
                                اسم الصنف :
                            </h3>
                            <Input
                                className="w-0.5"
                                value={page_name}
                                onChange={(e) => setPageName(e.target.value)}
                                placeholder="اسم الصنف"
                            />
                        </div>

                        <div className="col-span-12 xl:col-span-6">
                            <h3>
                                نوع الصنف :
                            </h3>
                            <Input
                                className="w-0.5"
                                value={page_grouptype_id}
                                onChange={(e) => setPageGroupTypeId(e.target.value)}
                                placeholder="اسم الصنف"
                            />
                        </div>
                        {dataIngredientsForType?.map(e => { return <div>{e.name}</div> })}
                    </div>
                </div>
            </main>
        </>
    );
}