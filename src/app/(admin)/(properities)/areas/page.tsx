"use client";


import { AutoComplete, Button, Dropdown, Input, Menu, Modal, Space, Table, Tag, Upload } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { usePlacesStore } from "../../../../stores/placesStore/data.store";
import { ColumnsType } from "antd/es/table";


export default function AreasPage() {
    const { dataAreas, getAreasData, addArea, dataCities, editArea, deleteArea } = usePlacesStore();


    //Add Modal
    const { TextArea } = Input;
    const [name, setName] = useState("");
    const [id, setId] = useState(0);
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [city_id, setCityId] = useState(1);
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
    //options for Cities auto complete
    const options = dataCities?.map(e => { return { value: e.id, label: e.name } })

    //handleEdit
    async function handleEdit() {
        setLoading(true);
        await editArea(editedId, { name: name, description: description, city_id: city_id });
        setLoading(false);
        setOpenEditModal(false);
        getAreasData();
    }

    //addType function
    async function handleAdd() {
        setCityId(city_id + 1);
        console.log({ name, description, city_id })
        await addArea({ name, description, city_id })
        getAreasData();
        setName("");
        setSearchText("");
        setDescription("")
        setOpen(false)
    }
    //emptyFields function
    const emptyFields = () => {
        setName("");
        setSearchText("");
        setCityId(-1);
        setDescription("")
        setOpen(false)
    }
    //editModal
    const OpenEditModal = (id: number) => {
        setEditedId(id);
        const area = dataAreas?.find(
            item => item.id === id
        );
        setName(area?.name || "");
        setDescription(area?.description || "");
        console.log(area?.id)
        dataAreas?.find(e => e.id == Number(area?.id))?.city_id
        setSearchText(dataCities?.find(e => e.id == dataAreas?.find(e => e.id == Number(area?.id))?.city_id).name)
        setOpenEditModal(true);
    }
    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }
    //showModal
    const openShowModal = (id: number) => {
        const area = dataAreas?.find(
            item => item.id === id
        );
        setName(area?.name || "");
        setDescription(area?.description || "");
        console.log(area)
        setItems(area?.streets?.map(e => { return { key: e.id, label: e.name } }) || [])
        setOpen3(true);
    }

    //delete 
    async function handleDelete(id: number) {
        setLoading2(true);
        await deleteArea(id);
        getAreasData();
        setLoading2(false);
        setOpenDeleteModal(false);
    }

    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataAreas ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Cities");
        XLSX.writeFile(workbook, "Cities.xlsx");
    };
    useEffect(() => { getAreasData(); }, []);
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
        <Button variant="solid" color="purple"
            onClick={() => downloadExcel()}>
            تنزيل
        </Button>

        {/*Adding Modal*/}
        <Modal
            title="إضافة مدينة جديدة"
            open={open}
            onOk={() => handleAdd()}
            onCancel={() => emptyFields()}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-2">
                <div className="grid grid-cols-12 sm:col-span-12  col-span-12 gap-2">
                    <div className="md:col-span-6 col-span-12">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="اسم المدينة"
                        />
                    </div>
                    <div className="md:col-span-6 col-span-12">
                        <AutoComplete
                            style={{ width: 200 }}
                            options={options}
                            placeholder="City"
                            // what user sees & types
                            value={searchText}
                            // typing updates text
                            onChange={(text) => {
                                setSearchText(text);
                                setCityId(undefined); // clear ID while typing
                            }}

                            // when user selects from dropdown
                            onSelect={(value, option) => {
                                setCityId(option.value);                 // ID
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
            title="تعديل مدينة"
            open={open1}
            onOk={() => handleEdit()}
            onCancel={() => { setOpenEditModal(false); emptyFields() }}
            confirmLoading={loading}   // ✅ spinner on OK button
            mask={false}
        >
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسم المدينة"
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
                    setCityId(undefined); // clear ID while typing
                }}

                // when user selects from dropdown
                onSelect={(value, option) => {
                    setCityId(option.value);                 // ID
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
            title="تفاصيل مدينة"
            open={open3}
            onOk={() => emptyFields()}
            onCancel={() => { setOpen3(false); emptyFields() }}
            confirmLoading={loading}   // ✅ spinner on OK button
            mask={false}
        >
            <Input
                disabled
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسم المدينة"
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
                <Button className="px-4 py-2 border rounded">
                    الشوراع
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

        <Button
            variant="solid" color="purple"
            onClick={() => setOpen(true)}>
            إضافة
        </Button>

        <Table
            style={{ maxWidth: 1100 }}
            pagination={{
                position: ["topRight"],
            }}
            scroll={{ x: "max-content" }}
            columns={columns} dataSource={dataAreas} />
    </div>
}
