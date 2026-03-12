"use client";


import { AutoComplete, Button, Modal, Table, Space, Input } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { usePlacesStore } from "../../../../stores/placesStore/data.store";
import { ColumnsType } from "antd/es/table";


export default function StreetsPage() {
    const { dataStreets, getStreetsData, addStreet, dataAreas, editStreet, deleteStreet } = usePlacesStore();


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
        await editStreet(editedId, { name: name, description: description, area_id: area_id });
        setLoading(false);
        setOpenEditModal(false);
        getStreetsData();
    }

    //addType function
    async function handleAdd() {
        setAreaId(area_id + 1);
        await addStreet({ name, description, area_id })
        getStreetsData();
        setName("");
        setSearchText("");
        setDescription("")
        setOpen(false)
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
    //editModal
    const OpenEditModal = (id: number) => {
        setEditedId(id);
        const street = dataStreets?.find(
            item => item.id === id
        );
        setName(street?.name || "");
        setDescription(street?.description || "");
        dataStreets?.find(e => e.id == Number(street?.id))?.area_id
        setSearchText(dataAreas?.find(e => e.id == dataStreets?.find(e => e.id == Number(street?.id))?.area_id).name)
        setOpenEditModal(true);
    }
    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }
    //showModal
    const OpenShowModal = (id: number) => {
        const street = dataStreets?.find(
            item => item.id === id
        );
        console.log()
        setName(street?.name || "");
        setDescription(street?.description || "");
        console.log(street)
        setOpenShowModal(true);
    }

    //delete 
    async function handleDelete(id: number) {
        setLoading2(true);
        await deleteStreet(id);
        getStreetsData();
        setLoading2(false);
        setOpenDeleteModal(false);
    }

    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataStreets ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Cities");
        XLSX.writeFile(workbook, "Cities.xlsx");
    };
    useEffect(() => { getStreetsData(); }, []);
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
            title="إضافة شارع جديدة"
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
                            placeholder="اسم الشارع"
                        />
                    </div>
                    <div className="md:col-span-6 col-span-12">
                        <AutoComplete
                            style={{ width: 200 }}
                            options={options}
                            placeholder="المنطقة"

                            // what user sees & types
                            value={searchText}

                            // typing updates text
                            onChange={(text) => {
                                setSearchText(text);
                                setAreaId(undefined); // clear ID while typing
                            }}

                            // when user selects from dropdown
                            onSelect={(value, option) => {
                                setAreaId(option.value);                 // ID
                                setSearchText(option?.label as string);  // show name
                            }}

                            filterOption={(inputValue, option) =>
                                (option?.label as string)
                                    ?.toLowerCase()
                                    .includes(inputValue.toLowerCase())
                            }
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
            title="تعديل شارع"
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
                placeholder="اسم الشارع"
            />
            <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="الوصف"
            />
            <AutoComplete
                style={{ width: 200 }}
                options={options}
                placeholder="المحافظة"

                // what user sees & types
                value={searchText}

                // typing updates text
                onChange={(text) => {
                    setSearchText(text);
                    setAreaId(undefined); // clear ID while typing
                }}

                // when user selects from dropdown
                onSelect={(value, option) => {
                    setAreaId(option.value);                 // ID
                    setSearchText(option?.label as string);  // show name
                }}

                filterOption={(inputValue, option) =>
                    (option?.label as string)
                        ?.toLowerCase()
                        .includes(inputValue.toLowerCase())
                }
            />

        </Modal>

        {/* Show Modal */}
        <Modal
            title="تفاصيل شارع"
            open={openShowModal}
            onOk={() => emptyFields()}
            okButtonProps={{ variant: "outlined", color: "cyan" }}

            onCancel={() => { setOpenShowModal(false); emptyFields() }}
            confirmLoading={loading}   // ✅ spinner on OK button
            mask={false}
        >
            <Input
                disabled
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسم الشارع"
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
            okButtonProps={{ type: "primary" }} // 🔥 bold & strong
        >
        </Modal>

        <Button variant="solid" color="purple" onClick={() => setOpen(true)}>
            إضافة
        </Button>

        <Table
            style={{ maxWidth: 1100 }}
            pagination={{
                position: ["topRight"],
            }}
            scroll={{ x: "max-content" }}
            columns={columns} dataSource={dataStreets} />
    </div>
}
