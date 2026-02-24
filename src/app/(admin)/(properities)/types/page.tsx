"use client";


import { Button, Input, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useTypeStore } from "../../../../stores/typesStore/data.store";
import { useRouter } from "next/navigation";


export default function TypesPage() {
    const { dataTypes, dataGroupTypes, deleteType, getTypesData, editType, addType } = useTypeStore();
    const router = useRouter();
    //showModal
    const openShowModal = (id: number) => {
        router.push(`/types/${id}`);
    }


    //Add Modal
    const { TextArea } = Input;
    const [name, setName] = useState("");
    const [id, setId] = useState(0);
    const [description, setDescription] = useState("");
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


    //handleEdit
    async function handleEdit() {
        setLoading(true);
        await editType(editedId, { name: name, description: description });
        setLoading(false);
        setOpenEditModal(false);
        getTypesData();
    }

    //addType function
    async function handleAdd() {
        await addType({ name, description })
        getTypesData();
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
        const type = dataTypes?.find(
            item => item.id === id
        );
        setName(type?.name || "");
        setDescription(type?.description || "");
        setOpenEditModal(true);
    }
    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }

    //delete 
    async function handleDelete(id: number) {
        setLoading2(true);
        await deleteType(id);
        getTypesData();
        setLoading2(false);
        setOpenDeleteModal(false);
    }

    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataTypes ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "الأصناف");
        XLSX.writeFile(workbook, "الأصناف.xlsx");
    };
    useEffect(() => { getTypesData() }, []);
    const columns = [
        {
            title: "الرقم",
            dataIndex: "id",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "الصنف",
            dataIndex: "name",
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },
        {
            title: "مجموعة الصنف",
            dataIndex: "grouptype_id",
            sorter: (a: any, b: any) => Number(a.grouptype_id) - Number(b.grouptype_id),
            render: (value: number) => {
                return dataGroupTypes?.find(e => e.id == Number(value))?.name;
            }
        },
        {
            title: "السعر",
            dataIndex: "price_for_piece",
            sorter: (a: any, b: any) => Number(a.price_for_piece) - Number(b.price_for_piece),

        }
        ,
        {
            title: "الكمية",
            dataIndex: "quantity",
            sorter: (a: any, b: any) => Number(a.quantity) - Number(b.quantity),
        },
        {
            title: "ربح المندوب الميداني",
            dataIndex: "percentage",
            sorter: (a: any, b: any) => Number(a.percentage) - Number(a.percentage),
        },
        {
            title: "ربح المندوب الأونلاين",
            dataIndex: "online_percentage",
            sorter: (a: any, b: any) => a.online_percentage.localeCompare(b.online_percentage),
        },
        {
            title: "تاريخ الإضافة",
            dataIndex: "created_at",
            sorter: (a: any, b: any) => a.created_at.localeCompare(b.created_at),
            render: (value: string) => { return value.slice(0, 10) }
        },
        /*         {
                    title: "تاريخ بداية التصنيع",
                    dataIndex: "manufacturing_date",
                    sorter: (a: any, b: any) => a.manufacturing_date.localeCompare(b.manufacturing_date),
                    render: (value1: string) => { return value1.slice(0, 10) }
                }, */
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
                    <Button
                        variant="solid"
                        color="cyan"
                        onClick={() => {
                            console.log(record.id)
                            openShowModal(record.id)
                        }}
                    >
                        Show
                    </Button>
                </Space>
            ),
        }
    ];

    return <div>
        <Button variant="solid" color="purple" onClick={() => downloadExcel()}>
            تنزيل
        </Button>

        {/*Adding Modal*/}
        <Modal
            title="إضافة صنف جديد"
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
                            placeholder="اسم الصنف"
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
            title="تعديل الصنف"
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
                placeholder="اسم الصنف"
            />
            <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="الصنف"
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
            okButtonProps={{ type: "primary" }} // 🔥 bold & strong
        >
        </Modal>

        <Button variant="solid" color="purple" onClick={() => setOpen(true)}>
            إضافة
        </Button>

        <Table
            scroll={{ x: "max-content" }}
            columns={columns} dataSource={dataTypes} />
    </div>
}
