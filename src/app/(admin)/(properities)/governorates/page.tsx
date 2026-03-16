"use client";


import { Button, Dropdown, Input, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { usePlacesStore } from "../../../../stores/placesStore/data.store";
import { ColumnsType } from "antd/es/table";


export default function GovernoratesPage() {
  const { getGovernoratesData, editGovernorate, dataGovernorates, addGovernotate, deleteGovernorate } = usePlacesStore();


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

  //handleEdit
  async function handleEdit() {
    setLoading(true);
    await editGovernorate(editedId, { name: name });
    setLoading(false);
    setOpenEditModal(false);
    getGovernoratesData();
  }

  //addType function
  async function handleAdd() {
    setGovernorateId(governorate_id + 1);
    await addGovernotate({ name })
    getGovernoratesData();
    setName("");
    setSearchText("");
    setDescription("")
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
    const governorate = dataGovernorates?.find(
      item => item.id === id
    );
    setName(governorate?.name || "");
    setOpenEditModal(true);
  }
  //deleteModal
  const OpenDeleteModal = (id: number) => {
    setDelitedID(id);
    setOpenDeleteModal(true);
  }
  //showModal
  const OpenShowModal = (id: number) => {
    const governorate = dataGovernorates?.find(
      item => item.id === id
    );
    console.log()
    setName(governorate?.name || "");
    setItems(governorate?.cities?.map(e => { return { key: e.id, label: e.name } }) || [])
    setOpenShowModal(true);
  }

  //delete 
  async function handleDelete(id: number) {
    setLoading2(true);
    await deleteGovernorate(id);
    getGovernoratesData();
    setLoading2(false);
    setOpenDeleteModal(false);
  }

  //downloadExcele
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataGovernorates ?? []);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cities");
    XLSX.writeFile(workbook, "Cities.xlsx");
  };
  useEffect(() => { getGovernoratesData(); }, []);
  const columns: ColumnsType<any> = [
    {
      title: "الرقم",
      dataIndex: "id",
      fixed: "left",
      sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
    },
    {
      title: "المحافظة",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
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
          <span> إضافة محافظة</span>
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
          اسم المحافظة
        </h3>
      </div>
      <Input
        className="w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="اسم المحافظة"
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
          <span> تعديل محافظة</span>
        </div>
      }
      open={open1}
      okButtonProps={{ variant: "outlined", color: "blue" }}
      onOk={() => handleEdit()}
      onCancel={() => { setOpenEditModal(false); emptyFields() }}
      confirmLoading={loading}   // ✅ spinner on OK button
      mask={false}
    >
      <div>
        <h3>
          اسم المحافظة
        </h3>
      </div>
      <Input
        className="w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="اسم المحافظة"
      />
    </Modal>

    {/* Show Modal */}
    <Modal
      title={
        <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
          <span>تفاصيل المحافظة</span>
        </div>
      }
      open={openShowModal}
      onOk={() => emptyFields()}
      okButtonProps={{ variant: "outlined", color: "cyan" }}

      onCancel={() => { setOpenShowModal(false); emptyFields() }}
      confirmLoading={loading}   // ✅ spinner on OK button
      mask={false}
    >
      <div>
        <h3>
          اسم المحافظة
        </h3>
      </div>
      <Input
        disabled
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="اسم المحافظة"
      />
      <div>
        <h3>
          المدن
        </h3>
      </div>
      <Dropdown
        menu={{ items: items }}
        trigger={['click']}
      >
        <Button className="px-4 py-2 border rounded w-full" color="cyan" variant="outlined">
          المدن
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
    </div>
    <Table
      style={{ maxWidth: 1100 }}
      pagination={{
        position: ["topRight"],
      }}
      scroll={{ x: "max-content" }}
      columns={columns} dataSource={dataGovernorates} />
  </div>
}
