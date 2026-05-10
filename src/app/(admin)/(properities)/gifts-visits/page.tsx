"use client";


import { AutoComplete, Button, Dropdown, Input, InputNumber, Modal, notification, Skeleton, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useTypeStore } from "../../../../stores/typesStore/data.store";
import { useRouter } from "next/navigation";
import { useMedicalStore } from "../../../../stores/medicalStore/data.store";
import { apiBaseGift, apiGiftVisit, apiType } from "../../../../stores/apis";
import { useOtherStore } from "../../../../stores/otherStore/data.store";


export default function GiftVisitsPage() {
    const { dataGiftsVisits, giftVisitD, filter_total, total, getFilteredDataGiftVisits, getGiftVisitsData, getGiftVisitData, filteredDataGiftsVisits } = useOtherStore();
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
    const [filter_visit_id, setFilterVisitId] = useState(101);
    const [filter_base_gift_id, setFilterBaseGiftId] = useState(0);
    const [searchTextType, setSearchTextBaseGift] = useState("");
    const [giftsNames, setGiftsNames] = useState([])

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
        getFilteredDataGiftVisits({
            page,
            limit,
            filter_min_quantity,
            filter_max_quantity,
            filter_base_gift_id,
            filter_visit_id
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
        setFilterBaseGiftId(null);
        setSearchTextBaseGift(null);
    }

    //downloadExcele
    const [allData, setAllData] = useState([])
    const downloadExcel = () => {
        apiGiftVisit.get('/all')
            .then(res => {
                setAllData(res.data.data);
                const formattedData = (allData ?? []).map(item => ({
                    "تاريخ البيع": item.created_at.slice(0, 10),
                    "الكمية": item.base_quantity,
                    "الهدية":giftsNames?.find(e => e.id == Number(item.type_id))?.name,
                }));
                const worksheet = XLSX.utils.json_to_sheet(formattedData);
                worksheet["!cols"] = [
                    { wch: 15 },
                    { wch: 10 },
                    { wch: 10 },
                ];
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "الهدايا المقدمة");
                XLSX.writeFile(workbook, "الهدايا المقدمة.xlsx")
            })
            .catch(err => {
                notification.error({
                    message: "خطأ",
                    description: "حدث خطأ في جلب البيانات",
                    placement: 'bottomLeft'
                });
            });
    };

    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    res,
                ] = await Promise.all([
                    apiBaseGift.get('/names'),
                ]);
                setGiftsNames(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        setPageLoading(true);
        fetchData().finally(() => setPageLoading(false));;
        getGiftVisitsData(page, limit);
    }, []);

    const columns = [
        {
            title: "الرقم",
            dataIndex: "id",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
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
                            الهدية :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={giftsNames?.map(e => { return { value: e.id, label: `${e.name} ` } })
                        }
                        placeholder="الهدية"
                        value={searchTextType}

                        onChange={(text) => {
                            setSearchTextBaseGift(text);
                            setFilterBaseGiftId(undefined);
                        }}
                        onSelect={(value, option) => {
                            setFilterBaseGiftId(option.value);
                            setSearchTextBaseGift(option?.label as string);
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

        <div className="grid grid-cols-12 gap-4 md:gap-6 w-full">
            <Button className="col-span-5" variant="solid" color="purple" onClick={() => OpenFilterModal()}>
                فلترة
            </Button>
            <Button className="col-span-5" variant="solid" color="green" onClick={() => downloadExcel()}>
                تنزيل
            </Button>
        </div>

        {
            (pageLoading) ? <Skeleton className="h-full w-full" paragraph={{ rows: 10 }} />
                :
                filtered ? <Table
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
                    dataSource={filteredDataGiftsVisits || []} />
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
                                getGiftVisitsData(page, pageSize);
                                setPage(page)
                                //setPage(lastPage)
                            },
                        }}
                        dataSource={dataGiftsVisits || []} />
        }
    </div >
}
