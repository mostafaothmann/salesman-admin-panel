"use client";


import { Button, Dropdown, Input, InputNumber, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useTypeStore } from "../../../../stores/typesStore/data.store";
import { useRouter } from "next/navigation";


export default function TypesPage() {
    const { dataIngredients, getIngredientsData, dataTypesForIngredient, getTypesForIngredient, deleteIngredient, addIngredient, editIngredient } = useTypeStore();
    const router = useRouter();
    //showModal
    const OpenShowModal = (id: number) => {
        const ingredient = dataIngredients?.find(
            item => item.id === id
        );
        getTypesForIngredient(ingredient.id)
        console.log(
            dataTypesForIngredient
        )
        setName(ingredient.name)
        setAdminDescription(ingredient.admin_description);
        setSalesmanDescription(ingredient.admin_description);
        setQuantity(ingredient.quantity);
        setItems(
            dataTypesForIngredient
                ?.map(e => {
                    return {
                        key: e.id,
                        label: (
                            <div className="flex flex-col">
                                <span className="font-bold text-[#01B9B0]">{e.name}</span>
                                <span className="text-sm text-gray-500">
                                    الصنف: {e.name}
                                </span>
                                <span className="text-sm">
                                    نسبة المكون: {e.quantity_percentage}%
                                </span>
                            </div>
                        ),
                    }
                }) || [])
        setOpenShowModal(true);
    }

    //Add Modal
    const { TextArea } = Input;
    const [name, setName] = useState("");
    const [admin_description, setAdminDescription] = useState("");
    const [salesman_description, setSalesmanDescription] = useState("");
    const [open, setOpen] = useState(false);


    const [quantity, setQuantity] = useState(0);


    async function changeOpenModalAdd() {
        setOpen(true);
    }

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


    //handleEdit
    async function handleEdit() {
        setLoading(true);
        await editIngredient(editedId, { name, admin_description, salesman_description, quantity });
        setLoading(false);
        setOpenEditModal(false);
        getIngredientsData();
    }

    //addType function
    async function handleAdd() {
        await addIngredient({
            name, admin_description, salesman_description, quantity,
        })
        getIngredientsData();
        emptyFields();
        setOpen(false)
    }
    //emptyFields function
    const emptyFields = () => {
        setName("");
        setQuantity(0)
        setAdminDescription("");
        setSalesmanDescription("");
        setOpen(false);
    }
    //editModal
    const OpenEditModal = (id: number) => {
        setEditedId(id);
        const ingredient = dataIngredients?.find(
            ingredient => ingredient.id === id
        );
        setName(ingredient?.name || "");
        setAdminDescription(ingredient?.admin_description || "");
        setSalesmanDescription(ingredient?.admin_description || "");
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
        await deleteIngredient(id);
        getIngredientsData();
        setLoading2(false);
        setOpenDeleteModal(false);
    }



    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataIngredients ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "المكونات");
        XLSX.writeFile(workbook, "المكونات.xlsx");
    };
    useEffect(() => { getIngredientsData() }, []);
    const columns = [
        {
            title: "الرقم",
            dataIndex: "id",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "المكون",
            dataIndex: "name",
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },

        {
            title: "الكمية",
            dataIndex: "quantity",
            sorter: (a: any, b: any) => Number(a.quantity) - Number(b.quantity),
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
                        onClick={() => {
                            console.log(record.id)
                            OpenShowModal(record.id)
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
                <div className="col-span-12 sm:col-span-6">
                    <h3>
                        اسم المكون :
                    </h3>
                    <Input
                        className="w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="اسم الصنف"
                    />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <h3>
                        الكمية  :
                    </h3>
                    <InputNumber
                        value={quantity}
                        type={"number"}
                        style={{ width: '100%' }}
                        min={0}
                        onChange={(e) => setQuantity(e)}
                        placeholder="الكمية"
                    />
                </div>

                <div className="col-span-12">
                    <h3>
                        وصف المندوبين :
                    </h3>
                    <TextArea
                        value={salesman_description}
                        style={{ maxWidth: '100%' }}
                        onChange={(e) => setSalesmanDescription(e.target.value)}
                        rows={4}
                        placeholder="وصف المندوبين"
                    />
                </div>

                <div className="col-span-12 ">
                    <h3>
                        وصف الإدارة :
                    </h3>
                    <TextArea
                        value={admin_description}
                        style={{ maxWidth: '100%' }}
                        onChange={(e) => setAdminDescription(e.target.value)}
                        rows={4}
                        placeholder="وصف الإدارة"
                    />
                </div>
            </div>
        </Modal>

        {/*  Editing Modal */}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#592C46]">
                    <span>تعديل المكون</span>
                </div>
            }
            open={open1}
            okButtonProps={{ variant: "outlined", color: "blue" }}
            onOk={() => handleEdit()}
            onCancel={() => { setOpenEditModal(false); emptyFields() }}
            confirmLoading={loading}   // ✅ spinner on OK button
            mask={false}
        >
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12 sm:col-span-6">
                    <h3>
                        اسم المكون :
                    </h3>
                    <Input
                        className="w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="اسم الصنف"
                    />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <h3>
                        الكمية  :
                    </h3>
                    <InputNumber
                        value={quantity}
                        type={"number"}
                        style={{ width: '100%' }}
                        min={0}
                        onChange={(e) => setQuantity(e)}
                        placeholder="الكمية"
                    />
                </div>

                <div className="col-span-12">
                    <h3>
                        وصف المندوبين :
                    </h3>
                    <TextArea
                        value={salesman_description}
                        style={{ maxWidth: '100%' }}
                        onChange={(e) => setSalesmanDescription(e.target.value)}
                        rows={4}
                        placeholder="وصف المندوبين"
                    />
                </div>

                <div className="col-span-12 ">
                    <h3>
                        وصف الإدارة :
                    </h3>
                    <TextArea
                        value={admin_description}
                        style={{ maxWidth: '100%' }}
                        onChange={(e) => setAdminDescription(e.target.value)}
                        rows={4}
                        placeholder="وصف الإدارة"
                    />
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
            okButtonProps={{ type: "primary" }} // 🔥 bold & strong
        >
        </Modal>


        {/* Show Modal */}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span>تفاصيل المكون</span>
                </div>
            }
            open={openShowModal}
            onOk={() => { setOpenShowModal(false); emptyFields(); }}
            okButtonProps={{ variant: "outlined", color: "cyan" }}
            onCancel={() => { setOpenShowModal(false); emptyFields() }}
            confirmLoading={loading}   // ✅ spinner on OK button
            mask={false}
        >
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12 xl:col-span-6">
                    <h3>
                        اسم المكون
                    </h3>
                    <Input
                        disabled
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="اسم المكون"
                    />
                </div>

                <div className="col-span-12 xl:col-span-6">
                    <h3>
                        الكمية  :
                    </h3>
                    <InputNumber
                        disabled
                        value={quantity}
                        type={"number"}
                        style={{ width: '100%' }}
                        min={0}
                        onChange={(e) => setQuantity(e)}
                        placeholder="الكمية"
                    />
                </div>

                <div className="col-span-12">
                    <h3>
                        وصف المندوبين :
                    </h3>
                    <TextArea
                        disabled
                        value={salesman_description}
                        style={{ maxWidth: '100%' }}
                        onChange={(e) => setSalesmanDescription(e.target.value)}
                        rows={4}
                        placeholder="وصف المندوبين"
                    />
                </div>

                <div className="col-span-12 ">
                    <h3>
                        وصف الإدارة :
                    </h3>
                    <TextArea
                        disabled
                        value={admin_description}
                        style={{ maxWidth: '100%' }}
                        onChange={(e) => setAdminDescription(e.target.value)}
                        rows={4}
                        placeholder="وصف الإدارة"
                    />
                </div>


                <div className="col-span-12 ">
                    <h3>
                        الأصناف الحاوية على المكون

                    </h3>
                    <Dropdown
                        menu={{ items: items }}
                        trigger={['click']}
                    >
                        <Button className="px-4 py-2 border rounded w-full" color="cyan" variant="outlined">
                            الأصناف الحاوية على المكون
                        </Button>
                    </Dropdown>
                </div>
            </div>
        </Modal>

        <Button variant="solid" color="purple" onClick={() => changeOpenModalAdd()}>
            إضافة
        </Button>

        <Table
            scroll={{ x: "max-content" }}
            columns={columns} dataSource={dataIngredients} />
    </div>
}
