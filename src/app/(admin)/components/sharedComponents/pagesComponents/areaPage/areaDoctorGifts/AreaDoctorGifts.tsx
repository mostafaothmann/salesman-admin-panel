"use client";


import { Skeleton, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

import { apiArea, apiDoctor, apiSalesman, apiType } from "../../../../../../../stores/apis";
import { profileComponent } from "../../../../../../../stores/other-store-interfaces";


export default function AreaDoctorGifts({ profile_id }: profileComponent) {
    const [gifts, setGifts] = useState([])
    const [pageLoading, setPageLoading] = useState(true);
    const [salesmansNames, setSalesmansNames] = useState([])
    const [doctorsNames, setDoctorsNames] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    salesmanRes,
                    doctorsRes
                ] = await Promise.all([
                    apiSalesman.get('/fullname'),
                    apiDoctor.get('/fullname')
                ]);
                setSalesmansNames(salesmanRes.data);
                setDoctorsNames(doctorsRes.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData().finally(() => setPageLoading(false));
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiArea.get(`/doctors-gifts/${profile_id}`);
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
        XLSX.utils.book_append_sheet(workbook, worksheet, "هدايا أطباء المنطقة");
        XLSX.writeFile(workbook, "هدايا أطباء المنطقة.xlsx");
    };



    const columns = [
        {
            title: "الرقم",
            dataIndex: "id",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "المندوب",
            dataIndex: "salesman_id",
            sorter: (a: any, b: any) => Number(a.salesman_id) - Number(b.salesman_id),
            render: (value: number) => {
                const salesman = salesmansNames?.find(e => e.id == Number(value));
                return `${salesman?.first_name} ${salesman?.last_name}`
            }
        },
        {
            title: "الطبيب",
            dataIndex: "doctor_id",
            sorter: (a: any, b: any) => Number(a.doctor_id) - Number(b.doctor_id),
            render: (value: number) => {
                const doctor = doctorsNames?.find(e => e.id == Number(value));
                return `${doctor?.first_name} ${doctor?.last_name}`
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
