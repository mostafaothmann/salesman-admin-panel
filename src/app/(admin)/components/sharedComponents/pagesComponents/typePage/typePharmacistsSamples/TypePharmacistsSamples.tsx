"use client";


import { AutoComplete, Button, Dropdown, Input, InputNumber, Modal, Skeleton, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useTypeStore } from "../../../../../../../stores/typesStore/data.store";
import { useRouter } from "next/navigation";
import { useMedicalStore } from "../../../../../../../stores/medicalStore/data.store";
import { apiPharmacist, apiSalesman, apiType } from "../../../../../../../stores/apis";
import { profileComponent } from "../../../../../../../stores/other-store-interfaces";


export default function TypePharmacistsSamples({ profile_id }: profileComponent) {
    const [pharmacistsSamples, setPharmacistSamples] = useState([])
    const [pageLoading, setPageLoading] = useState(true);
    const [pharmacistsNames, setPharmacistsNames] = useState([])
    const [salesmansNames, setSalesmansNames] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    salesmanRes,
                    pharmacistsRes,
                ] = await Promise.all([
                    apiSalesman.get('/fullname'),
                    apiPharmacist.get('/fullname'),
                ]);
                setSalesmansNames(salesmanRes.data);
                setPharmacistsNames(pharmacistsRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData().finally(() => setPageLoading(false));
    }, [profile_id]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiType.get(`/pharmacists-samples/${profile_id}`);
                setPharmacistSamples(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData().finally(() => setPageLoading(false));
    }, [profile_id]);



    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(pharmacistsSamples ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "عينات الصيادلة");
        XLSX.writeFile(workbook, "عينات الصيادلة.xlsx");
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
            sorter: (a: any, b: any) => Number(a.salesmna_id) - Number(b.salesmna_id),
            render: (value: number) => {
                const salesman = salesmansNames?.find(e => e.id == Number(value));
                return `${salesman?.first_name} ${salesman?.last_name}`
            }
        },
        {
            title: "الصيدلي",
            dataIndex: "pharmacist_id",
            sorter: (a: any, b: any) => Number(a.pharmacist_id) - Number(b.pharmacist_id),
            render: (value: number) => {
                const doctor = pharmacistsNames?.find(e => e.id == Number(value));
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
                    dataSource={pharmacistsSamples || []} />
        }

    </div >
}
