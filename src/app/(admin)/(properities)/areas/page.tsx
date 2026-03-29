"use client";


import { AutoComplete, Button, Dropdown, Input, Menu, Modal, notification, Skeleton, Space, Table, Tag, Upload } from "antd";
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
        if (name && /^[A-Za-z\u0600-\u06FF\s]+$/.test(name)) {
            try {
                const res = await editArea(editedId, { name: name, description: description, city_id: city_id });
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
        getAreasData();
    }

    //addType function
    async function handleAdd() {
        setCityId(city_id + 1);
        if (name && /^[A-Za-z\u0600-\u06FF\s]+$/.test(name)) {
            try {
                const res = await addArea({ name, description, city_id })
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
        try {
            const res = await deleteArea(id);
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
        getAreasData();
        setLoading2(false);
        setOpenDeleteModal(false);
    }
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        setPageLoading(true);
        getAreasData().finally(() => setPageLoading(false));
    }, []);
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
                        variant="outlined"
                        color="cyan"
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
        >
            <div className="grid grid-cols-12 gap-2">
                <div className="md:col-span-6 col-span-12">
                    <h3>
                        اسم المنطقة
                    </h3>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="اسم المدينة"
                    />
                </div>
                <div className="md:col-span-6 col-span-12">
                    <h3>
                        المدينة
                    </h3>
                    <AutoComplete
                        style={{ width: 200 }}
                        options={options}
                        placeholder="المدينة"
                        value={searchText}
                        onChange={(text) => {
                            setSearchText(text);
                            setCityId(undefined);
                        }}
                        onSelect={(value, option) => {
                            setCityId(option.value);
                            setSearchText(option?.label as string);
                        }}

                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
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
        </Modal>
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#592C46]">
                    <span>تعديل منطقة</span>
                </div>
            }
            open={open1}
            onOk={() => handleEdit()}
            onCancel={() => { setOpenEditModal(false); emptyFields() }}
            confirmLoading={loading}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-2">
                <div className="md:col-span-6 col-span-12">
                    <h3>
                        اسم المنطقة
                    </h3>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="اسم المنطقة"
                    />
                </div>

                <div className="md:col-span-6 col-span-12">
                    <h3>
                        المدينة
                    </h3>
                    <AutoComplete
                        style={{ width: 200 }}
                        options={options}
                        placeholder="المدينة"
                        value={searchText}
                        onChange={(text) => {
                            setSearchText(text);
                            setCityId(undefined);
                        }}
                        onSelect={(value, option) => {
                            setCityId(option.value);
                            setSearchText(option?.label as string);
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
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
                    <span>تفاصيل منطقة</span>
                </div>
            }
            open={open3}
            onOk={() => emptyFields()}
            onCancel={() => { setOpen3(false); emptyFields() }}
            confirmLoading={loading}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12">
                    <h3>
                        اسم المنطقة
                    </h3>
                    <Input
                        disabled
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="اسم المدينة"
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
                <div className="col-span-12">
                    <Dropdown
                        menu={{ items: items }}
                        trigger={['click']}
                    >
                        <Button className="px-4 py-2 border rounded w-full" color="cyan" variant="outlined">
                            الشوراع
                        </Button>
                    </Dropdown>
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
                    pagination={{
                        position: ["topRight"],
                    }}
                    scroll={{ x: "max-content" }}
                    columns={columns} dataSource={dataAreas} />
        }
    </div>
}
