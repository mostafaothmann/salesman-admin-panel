"use client";


import { AutoComplete, Button, Dropdown, Input, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { ColumnsType } from "antd/es/table";
import { useOtherStore } from "../../../../stores/otherStore/data.store";
import { useUsersStore } from "../../../../stores/usersStore/data.store";
import { apiSalesman } from "../../../../stores/apis";


export default function SalesmansMessagesPage() {
    const { dataSalesmans, getSalesmansData } = useUsersStore();
    const { dataSalesmansMessages, filteredDataSalesmansMessages, total, filter_total, getFilteredDataSalesmanMessages, getSalesmanMessagesData, addSalesmanMessage, editSalesmanMessage, deleteSalesmanMessage } = useOtherStore();

    //table constants
    const [page, setPage] = useState(1)
    const [filter_page, setFilterPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [pageSize, setPageSize] = useState(10)

    //Filter Modal 
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [filtered, setFiltered] = useState(false)

    //Add SalesmanMessage Modal
    const { TextArea } = Input;
    const [title, setTitle] = useState("");
    const [id, setId] = useState(0);
    const [content, setContent] = useState("");
    const [open, setOpen] = useState(false);
    const [salesman_id, setSalesmanId] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [salesmansNames, setSalesmansNames] = useState([])

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

    //Filters 
    const [filter_title, SetFilterTitle] = useState("")
    const [filter_salesman_id, setFilterSalesmanId] = useState(0)

    //options for Salesman auto complete
    const options = salesmansNames?.map(e => { return { value: e.id, label: `${e.first_name} ${e.last_name}` } })

    //handleEdit
    async function handleEdit() {
        setLoading(true);
        await editSalesmanMessage(editedId, { title: title, content: content, salesman_id: salesman_id });
        setLoading(false);
        setOpenEditModal(false);
        getSalesmanMessagesData(page, limit);
    }

    const getFilteredData = (page: number, limit: number) => {
        getFilteredDataSalesmanMessages({
            page,
            limit,
            filter_salesman_id,
            filter_title
        })
        setFiltered(true);
    }
    //addType function
    async function handleAdd() {
        setSalesmanId(salesman_id + 1);
        await addSalesmanMessage({ title, content, salesman_id })
        getSalesmanMessagesData(page, limit);
        setTitle("");
        setSearchText("");
        setContent("")
        setOpen(false)
    }
    //emptyFields function
    const emptyFields = () => {
        setTitle("");
        setSearchText("");
        setSalesmanId(-1);
        setContent("")
        setFilterSalesmanId(0);
        SetFilterTitle("");
        setOpen(false);
    }
    //editModal
    const OpenEditModal = (id: number) => {
        setEditedId(id);
        const salesmanMessage = dataSalesmansMessages?.find(
            item => item.id === id
        );
        setTitle(salesmanMessage?.title || "");
        setContent(salesmanMessage?.content || "");
        dataSalesmansMessages?.find(e => e.id == Number(salesmanMessage?.id))?.salesman_id
        // setSearchText(dataSalesmans?.find(e => e.id == dataSalesmansMessages?.filter(e => e.id == Number(salesmanMessageD?.id))?.salesman_id)?.first_name ${e.last_name}`)
        setOpenEditModal(true);
    }
    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }
    //showModal
    const openShowModal = (id: number) => {
        const salesmanMessage = dataSalesmansMessages?.find(
            item => item.id === id
        );
        setTitle(salesmanMessage?.title || "");
        setContent(salesmanMessage?.content || "");
        setOpen3(true);
    }


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

    const handleFilter = () => {
        getFilteredData(page, limit);
        setOpenFilterModal(false)
        emptyFields();
    }

    //delete 
    async function handleDelete(id: number) {
        setLoading2(true);
        await deleteSalesmanMessage(id);
        getSalesmanMessagesData(page, limit);
        setLoading2(false);
        setOpenDeleteModal(false);
    }

    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataSalesmansMessages ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "SalesmanMessages");
        XLSX.writeFile(workbook, "SalesmanMessages.xlsx");
    };
    useEffect(() => {
        getSalesmanMessagesData(page, limit);
        const fetchData = async () => {
            try {
                const [
                    salesmanRes
                ] = await Promise.all([
                    apiSalesman.get('/fullname'),
                ]);
                setSalesmansNames(salesmanRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            fixed: "left",
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "العنوان",
            dataIndex: "title",
            sorter: (a: any, b: any) => a.title.localeCompare(b.title),
        },
        ,
        {
            title: "المندوب",
            dataIndex: "salesman_id",
            sorter: (a: any, b: any) => Number(a.salesmna_id) - Number(b.salesmna_id),
            render: (value: number) => {
                const salesman = salesmansNames?.find(e => e.id == Number(value));
                return `${salesman?.first_name} ${salesman?.last_name}`
            }
        }
        ,
        {
            title: "المحتوى",
            dataIndex: "content",
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
                        onClick={() => openShowModal(record.id)}
                    >
                        Show
                    </Button>
                </Space>
            ),
        }
    ];

    return <div>

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
                            المندوب :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={options}
                        placeholder="المندوب"
                        value={searchText}
                        
                        onChange={(text) => {
                            setSearchText(text);
                            setFilterSalesmanId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setFilterSalesmanId(option.value);                 
                            setSearchText(option?.label as string);
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

        {/*Adding Modal*/}
        <Modal
            title="إضافة رسالة جديدة"
            open={open}
            onOk={() => handleAdd()}
            okButtonProps={{ variant: "outlined", color: "purple" }}
            onCancel={() => emptyFields()}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-2">
                <div className="grid grid-cols-12 sm:col-span-12  col-span-12 gap-2">
                    <div className="md:col-span-6 col-span-12">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="عنوان الرسالة"
                        />
                    </div>
                    <div className="md:col-span-6 col-span-12">
                        <AutoComplete
                            style={{ width: 200 }}
                            options={options}
                            placeholder="المندوب"

                                value={searchText}

                            
                            onChange={(text) => {
                                setSearchText(text);
                                setSalesmanId(undefined); // clear ID while typing
                            }}

                                onSelect={(value, option) => {
                                setSalesmanId(option.value);                 
                                setSearchText(option?.label as string);  // show title
                            }}

                            filterOption={(inputValue, option) =>
                                (option?.label as string)
                                    ?.toLowerCase()
                                    .includes(inputValue.toLowerCase())
                            }
                        />
                    </div>
                </div>
            </div>

            <TextArea
                value={content}
                style={{ maxWidth: '100%' }}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder="المحتوى"
            />
        </Modal>
        <Modal
            title="تعديل رسالة"
            open={open1}
            okButtonProps={{ variant: "outlined", color: "blue" }}
            onOk={() => handleEdit()}
            onCancel={() => { setOpenEditModal(false); emptyFields() }}
            confirmLoading={loading}   // ✅ spinner on OK button
            mask={false}
        >
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="عنوان الرسالة"
            />
            <TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder="المحتوى"
            />
            <AutoComplete
                style={{ width: 200 }}
                options={options}
                placeholder="المندوب"

                // what user sees & types
                value={searchText}

                
                onChange={(text) => {
                    setSearchText(text);
                    setSalesmanId(undefined); // clear ID while typing
                }}

                // when user selects from dropdown
                onSelect={(value, option) => {
                    setSalesmanId(option.value);                 
                    setSearchText(option?.label as string);  // show title
                }}

                filterOption={(inputValue, option) =>
                    (option?.label as string)
                        ?.toLowerCase()
                        .includes(inputValue.toLowerCase())
                }
            />

        </Modal>

        {/* Show Modal */}
        <Modal
            title="تفاصيل رسالة"
            open={open3}
            onOk={() => emptyFields()}
            okButtonProps={{ variant: "outlined", color: "cyan" }}

            onCancel={() => { setOpen3(false); emptyFields() }}
            confirmLoading={loading}   // ✅ spinner on OK button
            mask={false}
        >
            <Input
                disabled
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="عنوان الرسالة"
            />
            <TextArea
                disabled
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder="المحتوى"
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
            okButtonProps={{ type: "primary" }} 
        >
        </Modal>
        <div className="grid grid-cols-12 gap-4 md:gap-6 w-full">
            <Button className="col-span-5" variant="solid" color="cyan" onClick={() => setOpen(true)}>
                إضافة
            </Button>
            <Button className="col-span-5" variant="solid" color="purple" onClick={() => OpenFilterModal()}>
                فلترة
            </Button>
        </div>
        <div className="max-w-full">
            {filtered ? <Table
                scroll={{ x: "max-content" }}
                columns={columns}
                pagination={{
                    position: ["topRight"],
                    current: filter_page,
                    pageSize: limit,
                    total: filter_total,
                    onChange: (page, pageSize) => {
                        setFilterPage(filter_page)
                        getFilteredData(page, pageSize)
                        // setPage(lastPage)
                    },
                }}
                dataSource={filteredDataSalesmansMessages || []} />
                :
                <Table
                    scroll={{ x: "max-content" }}
                    style={{ maxWidth: 1100 }}
                    columns={columns}
                    pagination={{
                        position: ["topRight"],
                        current: page,
                        pageSize: limit,
                        total: total,
                        onChange: (page, pageSize) => {
                            getSalesmansData(page, pageSize);
                            setPage(page)
                            //setPage(lastPage)
                        },
                    }}
                    dataSource={dataSalesmansMessages || []} />
            }

        </div>
    </div>
}
