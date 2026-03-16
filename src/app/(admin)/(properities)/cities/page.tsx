"use client";


import { AutoComplete, Button, Dropdown, Input, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { usePlacesStore } from "../../../../stores/placesStore/data.store";
import { ColumnsType } from "antd/es/table";


export default function CititesPage() {
    const { dataCities, getCitiesData, addCity, dataGovernorates, editCity, deleteCity } = usePlacesStore();


    //Add City Modal
    const { TextArea } = Input;
    const [name, setName] = useState("");
    const [id, setId] = useState(0);
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [governorate_id, setGovernorateId] = useState(1);
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

    //options for Governorate auto complete
    const options = dataGovernorates?.map(e => { return { value: e.id, label: e.name } })

    //handleEdit
    async function handleEdit() {
        setLoading(true);
        await editCity(editedId, { name: name, description: description, governorate_id: governorate_id });
        setLoading(false);
        setOpenEditModal(false);
        getCitiesData();
    }

    //addType function
    async function handleAdd() {
        setGovernorateId(governorate_id + 1);
        await addCity({ name, description, governorate_id })
        getCitiesData();
        setName("");
        setSearchText("");
        setDescription("")
        setOpen(false)
    }
    //emptyFields function
    const emptyFields = () => {
        setName("");
        setSearchText("");
        setGovernorateId(-1);
        setDescription("")
        setOpen(false)
    }
    //editModal
    const OpenEditModal = (id: number) => {
        setEditedId(id);
        const city = dataCities?.find(
            item => item.id === id
        );
        setName(city?.name || "");
        setDescription(city?.description || "");
        dataCities?.find(e => e.id == Number(city?.id))?.governorate_id
        setSearchText(dataGovernorates?.find(e => e.id == dataCities?.find(e => e.id == Number(city?.id))?.governorate_id).name)
        setOpenEditModal(true);
    }
    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }
    //showModal
    const openShowModal = (id: number) => {
        const city = dataCities?.find(
            item => item.id === id
        );
        setName(city?.name || "");
        setDescription(city?.description || "");
        setItems(city?.areas?.map(e => { return { key: e.id, label: e.name } }) || [])
        setOpen3(true);
    }

    //delete 
    async function handleDelete(id: number) {
        setLoading2(true);
        await deleteCity(id);
        getCitiesData();
        setLoading2(false);
        setOpenDeleteModal(false);
    }

    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataCities ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Cities");
        XLSX.writeFile(workbook, "Cities.xlsx");
    };
    useEffect(() => { getCitiesData(); }, []);
    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            fixed: "left",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "المدينة",
            dataIndex: "name",
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },
        ,
        {
            title: "المحافظة",
            dataIndex: "governorate_id",
            sorter: (a: any, b: any) => Number(a.governorate_id) - Number(b.governorate_id),
            render: (value: number) => {
                return dataGovernorates?.find(e => e.id == Number(value)).name;
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
            title="إضافة مدينة جديدة"
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
                            placeholder="اسم المدينة"
                        />
                    </div>
                    <div className="md:col-span-6 col-span-12">
                        <AutoComplete
                            style={{ width: 200 }}
                            options={options}
                            placeholder="Governorate"

                            value={searchText}


                            onChange={(text) => {
                                setSearchText(text);
                                setGovernorateId(undefined); // clear ID while typing
                            }}

                            onSelect={(value, option) => {
                                setGovernorateId(option.value);
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
            okButtonProps={{ variant: "outlined", color: "blue" }}
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


                onChange={(text) => {
                    setSearchText(text);
                    setGovernorateId(undefined); // clear ID while typing
                }}

                // when user selects from dropdown
                onSelect={(value, option) => {
                    setGovernorateId(option.value);
                    setSearchText(option?.label as string);
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
            okButtonProps={{ variant: "outlined", color: "cyan" }}

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
                    المناطق
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
            okButtonProps={{ type: "primary" }}
        >
        </Modal>
        <div className="grid grid-cols-12 gap-4 md:gap-6 w-full">
            <Button className="col-span-5" variant="solid" color="cyan" onClick={() => setOpen(true)}>
                إضافة
            </Button>
            <Button variant="solid" color="green" onClick={() => downloadExcel()}>
                تنزيل
            </Button>
        </div>
        <Table
            style={{ maxWidth: 1100 }}
            pagination={{
                placement: ['topEnd'],
            }}
            scroll={{ x: "max-content" }}
            columns={columns} dataSource={dataCities} />
    </div>
}
