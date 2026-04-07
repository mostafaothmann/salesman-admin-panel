"use client";


import { Skeleton, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

import { apiDoctor, apiSalesman } from "../../../../../../../stores/apis";
import { profileComponent } from "../../../../../../../stores/other-store-interfaces";


export default function SalesmanDoctorSamples({ profile_id }: profileComponent) {
    const [samples, setSamples] = useState([])
    const [pageLoading, setPageLoading] = useState(true);
    const [doctorsNames, setDoctorsNames] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    res,
                ] = await Promise.all([
                    apiDoctor.get('/fullname'),
                ]);
                setDoctorsNames(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData().finally(() => setPageLoading(false));
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiSalesman.get(`/doctor-samples/${profile_id}`);
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
            title: "الطبيب",
            dataIndex: "salesman_id",
            sorter: (a: any, b: any) => Number(a.salesmna_id) - Number(b.salesmna_id),
            render: (value: number) => {
                const doctor = doctorsNames?.find(e => e.id == Number(value));
                return `${doctor?.first_name} ${doctor?.last_name}`
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
