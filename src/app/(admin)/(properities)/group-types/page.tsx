"use client";


import { AutoComplete, Button, Dropdown, Input, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useTypeStore } from "../../../../stores/typesStore/data.store";
import { Type } from "../../../../stores/types-store-interfaces";


export default function GroupTypesPage() {
    const { dataGroupTypes, addGroupType, editGroupType, getGroupTypesData, deleteGroupType } = useTypeStore();


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

    //Show Modal 
    const [shownId, setShownId] = useState(0);
    const [open3, setOpen3] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [items, setItems] = useState([])


    //handleEdit
    async function handleEdit() {
        setLoading(true);
        await editGroupType(editedId, { name: name, description: description });
        setLoading(false);
        setOpenEditModal(false);
        getGroupTypesData();
    }

    //addType function
    async function handleAdd() {
        await addGroupType({ name, description })
        getGroupTypesData();
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
        const city = dataGroupTypes?.find(
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
        const groupType = dataGroupTypes?.find(
            item => item.id === id
        );
        console.log()
        setName(groupType?.name || "");
        setDescription(groupType?.description || "");
        setItems(groupType?.types?.map(e => { return { key: e.id, label: e.name } }) || [])
        setOpen3(true);
    }

    //delete 
    async function handleDelete(id: number) {
        setLoading2(true);
        await deleteGroupType(id);
        getGroupTypesData();
        setLoading2(false);
        setOpenDeleteModal(false);
    }

    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataGroupTypes ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Cities");
        XLSX.writeFile(workbook, "Cities.xlsx");
    };
    useEffect(() => { getGroupTypesData(); }, []);
    const columns = [
        {
            title: "الرقم",
            dataIndex: "id",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "المجموعة",
            dataIndex: "name",
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },
        ,
        {
            title: "الوصف",
            dataIndex: "description",
        },
        {
            title: "عدد الأصناف",
            dataIndex: "types",
            sorter: (a: any, b: any) => Number(a.types.length) - Number(a.types.length),
            render: (value: Type[]) => { return value.map(e=><div>{e.name}</div> ) }
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
        <Button variant="solid" color="purple" onClick={() => downloadExcel()}>
            تنزيل
        </Button>

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
                            placeholder="اسم المجموعة"
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
                placeholder="اسم المجموعة"
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
                placeholder="اسم المجموعة"
            />
            <TextArea
                disabled
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="الوصف"
            />

            <Dropdown
                menu={{ items: items }}
                trigger={['click']}
            >
                <Button
                    variant="outlined"
                    color="cyan"
                    className="px-4 py-2 border rounded w-full">
                    الأصناف
                </Button>
            </Dropdown>
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
            columns={columns} dataSource={dataGroupTypes} />
    </div>
}
