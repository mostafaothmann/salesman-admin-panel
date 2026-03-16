"use client";

import { AutoComplete, Button, Divider, Input, InputNumber, Modal, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { ColumnsType } from "antd/es/table";
import { useCommercialStore } from "../../../../stores/commercialStore/data.store";
import { apiType } from "../../../../stores/apis";


export default function OffersPage() {
    const { getOffersData, editOffer, dataOffers, deleteOffer, getFilteredDataOffers, filteredDataOffers, total, filter_total } = useCommercialStore();

    const [page, setPage] = useState(1)
    const [filter_page, setFilterPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [typesNames, setTypesNames] = useState([])
    const [filtered, setFiltered] = useState(false)

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
    const [base_offer_id, setBaseOfferId] = useState(0);
    const [percentage_for_piece, setPercentageForPiece] = useState(0);
    const [base_percentage, setBasePercentage] = useState(0);
    const [return_percentage, setReturnPercentage] = useState(0);
    const [total_percentage, setTotalPercentage] = useState(0);
    const [type_id, setTypeId] = useState(0);
    const [order_id, setOrderId] = useState(0);

    //filters
    //Filter Modal 
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [filter_min_quantity, setFilterMinQuantity] = useState(0);
    const [filter_max_quantity, setFilterMaxQuantity] = useState(0);
    const [filter_min_total_price, setFitlerMinTotalPrice] = useState(0);
    const [filter_max_total_price, setFitlerMaxTotalPrice] = useState(0);
    const [filter_base_offer_id, setFilterBaseOfferId] = useState(0);
    const [searchTextType, setSearchTextType] = useState("");

    const [filter_type_id, setFilterTypeId] = useState(0);

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
        await editOffer(editedId, { order_id, type_id, delivery_percentage_for_piece, base_offer_id, return_discount, return_quantity, base_quantity, price_for_piece });
        setLoading(false);
        setOpenEditModal(false);
        getOffersData(page, limit);
    }


    //emptyFields function
    const emptyFields = () => {
        setName("");
        setFilterMaxQuantity(0);
        setFilterMinQuantity(0);
        setFitlerMaxTotalPrice(0);
        setFitlerMinTotalPrice(0);
        setFilterTypeId(0);
        setPriceForPiece(0);
        setTotalQuantity(0);
        setRetunDiscount(0);
        setReturnQuantity(0);
        setOpen(false)
    }
    //editModal
    const OpenEditModal = (id: number) => {
        setEditedId(id);
        const offer = dataOffers?.find(
            item => item.id === id
        );
        setBaseQuantity(offer?.base_quantity || 0);
        setReturnQuantity(offer?.return_quantity || 0);
        setTotalQuantity(offer?.total_quantity || 0);
        setPercentageForPiece(offer?.percentage_for_piece || 0);
        setBasePercentage(offer?.base_percentage || 0);
        setReturnPercentage(offer?.return_percentage);
        setTotalPercentage(offer?.total_percentage || 0);
        setPriceForPiece(offer?.price_for_piece || 0);
        setBaseTotalPrice(offer?.base_total_price || 0);
        setReturnTotalPrice(offer?.return_total_price || 0);
        setTotalPrice(offer?.total_price || 0);
        setDeliveryPercentageForPiece(offer?.delivery_percentage_for_piece || 0);
        setTotalDeliveryPercentage(offer?.total_delivery_percentage || 0);
        setRetunDiscount(offer?.return_discount || 0);
        setOrderId(offer?.order_id || 0)
        setId(offer?.id || 0);
        setTotalPrice(offer?.total_price || 0);
        setOpenEditModal(true);
    }
    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }
    //showModal
    const OpenShowModal = (id: number) => {
        const offer = dataOffers?.find(
            item => item.id === id
        );
        setBaseQuantity(offer?.base_quantity || 0);
        setReturnQuantity(offer?.return_quantity || 0);
        setTotalQuantity(offer?.total_quantity || 0);
        setPercentageForPiece(offer?.percentage_for_piece || 0);
        setBasePercentage(offer?.base_percentage || 0);
        setReturnPercentage(offer?.return_percentage);
        setTotalPercentage(offer?.total_percentage || 0);
        setPriceForPiece(offer?.price_for_piece || 0);
        setBaseTotalPrice(offer?.base_total_price || 0);
        setReturnTotalPrice(offer?.return_total_price || 0);
        setTotalPrice(offer?.total_price || 0);
        setDeliveryPercentageForPiece(offer?.delivery_percentage_for_piece || 0);
        setTotalDeliveryPercentage(offer?.total_delivery_percentage || 0);
        setRetunDiscount(offer?.return_discount || 0);
        setOrderId(offer?.order_id || 0)
        setId(offer?.id || 0);
        setOpenShowModal(true);
    }

    //delete 
    async function handleDelete(id: number) {
        setLoading2(true);
        await deleteOffer(id);
        getOffersData(page, limit);
        setLoading2(false);
        setOpenDeleteModal(false);
    }

    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataOffers ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "مبيعات الأصناف المفردة");
        XLSX.writeFile(workbook, "مبيعات الأصناف المفردة.xlsx");
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
        getOffersData(page, limit);
        console.log(dataOffers)

    }, []);

    //Filter
    //Filter Modal Funcs
    const OpenFilterModal = () => {
        emptyFields();
        if (!filtered) {
            setOpenFilterModal(true);
        }
        else {
            setFiltered(false);
        }
    }


    const getFilteredData = (page: number, limit: number) => {
        getFilteredDataOffers({
            page,
            limit,
            filter_max_quantity,
            filter_min_quantity,
            filter_max_total_price,
            filter_min_total_price,
            filter_type_id,
            filter_base_offer_id
        })
        setFiltered(true);
    }
    const handleFilter = () => {
        getFilteredData(page, limit);
        setOpenFilterModal(false);
        emptyFields();
    }

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
            title: "العمولة النهائية",
            dataIndex: "total_percentage",
            sorter: (a: any, b: any) => Number(a.total_percentage) - Number(b.total_percentage),
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
            title: "عمولة التوصيل",
            dataIndex: "total_delivery_percentage",
            sorter: (a: any, b: any) => Number(a.total_delivery_percentage) - Number(b.total_delivery_percentage),
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
            title: "تاريخ البيع",
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
            onOk={() => { setOpenShowModal(false); emptyFields(); }}
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

        {/*Filter Modal*/}
        <Modal
            title="فلترة النتائج"
            open={openFilterModal}
            onOk={() => handleFilter()}
            onCancel={() => { setOpenFilterModal(false); emptyFields() }}
            confirmLoading={loading3}
            mask={false}

            okButtonProps={{ type: "primary", variant: "outlined" }}
        >
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 xl:col-span-6">
                    <div>
                        <h3>
                            الصنف :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={typesNames?.map(e => { return { value: e.id, label: `${e.name} ` } })
                        }
                        placeholder="الصنف"
                        value={searchTextType}

                        onChange={(text) => {
                            setSearchTextType(text);
                            setFilterTypeId(undefined);
                        }}
                        onSelect={(value, option) => {
                            setFilterTypeId(option.value);
                            setSearchTextType(option?.label as string);
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>
                <div className="col-span-6 xl:col-span-6">
                    <div>
                        <h3>
                            أقل كمية :
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={filter_min_quantity}
                        onChange={(e) => setFilterMinQuantity(e)}
                        placeholder="أقل كمية"
                    />
                </div>
                <div className="col-span-6 xl:col-span-6">
                    <div>
                        <h3>
                            أعلى كمية :
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={filter_max_quantity}
                        onChange={(e) => setFilterMaxQuantity(e)}
                        placeholder="أعلى كمية"
                    />
                </div>
                <div className="col-span-6 xl:col-span-6">
                    <div>
                        <h3>
                            أقل مجموع سعر نهائي :
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={filter_min_total_price}
                        onChange={(e) => setFitlerMinTotalPrice(e)}
                        placeholder="أقل مجموع سعر نهائي"
                    />
                </div>
                <div className="col-span-6 xl:col-span-6">
                    <div>
                        <h3>
                            أعلى مجموع سعر نهائي :
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={filter_max_total_price}
                        onChange={(e) => setFitlerMaxTotalPrice(e)}
                        placeholder="أعلى مجموع سعر نهائي"
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
            <Button className="col-span-5" variant="solid" color="purple" onClick={() => OpenFilterModal()}>
                فلترة
            </Button>
            <Button className="col-span-5" variant="solid" color="green" onClick={() => downloadExcel()}>
                تنزيل
            </Button>
        </div>
        {filtered ? <Table
            scroll={{ x: "max-content" }}
            style={{ maxWidth: 1100 }}
            columns={columns}
            pagination={{
                placement: ['topEnd'],
                current: filter_page,
                pageSize: limit,
                total: filter_total,
                onChange: (page, pageSize) => {
                    setFilterPage(filter_page)
                    getFilteredData(page, pageSize)
                    // setPage(lastPage)
                },
            }}
            dataSource={filteredDataOffers || []} />
            :
            <Table
                scroll={{ x: "max-content" }}
                style={{ maxWidth: 1100 }}
                columns={columns}
                pagination={{
                    placement: ['topEnd'],
                    current: page,
                    pageSize: limit,
                    total: total,
                    onChange: (page, pageSize) => {
                        getOffersData(page, pageSize);
                        setPage(page)
                        //setPage(lastPage)
                    },
                }}
                dataSource={dataOffers || []} />
        }
    </div>
}
