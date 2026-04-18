"use client";


import { AutoComplete, Button, Dropdown, Input, InputNumber, Modal, notification, Skeleton, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { usePlacesStore } from "../../../../../../../stores/placesStore/data.store";
import { ColumnsType } from "antd/es/table";
import { useOtherStore } from "../../../../../../../stores/otherStore/data.store";
import { link } from "fs";
import { useCommercialStore } from "../../../../../../../stores/commercialStore/data.store";
import { apiType } from "../../../../../../../stores/apis";
import { profileComponent } from "../../../../../../../stores/other-store-interfaces";


export default function TypeBaseOffers({ profile_id }: profileComponent) {
    const { getBaseOffersData, editBaseOffer, addBaseOffer, deleteBaseOffer } = useCommercialStore();

    const [baseOffers, setBaseOffers] = useState([])
    const fetchData = async () => {
        try {
            const res = await apiType.get(`/base-offers/${profile_id}`);
            setBaseOffers(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchData().finally(() => setPageLoading(false));
    }, [profile_id]);

    //Add Modal
    const [open, setOpen] = useState(false);
    const [baseOffer_id, setBaseOfferId] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [typesNames, setTypesNames] = useState([])
    const [searchTextType, setSearchTextType] = useState("");


    //Close Modal 
    const [openCloseModal, setOpenCloseModal] = useState(false);
    //Open Modal
    const [openOpenModal, setOpenOpenModal] = useState(false);

    //Edit Modal
    const [open1, setOpenEditModal] = useState(false);
    const [editedId, setEditedId] = useState(0)
    const [loading, setLoading] = useState(false);
    const [type_id, setTypeId] = useState(0)
    const [number_of_gifts, setNumberOfGifts] = useState(0)
    const [number_of_pieces, setNumberOfPieces] = useState(0)

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
        if (number_of_gifts && /^\d+$/.test(String(number_of_gifts)) &&
            number_of_pieces && /^\d+$/.test(String(number_of_pieces))
        ) {
            try {
                const res = await editBaseOffer(editedId, { type_id, number_of_gifts, number_of_pieces, isActive: false });
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
        emptyFields();
        setOpenEditModal(false);
        getBaseOffersData();
    }


    async function handleClose(id: number) {
        setLoading(true);

        try {
            const res = await editBaseOffer(id, { type_id, isActive: false, number_of_gifts, number_of_pieces });
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

        setLoading(false);
        emptyFields();
        fetchData();
        setOpenCloseModal(false);
        getBaseOffersData();
    }


    async function handleOpen(id: number) {
        setLoading(true);

        try {
            const res = await editBaseOffer(id, { type_id, isActive: true, number_of_gifts, number_of_pieces });
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

        setLoading(false);
        emptyFields();
        fetchData();
        setOpenOpenModal(false);
        getBaseOffersData();
    }

    //addType function
    async function handleAdd() {
        setBaseOfferId(baseOffer_id + 1);
        if (number_of_gifts && /^\d+$/.test(String(number_of_gifts)) &&
            number_of_pieces && /^\d+$/.test(String(number_of_pieces))
        ) {
            try {
                //adding for this type only so put profile_id
                const res = await addBaseOffer({ type_id: profile_id, number_of_gifts, number_of_pieces, isActive: true })

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
        emptyFields();
        setPageLoading(true);
        fetchData().finally(() => setPageLoading(false));
        setOpen(false)
    }
    //emptyFields function
    const emptyFields = () => {
        setSearchTextType("");
        setTypeId(0);
        setNumberOfGifts(0);
        setNumberOfPieces(0);
        setSearchText("");
        setOpen(false)
    }
    //close Base Offer
    async function OpenCloseModal(id: number) {
        setEditedId(id);
        const baseOffer = baseOffers?.find(
            item => item.id === id
        );
        await setSearchTextType(typesNames.find(e => e.id == baseOffer?.type_id)?.name)
        setTypeId(baseOffer?.type_id);
        setNumberOfGifts(baseOffer?.number_of_gifts);
        setNumberOfPieces(baseOffer?.number_of_pieces);
        setOpenCloseModal(true);
    }

    //open Base Offer
    async function OpenOpenModal(id: number) {
        setEditedId(id);
        const baseOffer = baseOffers?.find(
            item => item.id === id
        );
        await setSearchTextType(typesNames.find(e => e.id == baseOffer?.type_id)?.name)
        setTypeId(baseOffer?.type_id);
        setNumberOfGifts(baseOffer?.number_of_gifts);
        setNumberOfPieces(baseOffer?.number_of_pieces);
        setOpenOpenModal(true);
    }

    //editModal
    async function OpenEditModal(id: number) {
        setEditedId(id);
        const baseOffer = baseOffers?.find(
            item => item.id === id
        );
        await setSearchTextType(typesNames.find(e => e.id == baseOffer?.type_id)?.name)
        setTypeId(baseOffer?.type_id);
        setNumberOfGifts(baseOffer?.number_of_gifts);
        setNumberOfPieces(baseOffer?.number_of_pieces);
        setOpenEditModal(true);
    }
    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }
    //showModal
    async function OpenShowModal(id: number) {
        setShownId(id);
        const baseOffer = baseOffers?.find(
            item => item.id === id
        );
        await setSearchTextType(typesNames.find(e => e.id == baseOffer?.type_id)?.name)
        setTypeId(baseOffer?.type_id);
        setNumberOfGifts(baseOffer?.number_of_gifts);
        setNumberOfPieces(baseOffer?.number_of_pieces);
        setOpenShowModal(true);
    }

    //delete 
    async function handleDelete(id: number) {
        setLoading2(true);

        try {
            const res = await deleteBaseOffer(id);
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
        getBaseOffersData();
        setLoading2(false);
        setOpenDeleteModal(false);
    }

    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        setPageLoading(true);
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
        getBaseOffersData();
    }, []);


    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            fixed: "left",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "عدد القطع الأساسية",
            dataIndex: "number_of_pieces",
            sorter: (a: any, b: any) => Number(a.number_of_pieces) - Number(b.number_of_pieces),
        },
        {
            title: "عدد القطع المجانية",
            dataIndex: "number_of_gifts",
            sorter: (a: any, b: any) => Number(a.number_of_gifts) - Number(b.number_of_gifts),
        },
        {
            title: "",
            dataIndex: "isActive",
            sorter: (a: any, b: any) => Number(a.isActive) - Number(b.isActive),
            render: (value: number) => {
                let tagColor = "#01B9B0";
                let mainLabel = "";
                if (value) {
                    tagColor = "#355872";
                    mainLabel = "فعال";
                }
                else {
                    tagColor = "#1C0770";
                    mainLabel = "متوقف";
                }
                return (
                    <Tag color={tagColor} >
                        {mainLabel}
                    </Tag >
                );
            }
        },

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
                        حذف
                    </Button>
                    <Button
                        variant="outlined"
                        color="cyan"
                        onClick={() => { OpenEditModal(record.id); }}
                    >
                        تعديل
                    </Button>
                    {record?.isActive ? (
                        <Button
                            variant="outlined"
                            color="cyan"
                            onClick={() => { OpenCloseModal(record.id); }}
                        >
                            إغلاق العرض
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            color="default"
                            onClick={() => { OpenOpenModal(record.id); }}
                        >
                            فتح العرض
                        </Button>
                    )}
                </Space>
            ),
        }
    ];

    return <div>
        {/*Adding Modal*/}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#592C46]">
                    <span> إضافة عرض</span>
                </div>
            }
            open={open}
            onOk={() => handleAdd()}
            okButtonProps={{ variant: "outlined", color: "purple" }}
            onCancel={() => emptyFields()}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    <h3>
                        عدد القطع الأساسية
                    </h3>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={number_of_pieces}
                        onChange={(e) => setNumberOfPieces(e)}
                        placeholder="عدد القطع الأساسية"
                    />
                </div>

                <div className="col-span-6">
                    <h3>
                        عدد القطع المجانية
                    </h3>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={number_of_gifts}
                        onChange={(e) => setNumberOfGifts(e)}
                        placeholder="عدد القطع المجانية"
                    />
                </div>
            </div>
        </Modal>
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#592C46]">
                    <span> تعديل عرض</span>
                </div>
            }
            open={open1}
            okButtonProps={{ variant: "outlined", color: "blue" }}
            onOk={() => handleEdit()}
            onCancel={() => { setOpenEditModal(false); emptyFields() }}
            confirmLoading={loading}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 sm:col-span-6">
                    <h3>
                        عدد القطع الأساسية
                    </h3>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={number_of_pieces}
                        onChange={(e) => setNumberOfPieces(e)}
                        placeholder="عدد القطع الأساسية"
                    />
                </div>

                <div className="col-span-6 sm:col-span-6">
                    <h3>
                        عدد القطع المجانية
                    </h3>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={number_of_gifts}
                        onChange={(e) => setNumberOfGifts(e)}
                        placeholder="عدد القطع المجانية"
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

        {/*Close Modal*/}
        <Modal
            title="اغلاق العرض"
            open={openCloseModal}
            onOk={() => handleClose(editedId)}
            onCancel={() => setOpenCloseModal(false)}
            confirmLoading={loading2}
            mask={false}
            okType="danger"
            okButtonProps={{ type: "primary" }}
        >
        </Modal>

        {/*Open Modal*/}
        <Modal
            title="فتح العرض"
            open={openOpenModal}
            onOk={() => handleOpen(editedId)}
            onCancel={() => setOpenOpenModal(false)}
            confirmLoading={loading2}
            mask={false}
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
                    columns={columns} dataSource={baseOffers} />
        }
    </div>
}
