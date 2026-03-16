"use client";


import { AutoComplete, Button, Dropdown, Input, InputNumber, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useTypeStore } from "../../../../stores/typesStore/data.store";
import { useRouter } from "next/navigation";
import { useMedicalStore } from "../../../../stores/medicalStore/data.store";
import { apiType } from "../../../../stores/apis";


export default function SamplePharmacistPage() {
    const { dataPharmacistSamples, pharmacistSampleD, filter_total, total, getFilteredDataPharmacistsSamples, getPharmacistSamplesData, getpharmacistSampleData, filteredDataPharmacistsSamples } = useMedicalStore();
    const router = useRouter();
    //table constants
    const [page, setPage] = useState(1)
    const [filter_page, setFilterPage] = useState(1)
    const [limit, setLimit] = useState(10)
    //showModal
    const OpenShowModal = (id: number) => {


    }

    //Filter Modal 
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [filtered, setFiltered] = useState(false)
    const [filter_min_quantity, setFilterMinQuantity] = useState(-1);
    const [filter_max_quantity, setFilterMaxQuantity] = useState(101);

    const [filter_type_id, setFilterTypeId] = useState(0);
    const [searchTextType, setSearchTextType] = useState("");
    const [typesNames, setTypesNames] = useState([])

    //Filter Modal Funcs
    const OpenFilterModal = () => {
        emptyFields();
        if (!filtered) {
            setOpenFilterModal(true);
        }
        else {
            setFiltered(false);
        }
    }
    const getFilteredData = (page: number, limit: number) => {
        getFilteredDataPharmacistsSamples({
            page,
            limit,
            filter_min_quantity,
            filter_max_quantity,
            filter_type_id
        })
        setFiltered(true);
    }
    const handleFilter = () => {
        getFilteredData(page, limit);
        setOpenFilterModal(false)
        emptyFields();
    }

    //emptyFields function
    const emptyFields = () => {

    }




    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataPharmacistSamples ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "المكونات");
        XLSX.writeFile(workbook, "المكونات.xlsx");
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    typeRes,
                ] = await Promise.all([
                    apiType.get('/names'),
                ]);
                setTypesNames(typeRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        getPharmacistSamplesData(page, limit);
    }, []);

    const columns = [
        {
            title: "الرقم",
            dataIndex: "id",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "العينة",
            dataIndex: "type_id",
            sorter: (a: any, b: any) => Number(a.type_id) - Number(b.type_id),
            render: (value: number) => {
                const type = typesNames?.find(e => e.id == Number(value));
                return `${type?.name}`
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
        <div className="grid grid-cols-12 gap-4 md:gap-6 w-full">
            <Button className="col-span-5" variant="solid" color="purple" onClick={() => OpenFilterModal()}>
                فلترة
            </Button>
            <Button className="col-span-5" variant="solid" color="green" onClick={() => downloadExcel()}>
                تنزيل
            </Button>
        </div>

        {/*Filter Modal*/}
        <Modal
            title="فلترة النتائج"
            open={openFilterModal}
            onOk={() => handleFilter()}
            onCancel={() => { setOpenFilterModal(false); emptyFields() }}
            confirmLoading={loading3}
            mask={false}

            okButtonProps={{ type: "primary", variant: "outlined" }}
        >
            <div className="grid grid-cols-12 gap-4">

                <div className="col-span-6 xl:col-span-6">
                    <div>
                        <h3>
                            صنف العينة :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={typesNames?.map(e => { return { value: e.id, label: `${e.name} ` } })
                        }
                        placeholder="صنف الزيارة"
                        value={searchTextType}

                        onChange={(text) => {
                            setSearchTextType(text);
                            setFilterTypeId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setFilterTypeId(option.value);
                            setSearchTextType(option?.label as string);
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>
            </div>
        </Modal>
        <div className="max-w-full">
            {filtered ? <Table
                scroll={{ x: "max-content" }}
                columns={columns}
                pagination={{
                    placement: ['topEnd'],
                    current: filter_page,
                    pageSize: limit,
                    total: filter_total,
                    onChange: (page, pageSize) => {
                        setFilterPage(filter_page)
                        getFilteredData(page, pageSize)
                        // setPage(lastPage)
                    },
                }}
                dataSource={filteredDataPharmacistsSamples || []} />
                :
                <Table
                    scroll={{ x: "max-content" }}
                    style={{ maxWidth: 1100 }}
                    columns={columns}
                    pagination={{
                        placement: ['topEnd'],
                        current: page,
                        pageSize: limit,
                        total: total,
                        onChange: (page, pageSize) => {
                            getPharmacistSamplesData(page, pageSize);
                            setPage(page)
                            //setPage(lastPage)
                        },
                    }}
                    dataSource={dataPharmacistSamples || []} />
            }

        </div >
    </div>
}
