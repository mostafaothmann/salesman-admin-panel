"use client";


import { Button, Dropdown, Input, Modal, notification, Skeleton, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useTypeStore } from "../../../../stores/typesStore/data.store";
import { Type } from "../../../../stores/types-store-interfaces";
import { ColumnsType } from "antd/es/table";


export default function GroupTypesPage() {
    //store data
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
        if (name && /^[A-Za-z\u0600-\u06FF\s]+$/.test(name)) {
            try {
                const res = await editGroupType(editedId, { name: name, description: description });;
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
        getGroupTypesData();
    }

    //addType function
    async function handleAdd() {
        if (name && /^[A-Za-z\u0600-\u06FF\s]+$/.test(name)) {
            try {
                const res = await addGroupType({ name, description });
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
        try {
            const res = await deleteGroupType(id);
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
        getGroupTypesData();
        setLoading2(false);
        setOpenDeleteModal(false);
    }

    //downloadExcele
    const downloadExcel = () => {

        const formattedData = (dataGroupTypes ?? []).map(item => ({
            "تاريخ الإضافة": item.created_at.slice(0, 10),
            "الأصناف": item.types?.map(e => e.name).join(", "),
            "الوصف": item.description,
            "اسم المجموعة": item.name,
            "معرف المجموعة": item.id,
        }));
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        worksheet["!cols"] = [
            { wch: 20 },
            { wch: 50 },
            { wch: 40 },
            { wch: 25 },
            { wch: 25 },
        ];
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "مجموعات الأصناف");
        XLSX.writeFile(workbook, "مجموعات الأصناف.xlsx");
    };

    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        setPageLoading(true)
        getGroupTypesData().finally(() => setPageLoading(false));
    }, []);
    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            fixed: "left",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "المجموعة",
            dataIndex: "name",
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },
        /*      {
                 title: "الوصف",
                 dataIndex: "description",
             }, */
        {
            title: "الأصناف",
            dataIndex: "types",
            sorter: (a: any, b: any) => Number(a.types.length) - Number(a.types.length),
            render: (value: Type[]) => { return value?.map(e => <div>{e.name}</div>) }
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
                        حذف
                    </Button>
                    <Button
                        type="default"
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
                    <span> إضافة مجموعة</span>
                </div>
            }
            open={open}
            onOk={() => { handleAdd() }}
            okButtonProps={{ variant: "outlined", color: "purple" }}
            onCancel={() => emptyFields()}
            keyboard
            mask={false}
        >

            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12 xl:col-span-12">
                    <h3>
                        اسم المجموعة :
                    </h3>
                    <div className="md:col-span-6 col-span-12">
                        <Input
                            required
                            minLength={3}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="اسم المجموعة"
                        />
                    </div>

                </div>

                <div className="col-span-12 xl:col-span-12">
                    <h3>
                        وصف المجموعة :
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
                    <span> تعديل مجموعة</span>
                </div>
            }
            open={open1}
            okButtonProps={{ variant: "outlined", color: "blue" }}
            onOk={() => handleEdit()}
            onCancel={() => { setOpenEditModal(false); emptyFields() }}
            confirmLoading={loading}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12 xl:col-span-12">
                    <h3>
                        اسم المجموعة :
                    </h3>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="اسم المجموعة"
                    />
                </div>
                <div className="col-span-12 xl:col-span-12">
                    <h3>
                        وصف المجموعة :
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
                    <span>  مجموعة تفاصيل</span>
                </div>
            }
            open={open3}
            onOk={() => { setOpen3(false); emptyFields(); }}
            okButtonProps={{ variant: "outlined", color: "cyan" }}
            onCancel={() => { setOpen3(false); emptyFields() }}
            confirmLoading={loading}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12 xl:col-span-12">
                    <h3>
                        اسم المجموعة :
                    </h3>
                    <Input
                        disabled
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="اسم المجموعة"
                    />
                </div>
                <div className="col-span-12 xl:col-span-12">
                    <h3>
                        وصف المجموعة :
                    </h3>
                    <TextArea
                        disabled
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder="الوصف"
                    />
                </div>
                <div className="col-span-12 xl:col-span-12">
                    <h3>
                        أصناف المجموعة :
                    </h3>
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
            <Button className="col-span-5" variant="solid" color="green" onClick={() => downloadExcel()}>
                تنزيل
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
                    columns={columns} dataSource={dataGroupTypes} />
        }

    </div >
}
