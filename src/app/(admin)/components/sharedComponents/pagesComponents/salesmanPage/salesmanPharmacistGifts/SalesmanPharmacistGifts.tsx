"use client";


import { Skeleton, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

import { apiDoctor, apiSalesman } from "../../../../../../../stores/apis";
import { profileComponent } from "../../../../../../../stores/other-store-interfaces";


export default function SalesmanPharmacistGifts({ profile_id }: profileComponent) {
    const [gifts, setGifts] = useState([])
    const [pageLoading, setPageLoading] = useState(true);
    const [pharmacistsNames, setPharmacistsNames] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    salesmanRes,
                ] = await Promise.all([
                    apiSalesman.get('/fullname'),
                ]);
                setPharmacistsNames(salesmanRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData().finally(() => setPageLoading(false));
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiSalesman.get(`/pharmacist-gifts/${profile_id}`);
                setGifts(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData().finally(() => setPageLoading(false));
    }, [profile_id]);

    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(gifts ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "عينات");
        XLSX.writeFile(workbook, "عينات.xlsx");
    };



    const columns = [
        {
            title: "الرقم",
            dataIndex: "id",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "الصيدلي",
            dataIndex: "pharmacist_id",
            sorter: (a: any, b: any) => Number(a.pharmacist_id) - Number(b.pharmacist_id),
            render: (value: number) => {
                const pharmacist = pharmacistsNames?.find(e => e.id == Number(value));
                return `${pharmacist?.first_name} ${pharmacist?.last_name}`
            }
        },
        {
            title: "الهدية",
            dataIndex: "name",
            sorter: (a: any, b: any) => Number(a.name) - Number(b.name),
        },
        {
            title: "الكمية",
            dataIndex: "quantity",
            sorter: (a: any, b: any) => Number(a.quantity) - Number(b.quantity),
        },
        {
            title: "تاريخ الإضافة",
            dataIndex: "created_at",
            sorter: (a: any, b: any) => a.created_at.localeCompare(b.created_at),
            render: (value: string) => { return value?.slice(0, 10) }
        }
    ];

    return <div>
        {
            (pageLoading) ? <Skeleton className="h-full w-full" paragraph={{ rows: 10 }} />
                :
                <Table
                    scroll={{ x: "max-content" }}
                    style={{ maxWidth: 1100 }}
                    columns={columns}
                    dataSource={gifts || []} />
        }

    </div >
}
