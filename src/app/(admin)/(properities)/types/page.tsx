"use client";


import { AutoComplete, Button, DatePicker, Input, InputNumber, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useTypeStore } from "../../../../stores/typesStore/data.store";
import { useRouter } from "next/navigation";
import { ColumnsType } from "antd/es/table";


export default function TypesPage() {
    const { dataTypes, dataGroupTypes, getGroupTypesData, deleteType, getTypesData, editType, addType } = useTypeStore();
    const router = useRouter();
    //showModal
    const openShowModal = (id: number) => {
        router.push(`/types/${id}`);
    }

    //Add Modal
    const { TextArea } = Input;
    const [name, setName] = useState("");
    const [id, setId] = useState(0);
    const [admin_description, setAdminDescription] = useState("");
    const [salesman_description, setSalesmanDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchTextBrand, setSearchTextBrand] = useState("");
    const [searchTextType, setSearchTextType] = useState("");

    const [brand, setBrand] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [delivery_percentage, setDeliveryPercentage] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [online_percentage, setOnlinePercentage] = useState(0);
    const [price_for_sale, setPriceForSale] = useState(0)
    const [price_for_piece, setPriceForPiece] = useState(0)
    const [manufacturing_date, setManufacturingDate] = useState("");
    const [return_discount, setReturnDiscount] = useState(0);
    const [grouptype_id, setGroupTypeId] = useState(0)
    const [type, setType] = useState(0)

    const [optionsGroupTypes, setOptionsGroupTypes] = useState(dataGroupTypes?.map(e => { return { value: e.id, label: e.name } }));
    const optionsBrand = [
        { value: 'روح الأرض', label: 'روح الأرض' },
        { value: 'كوزيت', label: 'كوزيت' },
        { value: "ماكس بيل", label: "ماكس بيل" },
    ]

    const optionsType = [
        { value: 1, label: 'أونلاين' },
        { value: 2, label: 'ميداني' },
        { value: 3, label: 'ميداني و أونلاين' },
        { value: 4, label: 'غير مصنف حاليا' },
    ]

    async function changeOpenModalAdd() {
        await getGroupTypesData();
        setOptionsGroupTypes(dataGroupTypes?.map(e => { return { value: e.id, label: e.name } }));
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


    //addType function
    async function handleAdd() {
        await addType({
            name, admin_description, salesman_description, grouptype_id,
            brand, type, manufacturing_date, quantity,
            percentage, price_for_piece, price_for_sale,
            online_percentage, delivery_percentage, return_discount
        })
        getTypesData();
        emptyFields();
        setOpen(false)
    }
    //emptyFields function
    const emptyFields = () => {
        setName("");
        setSearchText("");
        setSearchTextBrand("");
        setAdminDescription("");
        setSalesmanDescription("");
        setBrand("");
        setOpen(false);
    }
    //editModal
    const OpenEditModal = (id: number) => {
        setEditedId(id);
        const type = dataTypes?.find(
            item => item.id === id
        );
        setName(type?.name || "");
        setAdminDescription(type?.admin_description || "");
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
    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            fixed: 'left',
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
            title: "عمولة المندوب الميداني",
            dataIndex: "percentage",
            sorter: (a: any, b: any) => Number(a.percentage) - Number(a.percentage),
        },
        {
            title: "عمولة المندوب الأونلاين",
            dataIndex: "online_percentage",
            sorter: (a: any, b: any) => a.online_percentage.localeCompare(b.online_percentage),
        },
        {
            title: "عمولة مندوب التوصيل",
            dataIndex: "delivery_percentage",
            sorter: (a: any, b: any) => a.delivery_percentage.localeCompare(b.delivery_percentage),
        },
        {
            title: "حسم الإرجاع",
            dataIndex: "return_discount",
            sorter: (a: any, b: any) => a.return_discount.localeCompare(b.return_discount),
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
                        variant="solid"
                        danger
                        onClick={() => {
                            OpenDeleteModal(record.id)
                        }}
                    >
                        Delete
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
                        اسم الصنف :
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
                        مجموعة الصنف :
                    </h3>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsGroupTypes}
                        placeholder="مجموعة الصنف"
                        value={searchText}
                        onChange={(text) => {
                            setSearchText(text);
                            setGroupTypeId(undefined);
                        }}
                        onSelect={(value, option) => {
                            setGroupTypeId(option.value);
                            setSearchText(option?.label as string);
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <h3>
                        براند الصنف :
                    </h3>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsBrand}
                        placeholder="براند الصنف"
                        value={searchTextBrand}
                        onChange={(text) => {
                            setSearchTextBrand(text);
                            setBrand(text);
                        }}
                        onSelect={(value, option) => {
                            setBrand(option.value);
                            setSearchTextBrand(option?.label as string);
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
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

                <div className="col-span-12 sm:col-span-6">
                    <h3>
                        السعر للمندوب   :
                    </h3>
                    <InputNumber
                        value={price_for_piece}
                        type={"number"}
                        style={{ width: '100%' }}
                        min={0}
                        onChange={(e) => setPriceForPiece(e)}
                        placeholder="السعر للمندوب"
                    />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <h3>
                        سعر المبيع :
                    </h3>
                    <InputNumber
                        value={price_for_sale}
                        type={"number"}
                        style={{ width: '100%' }}
                        min={0}
                        onChange={(e) => setPriceForSale(e)}
                        placeholder="سعر المبيع"
                    />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <h3>
                        نسبة المندوب  :
                    </h3>
                    <InputNumber
                        value={percentage}
                        type={"number"}
                        style={{ width: '100%' }}
                        min={0}
                        onChange={(e) => setPercentage(e)}
                        placeholder="نسبة المندوب"
                    />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <h3>
                        نسبة المندوب الأونلاين :
                    </h3>
                    <InputNumber
                        value={online_percentage}
                        type={"number"}
                        style={{ width: '100%' }}
                        min={0}
                        onChange={(e) => setOnlinePercentage(e)}
                        placeholder="نسبة المندوب الأونلاين"
                    />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <h3>
                        نسبة مندوب التوصيل  :
                    </h3>
                    <InputNumber
                        value={delivery_percentage}
                        type={"number"}
                        style={{ width: '100%' }}
                        min={0}
                        onChange={(e) => setDeliveryPercentage(e)}
                        placeholder="نسبة مندوب التوصيل"
                    />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <h3>
                        حسم الإرجاع :
                    </h3>
                    <InputNumber
                        value={return_discount}
                        type={"number"}
                        style={{ width: '100%' }}
                        min={0}
                        onChange={(e) => setReturnDiscount(e)}
                        placeholder="حسم الإرجاع"
                    />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <h3>
                        تاريخ بداية الصنع :
                    </h3>
                    <DatePicker className="w-full"
                        style={{ width: '100%' }}
                        value={manufacturing_date}
                        onChange={(e) => setManufacturingDate(e)}
                        placeholder="تاريخ بداية الصنع" />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <h3>
                        مجموعة الصنف :
                    </h3>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsType}
                        placeholder="مجموعة الصنف"
                        value={searchTextType}
                        onChange={(text) => {
                            setSearchTextType(text);
                            setType(undefined);
                        }}
                        onSelect={(value, option) => {
                            setType(option.value);
                            setSearchTextType(option?.label as string);
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
            okButtonProps={{ type: "primary" }}
        >
        </Modal>

        <div className="grid grid-cols-12 gap-4 md:gap-6 w-full">
            <Button className="col-span-5" variant="solid" color="cyan" onClick={() => changeOpenModalAdd()}>
                إضافة
            </Button>
            <Button className="col-span-5" variant="solid" color="green" onClick={() => downloadExcel()}>
                تنزيل
            </Button>
        </div>
        <Table
            scroll={{ x: "max-content" }}
            style={{ maxWidth: 1100 }}
            pagination={{
                position: ["topRight"],
            }}
            columns={columns} dataSource={dataTypes} />
    </div>
}
