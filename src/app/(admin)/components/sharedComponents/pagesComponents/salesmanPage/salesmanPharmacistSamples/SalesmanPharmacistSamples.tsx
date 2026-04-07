"use client";


import { Skeleton, Table } from "antd";
import { useEffect, useState } from "react";
import { apiPharmacist, apiSalesman } from "../../../../../../../stores/apis";
import { profileComponent } from "../../../../../../../stores/other-store-interfaces";


export default function SalesmanPharmacistSamples({ profile_id }: profileComponent) {
    const [samples, setSamples] = useState([])
    const [pageLoading, setPageLoading] = useState(true);
    const [pharmacistsNames, setPharmacistsNames] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    res,
                ] = await Promise.all([
                    apiPharmacist.get('/fullname'),
                ]);
                setPharmacistsNames(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData().finally(() => setPageLoading(false));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiSalesman.get(`/pharmacist-samples/${profile_id}`);
                setSamples(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData().finally(() => setPageLoading(false));
    }, [profile_id]);


    const columns = [
        {
            title: "الرقم",
            dataIndex: "id",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "الصيدلي",
            dataIndex: "salesman_id",
            sorter: (a: any, b: any) => Number(a.salesmna_id) - Number(b.salesmna_id),
            render: (value: number) => {
                const pharmacist = pharmacistsNames?.find(e => e.id == Number(value));
                return `${pharmacist?.first_name} ${pharmacist?.last_name}`
            }
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
                    dataSource={samples || []} />
        }

    </div >
}
