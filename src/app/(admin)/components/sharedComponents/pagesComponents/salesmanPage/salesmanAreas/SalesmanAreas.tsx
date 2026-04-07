"use client";


import { AutoComplete, Button, Dropdown, Input, Menu, Modal, notification, Skeleton, Space, Table, Tag, Upload } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { usePlacesStore } from "../../../../../../../stores/placesStore/data.store";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { apiArea, apiSalesman } from "../../../../../../../stores/apis";
import { profileComponent } from "../../../../../../../stores/other-store-interfaces";


export default function SalesmanAreas({ profile_id }: profileComponent) {
    const [areas, setAreas] = useState([])
    const [searchText, setSearchText] = useState("");
    const [area_id, setAreaId] = useState(0);
    const { getAreasData, addArea, deleteSalesmanArea, addSalesmanArea, dataCities, editArea, deleteArea } = usePlacesStore();


    const [open, setOpen] = useState(false);


    //Delete Modal 
    const [delitedID, setDelitedID] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const [areasNames, setAreasNames] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    res,
                ] = await Promise.all([
                    apiArea.get('/names'),
                ]);
                setAreasNames(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    const [optionsAreas, setOptionsAreas] = useState(areasNames?.map(e => { return { value: e.id, label: e.name } }));



    async function changeOpenModalAdd() {
        emptyFields();
        setOptionsAreas(areasNames?.map(e => { return { value: e.id, label: e.name } }))
        setOpen(true);
    }

    //addType function
    async function handleAdd() {
        try {
            const res = await addSalesmanArea({ salesman_id: profile_id, area_id, assistant_id: 1 })
            if (res?.status == 201) {
                notification.success({
                    message: "نجاح",
                    description: "تمت العملية بنجاح",
                    placement: 'bottomLeft'
                });
            } else if (res?.status == 500) {
                notification.error({
                    message: "خطأ",
                    description: "حدث خطأ في الاتصال بالسيرفر",
                    placement: 'bottomLeft'
                });
            }
            else {
                notification.error({
                    message: "فشل",
                    description: "فشل العملية",
                    placement: 'bottomLeft'
                });
            }
        } catch (error) {
            notification.error({
                message: "فشل",
                description: "فشل العملية",
                placement: 'bottomLeft'
            });
        }
        fetchAreasData();
        setSearchText("");
        setOpen(false)
    }
    //emptyFields function
    const emptyFields = () => {
        setSearchText("");
        setOpen(false)
    }

    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }
    //showModal
    const router = useRouter();

    const goToAreaPage = (id: number) => {
        router.push(`/areas/${id}`);
    }
    //showModal
    const openShowModal = (id: number) => {

    }

    //delete 
    async function handleDelete(id: number) {
        setLoading2(true);
        try {
            const res = await deleteSalesmanArea(id);
            if (res?.status == 200) {
                notification.success({
                    message: "نجاح",
                    description: "تمت العملية بنجاح",
                    placement: 'bottomLeft'
                });
            } else if (res?.status == 500) {
                notification.error({
                    message: "خطأ",
                    description: "فشل العملية",
                    placement: 'bottomLeft'
                });
            }
            else {
                notification.error({
                    message: "فشل",
                    description: "فشل العملية",
                    placement: 'bottomLeft'
                });
            }
        } catch (error) {
            notification.error({
                message: "فشل",
                description: "فشل العملية",
                placement: 'bottomLeft'
            });
        }
       fetchAreasData()
        setLoading2(false);
        setOpenDeleteModal(false);
    }
    const [pageLoading, setPageLoading] = useState(true);


    const fetchAreasData = async () => {
        try {
            const res = await apiSalesman.get(`/areas/${profile_id}`);
            setAreas(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchAreasData().finally(() => setPageLoading(false));
    }, [profile_id]);


    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "المنطقة",
            dataIndex: "name",
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },
        ,
        {
            title: "المدينة",
            dataIndex: "city_id",
            sorter: (a: any, b: any) => Number(a.city_id) - Number(b.city_id),
            render: (value: number) => {
                return dataCities?.find(e => e.id == Number(value))?.name;
            }
        },
        ,
        {
            title: "الوصف",
            dataIndex: "description",
        },
        {
            title: "تاريخ الإضافة",
            dataIndex: "created_at",
            sorter: (a: any, b: any) => a.created_at.localeCompare(b.created_at),
            render: (value: string) => { return value.slice(0, 10) }

        },
        {
            title: "",
            key: "id",
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button
                        type="default"
                        danger
                        onClick={() => { OpenDeleteModal(record.id); }}
                    >
                        حذف
                    </Button>

                    <Button
                        variant="solid"
                        color="cyan"
                        onClick={() => goToAreaPage(record.id)}
                    >
                        عرض
                    </Button>
                </Space>
            ),
        }
    ];

    return <div>
        {/*Adding Modal*/}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#592C46]">
                    <span>إضافة منطقة</span>
                </div>
            }
            open={open}
            onOk={() => handleAdd()}
            onCancel={() => emptyFields()}
            mask={false}
        ><div className="grid grid-cols-12 gap-2">
                <div className="col-span-12 sm:col-span-6">
                    <h3>
                        المنطقة :
                    </h3>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsAreas}
                        placeholder="المنطقة"
                        value={searchText}
                        onChange={(text) => {
                            setSearchText(text);
                            setAreaId(undefined);
                        }}
                        onSelect={(value, option) => {
                            setAreaId(option.value);
                            setSearchText(option?.label as string);
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

        {/*Delete Modal*/}
        <Modal
            title="تأكيد الحذف"
            open={openDeleteModal}
            onOk={() => handleDelete(delitedID)}
            onCancel={() => setOpenDeleteModal(false)}
            confirmLoading={loading2}
            mask={false}
            okType="danger"
            okButtonProps={{ type: "primary" }}
        >
        </Modal>
        <div className="grid grid-cols-12 gap-4 md:gap-6 w-full">
            <Button className="col-span-5" variant="solid" color="cyan" onClick={() => changeOpenModalAdd()}>
                إضافة
            </Button>


        </div>
        {
            (pageLoading) ? <Skeleton className="h-full w-full" paragraph={{ rows: 10 }} />
                :
                <Table
                    style={{ maxWidth: 1100 }}
                    pagination={{
                        position: ["topRight"],
                    }}
                    scroll={{ x: "max-content" }}
                    columns={columns} dataSource={areas} />
        }
    </div>
}
