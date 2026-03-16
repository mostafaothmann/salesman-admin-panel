"use client";


import { AutoComplete, Button, Dropdown, Input, InputNumber, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { usePlacesStore } from "../../../../stores/placesStore/data.store";
import { ColumnsType } from "antd/es/table";
import { useOtherStore } from "../../../../stores/otherStore/data.store";
import { link } from "fs";
import { useCommercialStore } from "../../../../stores/commercialStore/data.store";
import { apiType } from "../../../../stores/apis";


export default function BaseOffersPage() {
    const { getBaseOffersData, editBaseOffer, dataBaseOffers, addBaseOffer, deleteBaseOffer } = useCommercialStore();


    //Add Modal
    const { TextArea } = Input;
    const [name, setName] = useState("");
    const [id, setId] = useState(0);
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [open, setOpen] = useState(false);
    const [baseOffer_id, setBaseOfferId] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [typesNames, setTypesNames] = useState([])
    const [searchTextType, setSearchTextType] = useState("");

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
        await editBaseOffer(editedId, { type_id, number_of_gifts, number_of_pieces });
        setLoading(false);
        setOpenEditModal(false);
        getBaseOffersData();
    }


    //addType function
    async function handleAdd() {
        setBaseOfferId(baseOffer_id + 1);
        await addBaseOffer({ type_id, number_of_gifts, number_of_pieces })
        emptyFields();
        getBaseOffersData();
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
    //editModal
    async function OpenEditModal(id: number) {
        setEditedId(id);
        const baseOffer = dataBaseOffers?.find(
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
        const baseOffer = dataBaseOffers?.find(
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
        await deleteBaseOffer(id);
        getBaseOffersData();
        setLoading2(false);
        setOpenDeleteModal(false);
    }

    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataBaseOffers ?? []);
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
            title: "الصنف",
            dataIndex: "type_id",
            sorter: (a: any, b: any) => Number(a.type_id) - Number(b.type_id),
            render: (value: number) => {
                const type = typesNames?.find(e => e.id == Number(value));
                return `${type?.name}`
            }
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
                <div className="col-span-6 sm:col-span-6">
                    <div>
                        <h3>
                            صنف العرض :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={typesNames?.map(e => { return { value: e.id, label: `${e.name} ` } })
                        }
                        placeholder="صنف العرض"
                        value={searchTextType}

                        onChange={(text) => {
                            setSearchTextType(text);
                            setTypeId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setTypeId(option.value);
                            setSearchTextType(option?.label as string);
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>
            </div>



        </Modal>
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span> تعديل عرض</span>
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
                <div className="col-span-6 sm:col-span-6">
                    <div>
                        <h3>
                            صنف العرض :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={typesNames?.map(e => { return { value: e.id, label: `${e.name} ` } })
                        }
                        placeholder="صنف العرض"
                        value={searchTextType}

                        onChange={(text) => {
                            setSearchTextType(text);
                            setTypeId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setTypeId(option.value);
                            setSearchTextType(option?.label as string);
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>
            </div>
        </Modal>

        {/* Show Modal */}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span>تفاصيل العرض</span>
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
                <div className="col-span-6 sm:col-span-6">
                    <h3>
                        عدد القطع الأساسية
                    </h3>
                    <InputNumber
                        disabled
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
                        disabled
                        style={{ width: '100%' }}
                        value={number_of_gifts}
                        onChange={(e) => setNumberOfGifts(e)}
                        placeholder="عدد القطع المجانية"
                    />
                </div>
                <div className="col-span-6 sm:col-span-6">
                    <div>
                        <h3>
                            صنف العرض :
                        </h3>
                    </div>
                    <AutoComplete
                        disabled
                        style={{ width: '100%' }}
                        options={typesNames?.map(e => { return { value: e.id, label: `${e.name} ` } })
                        }
                        placeholder="صنف العرض"
                        value={searchTextType}

                        onChange={(text) => {
                            setSearchTextType(text);
                            setTypeId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setTypeId(option.value);
                            setSearchTextType(option?.label as string);
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
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
            <Button className="col-span-5" variant="solid" color="cyan" onClick={() => setOpen(true)}>
                إضافة
            </Button>
            <Button className="col-span-5" variant="solid" color="green" onClick={() => downloadExcel()}>
                تنزيل
            </Button>
        </div>
        <Table
            style={{ maxWidth: 1100 }}
            pagination={{
                position: ["topRight"],
            }}
            scroll={{ x: "max-content" }}
            columns={columns} dataSource={dataBaseOffers} />
    </div>
}
