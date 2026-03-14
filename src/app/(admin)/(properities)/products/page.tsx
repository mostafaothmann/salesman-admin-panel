"use client";

import { Button, Divider, Input, InputNumber, Modal, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { ColumnsType } from "antd/es/table";
import { useCommercialStore } from "../../../../stores/commercialStore/data.store";
import { apiType } from "../../../../stores/apis";


export default function ProductsPage() {
    const { getProductsData, editProduct, dataProducts, deleteProduct } = useCommercialStore();

    const [page, setPage] = useState(1)
    const [filter_page, setFilterPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [typesNames, setTypesNames] = useState([])

    //Add Modal
    const { TextArea } = Input;
    const [name, setName] = useState("");
    const [id, setId] = useState(0);
    const [return_discount, setRetunDiscount] = useState(0);
    const [return_total_price, setReturnTotalPrice] = useState(0);
    const [base_total_price, setBaseTotalPrice] = useState(0);
    const [base_quantity, setBaseQuantity] = useState(0);
    const [return_quantity, setReturnQuantity] = useState(0);
    const [total_quantity, setTotalQuantity] = useState(0);
    const [price_for_piece, setPriceForPiece] = useState(0);
    const [total_price, setTotalPrice] = useState(0);
    const [total_delivery_percentage, setTotalDeliveryPercentage] = useState(0);
    const [delivery_percentage_for_piece, setDeliveryPercentageForPiece] = useState(0);
    const [percentage_for_piece, setPercentageForPiece] = useState(0);
    const [base_percentage, setBasePercentage] = useState(0);
    const [return_percentage, setReturnPercentage] = useState(0);

    const [total_percentage, setTotalPercentage] = useState(0);
    const [type_id, setTypeId] = useState(0);
    const [order_id, setOrderId] = useState(0);


    const [link, setLink] = useState("");
    const [open, setOpen] = useState(false);


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


    //handleEdit
    async function handleEdit() {
        setLoading(true);
        await editProduct(editedId, { total_delivery_percentage, return_discount, return_quantity, base_quantity, total_quantity, price_for_piece });
        setLoading(false);
        setOpenEditModal(false);
        getProductsData(page, limit);
    }


    //emptyFields function
    const emptyFields = () => {
        setName("");
        setPriceForPiece(0);
        setTotalQuantity(0);
        setRetunDiscount(0);
        setReturnQuantity(0);
        setOpen(false)
    }
    //editModal
    const OpenEditModal = (id: number) => {
        setEditedId(id);
        const product = dataProducts?.find(
            item => item.id === id
        );
        setBaseQuantity(product?.base_quantity || 0);
        setReturnQuantity(product?.return_quantity || 0);
        setTotalQuantity(product?.total_quantity || 0);
        setPercentageForPiece(product?.percentage_for_piece || 0);
        setBasePercentage(product?.base_percentage || 0);
        setReturnPercentage(product?.return_percentage);
        setTotalPercentage(product?.total_percentage || 0);
        setPriceForPiece(product?.price_for_piece || 0);
        setBaseTotalPrice(product?.base_total_price || 0);
        setReturnTotalPrice(product?.return_total_price || 0);
        setTotalPrice(product?.total_price || 0);
        setDeliveryPercentageForPiece(product?.delivery_percentage_for_piece || 0);
        setTotalDeliveryPercentage(product?.total_delivery_percentage || 0);
        setRetunDiscount(product?.return_discount || 0);
        setOrderId(product?.order_id || 0)
        setId(product?.id || 0);
        setTotalPrice(product?.total_price || 0);
        setOpenEditModal(true);
    }
    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }
    //showModal
    const OpenShowModal = (id: number) => {
        const product = dataProducts?.find(
            item => item.id === id
        );
        setBaseQuantity(product?.base_quantity || 0);
        setReturnQuantity(product?.return_quantity || 0);
        setTotalQuantity(product?.total_quantity || 0);
        setPercentageForPiece(product?.percentage_for_piece || 0);
        setBasePercentage(product?.base_percentage || 0);
        setReturnPercentage(product?.return_percentage);
        setTotalPercentage(product?.total_percentage || 0);
        setPriceForPiece(product?.price_for_piece || 0);
        setBaseTotalPrice(product?.base_total_price || 0);
        setReturnTotalPrice(product?.return_total_price || 0);
        setTotalPrice(product?.total_price || 0);
        setDeliveryPercentageForPiece(product?.delivery_percentage_for_piece || 0);
        setTotalDeliveryPercentage(product?.total_delivery_percentage || 0);
        setRetunDiscount(product?.return_discount || 0);
        setOrderId(product?.order_id || 0)
        setId(product?.id || 0);
        setOpenShowModal(true);
    }

    //delete 
    async function handleDelete(id: number) {
        setLoading2(true);
        await deleteProduct(id);
        getProductsData(page, limit);
        setLoading2(false);
        setOpenDeleteModal(false);
    }

    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataProducts ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Cities");
        XLSX.writeFile(workbook, "Cities.xlsx");
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    typeRes,
                ] = await Promise.all([
                    apiType.get('/names'),
                ]);
                setTypesNames(typeRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        getProductsData(page, limit);

    }, []);
    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            fixed: "left",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        }
        ,
        {
            title: "الصنف",
            dataIndex: "type_id",
            fixed: "left",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
            render: (value: number) => {
                return (
                    <Tag color={"#008000"}>
                        {typesNames.find(e => e.id == value)?.name}
                    </Tag>
                );
            }
        }
        ,
        {
            title: "سعر القطعة",
            dataIndex: "price_for_piece",
            sorter: (a: any, b: any) => Number(a.price_for_piece) - Number(b.price_for_piece),
            render: (value: number) => {
                if (value >= 1000000) {
                    return <Tag color={"#355872"}>
                        {value / 1000000} مليون
                    </Tag>
                }
                else if (value >= 1000) {
                    return <Tag color={"#1C0770"}>
                        {value / 1000} ألف
                    </Tag>
                }
                else return <Tag color={"#FF5A5A"}>
                    {value} ليرة
                </Tag>;
            }
        }
        ,
        {
            title: "الكمية المباعة",
            dataIndex: "base_quantity",
            sorter: (a: any, b: any) => Number(a.base_quantity) - Number(b.base_quantity),
            render: (value: number) => {
                { return `${value} قطعة` }
            }
        }
        ,
        {
            title: "كميةالإرجاع",
            dataIndex: "return_quantity",
            sorter: (a: any, b: any) => Number(a.return_quantity) - Number(b.return_quantity),
            render: (value: number) => {
                { return `${value} قطعة` }
            }
        }
        ,
        {
            title: "الكمية  بعد الإرجاع",
            dataIndex: "total_quantity",
            sorter: (a: any, b: any) => Number(a.total_quantity) - Number(b.total_quantity),
            render: (value: number) => {
                { return `${value} قطعة` }
            }
        }
        ,
        {
            title: "القيمة المباعة",
            dataIndex: "base_total_price",
            sorter: (a: any, b: any) => Number(a.base_total_price) - Number(b.base_total_price),
            render: (value: number) => {
                if (value >= 1000000) {
                    return <Tag color={"#355872"}>
                        {value / 1000000} مليون
                    </Tag>
                }
                else if (value >= 1000) {
                    return <Tag color={"#1C0770"}>
                        {value / 1000} ألف
                    </Tag>
                }
                else return <Tag color={"#FF5A5A"}>
                    {value} ليرة
                </Tag>;
            }
        }
        ,
        {
            title: "قيمة الإرجاع",
            dataIndex: "return_total_price",
            sorter: (a: any, b: any) => Number(a.return_total_price) - Number(b.return_total_price),
            render: (value: number) => {
                if (value >= 1000000) {
                    return <Tag color={"#355872"}>
                        {value / 1000000} مليون
                    </Tag>
                }
                else if (value >= 1000) {
                    return <Tag color={"#1C0770"}>
                        {value / 1000} ألف
                    </Tag>
                }
                else return <Tag color={"#FF5A5A"}>
                    {value} ليرة
                </Tag>;
            }
        }
        ,
        {
            title: "القيمة  بعد الإرجاع",
            dataIndex: "total_price",
            sorter: (a: any, b: any) => Number(a.total_price) - Number(b.total_price),
            render: (value: number) => {
                if (value >= 1000000) {
                    return <Tag color={"#355872"}>
                        {value / 1000000} مليون
                    </Tag>
                }
                else if (value >= 1000) {
                    return <Tag color={"#1C0770"}>
                        {value / 1000} ألف
                    </Tag>
                }
                else return <Tag color={"#FF5A5A"}>
                    {value} ليرة
                </Tag>;
            }
        }
        ,
        {
            title: "حسم الإرجاع",
            dataIndex: "return_discount",
            sorter: (a: any, b: any) => Number(a.return_discount) - Number(b.return_discount),

        }
        ,
        {
            title: "العمولة",
            dataIndex: "base_percentage",
            sorter: (a: any, b: any) => Number(a.base_percentage) - Number(b.base_percentage),
            render: (value: number) => {
                if (value >= 1000000) {
                    return <Tag color={"#355872"}>
                        {value / 1000000} مليون
                    </Tag>
                }
                else if (value >= 1000) {
                    return <Tag color={"#1C0770"}>
                        {value / 1000} ألف
                    </Tag>
                }
                else return <Tag color={"#FF5A5A"}>
                    {value} ليرة
                </Tag>;
            }
        }
        ,
        {
            title: "عمولة المرجع",
            dataIndex: "return_percentage",
            sorter: (a: any, b: any) => Number(a.return_percentage) - Number(b.return_percentage),
            render: (value: number) => {
                if (value >= 1000000) {
                    return <Tag color={"#355872"}>
                        {value / 1000000} مليون
                    </Tag>
                }
                else if (value >= 1000) {
                    return <Tag color={"#1C0770"}>
                        {value / 1000} ألف
                    </Tag>
                }
                else return <Tag color={"#FF5A5A"}>
                    {value} ليرة
                </Tag>;
            }
        }
        ,
        {
            title: "العمولة  بعد الإرجاع",
            dataIndex: "total_percentage",
            sorter: (a: any, b: any) => Number(a.total_quantity) - Number(b.total_quantity),
            render: (value: number) => {
                if (value >= 1000000) {
                    return <Tag color={"#355872"}>
                        {value / 1000000} مليون
                    </Tag>
                }
                else if (value >= 1000) {
                    return <Tag color={"#1C0770"}>
                        {value / 1000} ألف
                    </Tag>
                }
                else return <Tag color={"#FF5A5A"}>
                    {value} ليرة
                </Tag>;
            }
        }
        ,
        {
            title: "تاريخ الإضافة",
            dataIndex: "created_at",
            sorter: (a: any, b: any) => a.created_at.localeCompare(b.created_at),
            render: (value: string) => { return value?.slice(0, 10) }
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
                        onClick={() => OpenShowModal(record.id)}
                    >
                        Show
                    </Button>
                </Space>
            ),
        }
    ];

    return <div>

        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span>p:{order_id}:{id}</span>
                </div>
            }
            open={open1}
            okButtonProps={{ variant: "outlined", color: "blue" }}
            onOk={() => handleEdit()}
            onCancel={() => { setOpenEditModal(false); emptyFields() }}
            confirmLoading={loading}   // ✅ spinner on OK button
            mask={false}
        >
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <h3>
                        الكمية
                    </h3>
                </div>
                <div className="col-span-6 md:col-span-6">
                    <div >
                        <h3>
                            الأساسي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={base_quantity}
                        onChange={(e) => setBaseQuantity(e)}
                        placeholder="الأساسي"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            المرتجع
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={return_quantity}
                        onChange={(e) => setReturnQuantity(e)}
                        placeholder="المرتجع"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            النهائي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={total_quantity}
                        onChange={(e) => setBaseQuantity(e)}
                        placeholder="النهائي"
                    />
                </div>

                <div className="col-span-12">
                    <h3>
                        النسبة
                    </h3>
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            للقطعة
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={percentage_for_piece}
                        onChange={(e) => setPercentageForPiece(e)}
                        placeholder="للقطعة"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            الأساسي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={base_percentage}
                        onChange={(e) => setBasePercentage(e)}
                        placeholder="الأساسي"
                    />
                </div>

                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            المرتجع
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={return_percentage}
                        onChange={(e) => setReturnPercentage(e)}
                        placeholder="المرتجع"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            النهائي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={total_percentage}
                        onChange={(e) => setTotalPercentage(e)}
                        placeholder="النهائي"
                    />
                </div>
                <div className="col-span-12">
                    <h3>
                        التوصيل
                    </h3>
                </div>
                <div className="col-span-6 md:col-span-9">
                    <div >
                        <h3>
                            للقطعة
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={delivery_percentage_for_piece}
                        onChange={(e) => setDeliveryPercentageForPiece(e)}
                        placeholder="للقطعة"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            النهائي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={total_delivery_percentage}
                        onChange={(e) => setTotalDeliveryPercentage(e)}
                        placeholder="النهائي"
                    />
                </div>
            </div>
            <Divider type="horizontal" style={{ borderTop: '2px solid #d9d9d9' }} ></Divider>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <h3>
                        السعر
                    </h3>
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            للقطعة
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={price_for_piece}
                        onChange={(e) => setPriceForPiece(e)}
                        placeholder="للقطعة"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            الأساسي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={base_total_price}
                        onChange={(e) => setBaseTotalPrice(e)}
                        placeholder="الأساسي"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            المرتجع
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={return_total_price}
                        onChange={(e) => setReturnTotalPrice(e)}
                        placeholder="المرتجع"
                    />
                </div>

                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            النهائي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={total_price}
                        onChange={(e) => setTotalPrice(e)}
                        placeholder="النهائي"
                    />
                </div>
            </div>
        </Modal>

        {/* Show Modal */}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span>p:{order_id}:{id}</span>
                </div>
            }
            open={openShowModal}
            onOk={() => emptyFields()}
            okButtonProps={{ variant: "outlined", color: "cyan" }}

            onCancel={() => { setOpenShowModal(false); emptyFields() }}
            confirmLoading={loading}   // ✅ spinner on OK button
            mask={false}
        >
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <h3>
                        الكمية
                    </h3>
                </div>
                <div className="col-span-6 md:col-span-6">
                    <div >
                        <h3>
                            الأساسي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={base_quantity}
                        onChange={(e) => setBaseQuantity(e)}
                        placeholder="الأساسي"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            المرتجع
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={return_quantity}
                        onChange={(e) => setReturnQuantity(e)}
                        placeholder="المرتجع"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            النهائي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={total_quantity}
                        onChange={(e) => setBaseQuantity(e)}
                        placeholder="النهائي"
                    />
                </div>

                <div className="col-span-12">
                    <h3>
                        النسبة
                    </h3>
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            للقطعة
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={percentage_for_piece}
                        onChange={(e) => setPercentageForPiece(e)}
                        placeholder="للقطعة"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            الأساسي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={base_percentage}
                        onChange={(e) => setBasePercentage(e)}
                        placeholder="الأساسي"
                    />
                </div>

                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            المرتجع
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={return_percentage}
                        onChange={(e) => setReturnPercentage(e)}
                        placeholder="المرتجع"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            النهائي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={total_percentage}
                        onChange={(e) => setTotalPercentage(e)}
                        placeholder="النهائي"
                    />
                </div>
                <div className="col-span-12">
                    <h3>
                        التوصيل
                    </h3>
                </div>
                <div className="col-span-6 md:col-span-9">
                    <div >
                        <h3>
                            للقطعة
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={delivery_percentage_for_piece}
                        onChange={(e) => setDeliveryPercentageForPiece(e)}
                        placeholder="للقطعة"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            النهائي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={total_delivery_percentage}
                        onChange={(e) => setTotalDeliveryPercentage(e)}
                        placeholder="النهائي"
                    />
                </div>
            </div>
            <Divider type="horizontal" style={{ borderTop: '2px solid #d9d9d9' }} ></Divider>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <h3>
                        السعر
                    </h3>
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            للقطعة
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={price_for_piece}
                        onChange={(e) => setPriceForPiece(e)}
                        placeholder="للقطعة"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            الأساسي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={base_total_price}
                        onChange={(e) => setBaseTotalPrice(e)}
                        placeholder="الأساسي"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            المرتجع
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={return_total_price}
                        onChange={(e) => setReturnTotalPrice(e)}
                        placeholder="المرتجع"
                    />
                </div>

                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            النهائي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={total_price}
                        onChange={(e) => setTotalPrice(e)}
                        placeholder="النهائي"
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
        <div className="grid grid-cols-12 gap-4 md:gap-6 w-full">
            <Button className="col-span-5" variant="solid" color="green" onClick={() => setOpen(true)}>
                تنزيل
            </Button>
            <Button className="col-span-5" variant="solid" color="purple" onClick={() => setOpen(true)}>
                فلترة
            </Button>
        </div>
        <Table
            style={{ maxWidth: 1100 }}
            pagination={{
                position: ["topRight"],
            }}
            scroll={{ x: "max-content" }}
            columns={columns} dataSource={dataProducts} />
    </div>
}
