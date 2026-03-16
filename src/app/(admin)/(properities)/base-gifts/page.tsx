"use client";


import { Button, Dropdown, Input, Modal, Space, Table } from "antd";
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
        await editBaseGift(editedId, { name: name, description: description, quantity: quantity });
        setLoading(false);
        setOpenEditModal(false);
        getBaseGiftsData();
    }

    //addType function
    async function handleAdd() {
        await addBaseGift({ name, description, quantity })
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
        await deleteBaseGift(id);
        getBaseGiftsData();
        setLoading2(false);
        setOpenDeleteModal(false);
    }

    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataBaseGifts ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "الهدايا الأساسية");
        XLSX.writeFile(workbook, "الهدايا الأساسية.xlsx");
    };
    useEffect(() => { getBaseGiftsData(); }, []);
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
                        type="default"
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
            title="إضافة مجموعة جديدة"
            open={open}
            onOk={() => handleAdd()}
            okButtonProps={{ variant: "outlined", color: "purple" }}
            onCancel={() => emptyFields()}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-2">
                <div className="grid grid-cols-12 sm:col-span-12  col-span-12 gap-2">
                    <div className="md:col-span-6 col-span-12">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="اسم الهدية"
                        />
                    </div>

                </div>
            </div>

            <TextArea
                value={description}
                style={{ maxWidth: '100%' }}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="الوصف"
            />
        </Modal>
        <Modal
            title="تعديل مجموعة"
            open={open1}
            okButtonProps={{ variant: "outlined", color: "blue" }}
            onOk={() => handleEdit()}
            onCancel={() => { setOpenEditModal(false); emptyFields() }}
            confirmLoading={loading}   // ✅ spinner on OK button
            mask={false}
        >
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسم الهدية"
            />
            <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="الوصف"
            />

        </Modal>

        {/* Show Modal */}
        <Modal
            title="تفاصيل مجموعة"
            open={open3}
            onOk={() => emptyFields()}
            okButtonProps={{ variant: "outlined", color: "cyan" }}

            onCancel={() => { setOpen3(false); emptyFields() }}
            confirmLoading={loading}   // ✅ spinner on OK button
            mask={false}
        >
            <Input
                disabled
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسم الهدية"
            />
            <TextArea
                disabled
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="الوصف"
            />

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
            <Button className="col-span-5" variant="solid" color="green" onClick={() => downloadExcel()}>
                تنزيل
            </Button>
        </div>

        <Table
            style={{ maxWidth: 1100 }}
            scroll={{ x: "max-content" }}
            pagination={{
                position: ["topRight"],
            }}
            columns={columns} dataSource={dataBaseGifts} />
    </div>
}
