"use client";


import { AutoComplete, Button, Dropdown, Input, Modal, notification, Skeleton, Space, Table } from "antd";
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
        if (name && /^[A-Za-z\u0600-\u06FF\s]+$/.test(name)) {
            try {
                const res = await editCity(editedId, { name: name, description: description, governorate_id: governorate_id });
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
        getCitiesData();
    }

    //addType function
    async function handleAdd() {
        setGovernorateId(governorate_id + 1);
        if (name && /^[A-Za-z\u0600-\u06FF\s]+$/.test(name)) {
            try {
                const res = await addCity({ name, description, governorate_id })
                if (res?.status == 201) {
                    notification.success({
                        message: "نجاح",
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
        try {
            const res = await deleteCity(id);
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
                    title: "فشل",
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
        getCitiesData();
        setLoading2(false);
        setOpenDeleteModal(false);
    }

    const [pageLoading, setPageLoading] = useState(true);
    useEffect(() => {
        setPageLoading(true)
        getCitiesData().finally(() => setPageLoading(false));
    }, []);
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
                        حذف
                    </Button>
                    <Button
                        variant="outlined"
                        color="cyan"
                        onClick={() => { OpenEditModal(record.id); }}
                    >
                        تعديل
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
                    <span> إضافة مدينة</span>
                </div>
            }
            open={open}
            onOk={() => handleAdd()}
            okButtonProps={{ variant: "outlined", color: "purple" }}
            onCancel={() => emptyFields()}
            mask={false}
        >
            <div className="grid grid-cols-12 sm:col-span-12  col-span-12 gap-2">
                <div className="md:col-span-6 col-span-12">
                    <h3>
                        اسم المدينة
                    </h3>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="اسم المدينة"
                    />
                </div>
                <div className="md:col-span-6 col-span-12">
                    <h3>
                        المحافظة
                    </h3>
                    <AutoComplete
                        style={{ width: 200 }}
                        options={options}
                        placeholder="المحافظة"
                        value={searchText}
                        onChange={(text) => {
                            setSearchText(text);
                            setGovernorateId(undefined);
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
                    <span> تعديل مدينة</span>
                </div>
            }
            open={open1}
            okButtonProps={{ variant: "outlined", color: "blue" }}
            onOk={() => handleEdit()}
            onCancel={() => { setOpenEditModal(false); emptyFields() }}
            confirmLoading={loading}
            mask={false}
        >
            <div className="grid grid-cols-12 sm:col-span-12  col-span-12 gap-2">
                <div className="md:col-span-6 col-span-12">
                    <h3>
                        اسم المدينة
                    </h3>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="اسم المدينة"
                    />
                </div>
                <div className="md:col-span-6 col-span-12">
                    <h3>
                        المحافظة
                    </h3>
                    <AutoComplete
                        style={{ width: 200 }}
                        options={options}
                        placeholder="المحافظة"

                        value={searchText}


                        onChange={(text) => {
                            setSearchText(text);
                            setGovernorateId(undefined);
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
                    <span>تفاصيل المدينة</span>
                </div>
            }
            open={open3}
            onOk={() => emptyFields()}
            okButtonProps={{ variant: "outlined", color: "cyan" }}
            onCancel={() => { setOpen3(false); emptyFields() }}
            confirmLoading={loading}
            mask={false}
        >
            <div className="grid grid-cols-12 sm:col-span-12  col-span-12 gap-2">
                <div className="col-span-12">
                    <h3>
                        اسم المدينة
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
                            المناطق
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
                        placement: ['topEnd'],
                    }}
                    scroll={{ x: "max-content" }}
                    columns={columns} dataSource={dataCities} />
        }
    </div>
}
