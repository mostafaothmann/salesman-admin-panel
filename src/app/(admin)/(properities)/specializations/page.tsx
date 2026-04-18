"use client";


import { Button, Dropdown, Input, Modal, notification, Skeleton, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useMedicalStore } from "../../../../stores/medicalStore/data.store";
import { Doctor } from "../../../../stores/medical-store-interfaces";
import { ColumnsType } from "antd/es/table";


export default function SpecializationsPage() {
    const { getSpecializationsData, dataSpecializations, dataTypesForSpecialization,
        getTypesForSpecializationData, deleteSpecialization, editSpecialization, addSpecialization } = useMedicalStore();

    //Add Modal
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
    const [openShowModal, setOpenShowModal] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [items, setItems] = useState([])
    const [typesItems, setTypesItems] = useState([])


    //handleEdit
    async function handleEdit() {
        setLoading(true);
        if (name && /^[A-Za-z\u0600-\u06FF\s]+$/.test(name)) {
            try {
                const res = await editSpecialization(editedId, { name: name });
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
        getSpecializationsData();
    }

    //addType function
    async function handleAdd() {
        setGovernorateId(governorate_id + 1);
        if (name && /^[A-Za-z\u0600-\u06FF\s]+$/.test(name)) {
            try {
                const res = await await addSpecialization({ name });
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

        getSpecializationsData();
        emptyFields();
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
        const specialization = dataSpecializations?.find(
            item => item.id === id
        );
        setName(specialization?.name || "");
        setOpenEditModal(true);
    }
    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }
    //showModal
    const OpenShowModal = (id: number) => {
        const specialization = dataSpecializations?.find(
            item => item.id === id
        );
        console.log()
        setName(specialization?.name || "");
        setItems(specialization?.doctors?.map(e => { return { key: e.id, label: e.first_name } }) || [])
        getTypesForSpecializationData(specialization.id);
        setTypesItems(dataTypesForSpecialization?.map(e => { return { key: e.id, label: e.name } }) || [])
        setOpenShowModal(true);
    }

    //delete 
    async function handleDelete(id: number) {
        setLoading2(true);
        try {
            const res = await deleteSpecialization(id);
            if (res?.status == 200) {
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

        getSpecializationsData();
        setLoading2(false);
        setOpenDeleteModal(false);
    }

    //downloadExcele
    const downloadExcel = () => {

        const formattedData = (dataSpecializations ?? []).map(item => ({
            "تاريخ الإضافة": item.created_at.slice(0, 10), // modified
            "عدد الأطباء": item.doctors.length,
            "اسم الإختصاص": item.name,
            "معرف الإختصاص": item.id,
        }));
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        worksheet["!cols"] = [
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
        ];
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "الإختصاصات");
        XLSX.writeFile(workbook, "الإختصاصات.xlsx");
    };

    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        setPageLoading(true);
        getSpecializationsData().finally(() => setPageLoading(false));
    }, []);
    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            fixed: "left",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "الاختصاص",
            dataIndex: "name",
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },
        {
            title: "عدد الأطباء",
            dataIndex: "doctors",
            sorter: (a: any, b: any) => Number(a.doctors.length) - Number(a.doctors.length),
            render: (value: Doctor[]) => { return value.length }
        },
        {
            title: "تاريخ الإضافة",
            dataIndex: "created_at",
            sorter: (a: any, b: any) => a.created_at.localeCompare(b.created_at),
            render: (value: string) => { return value?.slice(0, 10) }
        }
        ,
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
            fixed: 'right',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button
                        variant="solid"
                        color="cyan"
                        onClick={() => OpenShowModal(record.id)}
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
                    <span> إضافة اختصاص</span>
                </div>
            }
            open={open}
            onOk={() => handleAdd()}
            okButtonProps={{ variant: "outlined", color: "purple" }}
            onCancel={() => emptyFields()}
            mask={false}
        >
            <div >
                <h3>
                    اسم الاختصاص
                </h3>
            </div>
            <Input
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسم الاختصاص"
            />
            <div>
                <h3>
                    الوصف
                </h3>
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
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span> تعديل اختصاص</span>
                </div>
            }
            open={open1}
            okButtonProps={{ variant: "outlined", color: "blue" }}
            onOk={() => handleEdit()}
            onCancel={() => { setOpenEditModal(false); emptyFields() }}
            confirmLoading={loading}   // spinner on OK button
            mask={false}
        >
            <div>
                <h3>
                    اسم الاختصاص
                </h3>
            </div>
            <Input
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسم الاختصاص"
            />
        </Modal>

        {/* Show Modal */}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span>تفاصيل الاختصاص</span>
                </div>
            }
            open={openShowModal}
            onOk={() => emptyFields()}
            okButtonProps={{ variant: "outlined", color: "cyan" }}

            onCancel={() => { setOpenShowModal(false); emptyFields() }}
            confirmLoading={loading}   //  spinner on OK button
            mask={false}
        >
            <div>
                <h3>
                    اسم الاختصاص
                </h3>
            </div>
            <Input
                disabled
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسم الاختصاص"
            />
            <div>
                <h3>
                    الأطباء
                </h3>
            </div>
            <Dropdown
                menu={{ items: items }}
                trigger={['click']}
            >
                <Button className="px-4 py-2 border rounded w-full" color="cyan" variant="outlined">
                    الأطباء
                </Button>
            </Dropdown>
            <div>
                <h3>
                    الأصناف المناسبة
                </h3>
            </div>
            <Dropdown
                menu={{ items: typesItems }}
                trigger={['click']}
            >
                <Button className="px-4 py-2 border rounded w-full" color="cyan" variant="outlined">
                    الأصناف المناسبة
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
            <Button className="col-span-5" variant="solid" color="green" onClick={() => downloadExcel()}>
                تنزيل
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
                    columns={columns} dataSource={dataSpecializations} />
        }
    </div>
}
