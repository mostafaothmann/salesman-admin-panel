"use client";


import { Button, Dropdown, Input, Modal, notification, Skeleton, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Type } from "../../../../stores/types-store-interfaces";
import { ColumnsType } from "antd/es/table";
import { useOtherStore } from "../../../../stores/otherStore/data.store";


export default function BaseGiftsPage() {
    const { dataBaseGifts, addBaseGift, editBaseGift, getBaseGiftsData, deleteBaseGift } = useOtherStore();


    //Add Modal
    const { TextArea } = Input;
    const [name, setName] = useState("");
    const [id, setId] = useState(0);
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [open, setOpen] = useState(false);
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
    const [open3, setOpen3] = useState(false);
    const [loading3, setLoading3] = useState(false);


    //handleEdit
    async function handleEdit() {
        setLoading(true);
        if (name && /^[A-Za-z\u0600-\u06FF\s]+$/.test(name)) {
            try {
                const res = await editBaseGift(editedId, { name: name, description: description, quantity: quantity });
                if (res?.status == 200 || res?.status == 204) {
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
        }
        setLoading(false);
        setOpenEditModal(false);
        getBaseGiftsData();
    }

    //addType function
    async function handleAdd() {
        if (name && /^[A-Za-z\u0600-\u06FF\s]+$/.test(name)) {
            try {
                const res = await addBaseGift({ name, description, quantity })
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
        }
        getBaseGiftsData();
        setName("");
        setSearchText("");
        setDescription("")
        setOpen(false)
    }
    //emptyFields function
    const emptyFields = () => {
        setName("");
        setSearchText("");
        setDescription("")
        setOpen(false)
    }
    //editModal
    const OpenEditModal = (id: number) => {
        setEditedId(id);
        const city = dataBaseGifts?.find(
            item => item.id === id
        );
        setName(city?.name || "");
        setDescription(city?.description || "");
        setOpenEditModal(true);
    }
    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }
    //showModal
    const openShowModal = (id: number) => {
        const baseGift = dataBaseGifts?.find(
            item => item.id === id
        );
        console.log()
        setName(baseGift?.name || "");
        setDescription(baseGift?.description || "");
        setOpen3(true);
    }

    //delete 
    async function handleDelete(id: number) {
        setLoading2(true);
        try {
            const res = await deleteBaseGift(id);
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
        getBaseGiftsData();
        setLoading2(false);
        setOpenDeleteModal(false);
    }

    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        setPageLoading(true);
        getBaseGiftsData().finally(() => setPageLoading(false));
    }, []);

    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            fixed: "left",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "الهدية",
            dataIndex: "name",
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
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
                        Delete
                    </Button>
                    <Button
                        variant="outlined"
                        color="cyan"
                        onClick={() => { OpenEditModal(record.id); }}
                    >
                        Edit
                    </Button>
                </Space>
            ),
        }
        ,
        {
            title: "",
            fixed: "right",
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button
                        variant="solid"
                        color="cyan"
                        onClick={() => openShowModal(record.id)}
                    >
                        Show
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
                    <span> إضافة هدية</span>
                </div>
            }
            open={open}
            onOk={() => handleAdd()}
            okButtonProps={{ variant: "outlined", color: "purple" }}
            onCancel={() => emptyFields()}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <h3>
                        الهدية
                    </h3>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="الهدية"
                    />
                </div>

                <div className="col-span-12">
                    <h3>
                        الوصف
                    </h3>
                    <TextArea
                        value={description}
                        style={{ maxWidth: '100%' }}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder="الوصف"
                    />
                </div>
            </div>
        </Modal >
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#592C46]">
                    <span>تعديل هدية</span>
                </div>
            }
            open={open1}
            okButtonProps={{ variant: "outlined", color: "blue" }}
            onOk={() => handleEdit()}
            onCancel={() => { setOpenEditModal(false); emptyFields() }}
            confirmLoading={loading}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <h3>
                        الهدية
                    </h3>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="اسم الهدية"
                    />
                </div>
                <div className="col-span-12">
                    <h3>
                        الوصف
                    </h3>
                    <TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder="الوصف"
                    />
                </div>
            </div>
        </Modal>

        {/* Show Modal */}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#592C46]">
                    <span> تفاصيل هدية</span>
                </div>
            }
            open={open3}
            onOk={() => emptyFields()}
            okButtonProps={{ variant: "outlined", color: "cyan" }}

            onCancel={() => { setOpen3(false); emptyFields() }}
            confirmLoading={loading}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <h3>
                        الهدية
                    </h3>
                    <Input
                        disabled
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="اسم الهدية"
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
            <Button className="col-span-5" variant="solid" color="cyan" onClick={() => setOpen(true)}>
                إضافة
            </Button>

        </div>
        {
            (pageLoading) ? <Skeleton className="h-full w-full" paragraph={{ rows: 10 }} />
                :
                <Table
                    style={{ maxWidth: 1100 }}
                    scroll={{ x: "max-content" }}
                    pagination={{
                        position: ["topRight"],
                    }}
                    columns={columns} dataSource={dataBaseGifts} />
        }
    </div >
}
