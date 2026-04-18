"use client";


import { AutoComplete, Button, Modal, Table, Space, Input, notification, Skeleton } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { ColumnsType } from "antd/es/table";
import { usePlacesStore } from "../../../../../../../stores/placesStore/data.store";
import { apiArea } from "../../../../../../../stores/apis";
import { profileComponent } from "../../../../../../../stores/other-store-interfaces";


export default function AreaStreets({ profile_id }: profileComponent) {
    const [streets, setStreets] = useState([])

    const { addStreet, dataAreas, editStreet, deleteStreet } = usePlacesStore();

    const [pageLoading, setPageLoading] = useState(true);

    const fetchDataStreets = async () => {
        try {
            const res = await apiArea.get(`/streets/${profile_id}`);
            setStreets(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchDataStreets().finally(() => setPageLoading(false));
    }, [profile_id]);

    //Add Modal
    const { TextArea } = Input;
    const [name, setName] = useState("");
    const [id, setId] = useState(0);
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [area_id, setAreaId] = useState(1);
    const [searchText, setSearchText] = useState("");

    //Edit Modal
    const [open1, setOpenEditModal] = useState(false);
    const [editedId, setEditedId] = useState(0)
    const [loading, setLoading] = useState(false);

    //Delete Modal 
    const [delitedID, setDelitedID] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading2, setLoading2] = useState(false);

    //Show Modal 
    const [shownId, setShownId] = useState(0);
    const [openShowModal, setOpenShowModal] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [items, setItems] = useState([])

    //options for Area auto complete
    const options = dataAreas?.map(e => { return { value: e.id, label: e.name } })

    //handleEdit
    async function handleEdit() {
        setLoading(true);
        if (name && /^[A-Za-z\u0600-\u06FF\s]+$/.test(name)) {
            try {
                const res = await editStreet(editedId, { name: name, description: description, area_id: area_id });
                if (res?.status == 200 || res?.status == 204) {
                    notification.success({
                        title: "نجاح",
                        description: "تمت العملية بنجاح",
                        placement: 'bottomLeft'
                    });
                } else if (res?.status == 500) {
                    notification.error({
                        title: "خطأ",
                        description: "حدث خطأ في الاتصال بالسيرفر",
                        placement: 'bottomLeft'
                    });
                }
                else {
                    notification.error({
                        title: "فشل",
                        description: "فشل العملية",
                        placement: 'bottomLeft'
                    });
                }
            } catch (error) {
                notification.error({
                    title: "فشل",
                    description: "فشل العملية",
                    placement: 'bottomLeft'
                });
            }
        }

        setLoading(false);
        setOpenEditModal(false);
        fetchDataStreets();
    }


    //emptyFields function
    const emptyFields = () => {
        setName("");
        setSearchText("");
        setAreaId(-1);
        setDescription("")
        setOpen(false)
        setOpenShowModal(false)

    }
   
  
    //showModal
    const OpenShowModal = (id: number) => {
        const street = streets?.find(
            item => item.id === id
        );
        console.log()
        setName(street?.name || "");
        setDescription(street?.description || "");
        console.log(street)
        setOpenShowModal(true);
    }

    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            fixed: 'left',
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "الشارع",
            dataIndex: "name",
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },
        ,
        {
            title: "المنطقة",
            dataIndex: "area_id",
            sorter: (a: any, b: any) => Number(a.area_id) - Number(b.area_id),
            render: (value: number) => {
                return dataAreas?.find(e => e.id == Number(value))?.name;
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
            fixed: 'right',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button
                        variant="solid"
                        color="cyan"
                        onClick={() => OpenShowModal(record.id)}
                    >
                        عرض
                    </Button>
                </Space>
            ),
        }
    ];

    return <div>
      
      

        {/* Show Modal */}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#592C46]">
                    <span>
                        تفاصيل شارع
                    </span>
                </div>
            }
            open={openShowModal}
            onOk={() => emptyFields()}
            okButtonProps={{ variant: "outlined", color: "cyan" }}

            onCancel={() => { setOpenShowModal(false); emptyFields() }}
            confirmLoading={loading}
            mask={false}
        >
            <div className="grid grid-cols-12 sm:col-span-12  col-span-12 gap-2">
                <div className="col-span-12">
                    <h3>
                        اسم الشارع
                    </h3>
                    <Input
                        disabled
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="اسم الشارع"
                    />
                </div>
                <div className="col-span-12">
                    <h3>
                        الوصف
                    </h3>
                    <TextArea
                        disabled
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder="الوصف"
                    />
                </div>
            </div>
        </Modal>


        <div className="grid grid-cols-12 gap-4 md:gap-6 w-full">
            <Button className="col-span-5" variant="solid" color="cyan" onClick={() => setOpen(true)}>
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
                    columns={columns} dataSource={streets} />
        }
    </div >
}
