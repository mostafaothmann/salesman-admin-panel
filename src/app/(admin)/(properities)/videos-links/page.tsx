"use client";


import { Button, Dropdown, Input, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { usePlacesStore } from "../../../../stores/placesStore/data.store";
import { ColumnsType } from "antd/es/table";
import { useOtherStore } from "../../../../stores/otherStore/data.store";
import { link } from "fs";


export default function VideoLinksPage() {
    const { getVideosLinksData, editVideoLink, dataVideosLinks, addVideoLink, deleteVideoLink } = useOtherStore();


    //Add Modal
    const { TextArea } = Input;
    const [name, setName] = useState("");
    const [id, setId] = useState(0);
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [open, setOpen] = useState(false);
    const [videoLink_id, setVideoLinkId] = useState(1);
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

    //handleEdit
    async function handleEdit() {
        setLoading(true);
        await editVideoLink(editedId, { link: link, name: name, description: description });
        setLoading(false);
        setOpenEditModal(false);
        getVideosLinksData();
    }

    //addType function
    async function handleAdd() {
        setVideoLinkId(videoLink_id + 1);
        await addVideoLink({ name, link, description })
        getVideosLinksData();
        setName("");
        setSearchText("");
        setDescription("")
        setOpen(false)
    }
    //emptyFields function
    const emptyFields = () => {
        setName("");
        setSearchText("");
        setLink("");
        setDescription("")
        setOpen(false)
    }
    //editModal
    const OpenEditModal = (id: number) => {
        setEditedId(id);
        const videoLink = dataVideosLinks?.find(
            item => item.id === id
        );
        setName(videoLink?.name || "");
        setLink(videoLink?.link || "");
        setDescription(videoLink?.description || "");
        setOpenEditModal(true);
    }
    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }
    //showModal
    const OpenShowModal = (id: number) => {
        const videoLink = dataVideosLinks?.find(
            item => item.id === id
        );
        setName(videoLink?.name || "");
        setDescription(videoLink?.description || "");
        setLink(videoLink?.link || "");
        setOpenShowModal(true);
    }

    //delete 
    async function handleDelete(id: number) {
        setLoading2(true);
        await deleteVideoLink(id);
        getVideosLinksData();
        setLoading2(false);
        setOpenDeleteModal(false);
    }

    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataVideosLinks ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Cities");
        XLSX.writeFile(workbook, "Cities.xlsx");
    };
    useEffect(() => { getVideosLinksData(); }, []);
    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            fixed: "left",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "الطبيب",
            dataIndex: "name",
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },
        {
            title: "الشرح",
            dataIndex: "description",
            sorter: (a: any, b: any) => a.description.localeCompare(b.description),
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
                    <span> إضافة رابط</span>
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
                    اسم الطبيب
                </h3>
            </div>
            <Input
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسم الطبيب"
            />
            <div >
                <h3>
                    الرابط
                </h3>
            </div>
            <TextArea
                className="w-full"
                value={link}
                style={{ maxWidth: '100%', maxHeight: 60 }}
                onChange={(e) => setLink(e.target.value)}
                placeholder="الرابط"
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
                    <span> تعديل رابط</span>
                </div>
            }
            open={open1}
            okButtonProps={{ variant: "outlined", color: "blue" }}
            onOk={() => handleEdit()}
            onCancel={() => { setOpenEditModal(false); emptyFields() }}
            confirmLoading={loading}   // ✅ spinner on OK button
            mask={false}
        >
            <div >
                <h3>
                    اسم الطبيب
                </h3>
            </div>
            <Input
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسم الطبيب"
            />
            <div >
                <h3>
                    الرابط
                </h3>
            </div>
            <TextArea
                className="w-full"
                value={link}
                style={{ maxWidth: '100%', maxHeight: 60 }}
                onChange={(e) => setLink(e.target.value)}
                placeholder="الرابط"
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

        {/* Show Modal */}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span>تفاصيل الرابط</span>
                </div>
            }
            open={openShowModal}
            onOk={() => emptyFields()}
            okButtonProps={{ variant: "outlined", color: "cyan" }}

            onCancel={() => { setOpenShowModal(false); emptyFields() }}
            confirmLoading={loading}   // ✅ spinner on OK button
            mask={false}
        >
            <Input
                className="w-full"
                disabled
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسم الطبيب"
            />
            <div >
                <h3>
                    الرابط
                </h3>
            </div>
            <TextArea
                disabled
                className="w-full"
                value={link}
                style={{ maxWidth: '100%', maxHeight: 60 }}
                onChange={(e) => setLink(e.target.value)}
                placeholder="الرابط"
            />
            <div>
                <h3>
                    الوصف
                </h3>
            </div>
            <TextArea
                disabled
                value={description}
                style={{ maxWidth: '100%' }}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="الوصف"
            />
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
            <Button className="col-span-5" variant="solid" color="cyan" onClick={() => setOpen(true)}>
                إضافة
            </Button>
        </div>
        <Table
            style={{ maxWidth: 1100 }}
            pagination={{
                position: ["topRight"],
            }}
            scroll={{ x: "max-content" }}
            columns={columns} dataSource={dataVideosLinks} />
    </div>
}
