"use client";


import { Button, Input, Modal, Space, Table, Tag, Upload } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Company, useCompanyDataStore } from "../../../../stores/companiesStore/data.store";
import { usePlacesStore } from "../../../../stores/placesStore/data.store";


export default function GovernoratesPage() {
  const { dataGovernorates, getGovernoratesData, addGovernotate } = usePlacesStore();

  /*    async function handleActivate(id: number, record: Company) {
         if (record.isActive == 0 || record.isActive == null)
             record.isActive = 1
         else if (record.isActive == 1 || record.isActive == null)
             record.isActive = 0
         await editCompany(id, record);
         getCompaniesData();
     }
  */

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
    },
    {
      title: " Name",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
  ];



  //Add Governorate Modal
  const { TextArea } = Input;
  const [name, setName] = useState("");
  const [id, setId] = useState(0);

  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  //addType function
  async function addGovernorate() {
    await addGovernotate({ name })
    getGovernoratesData();
    setName("")
    setDescription("")
    setOpen(false)
  }

  //emptyFields function
  const emptyFields = () => {
    setName("")
    setDescription("")
    setOpen(false)
  }

  //downloadExcele
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataGovernorates ?? []);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    XLSX.writeFile(workbook, "Companies.xlsx");
  };
  useEffect(() => { getGovernoratesData(); }, []);
  return <div>
    <Button type="primary" onClick={() => downloadExcel()}>
      Download
    </Button>

    {/*Adding Modal*/}
    <Modal
      title="Adding New Type Of Property"
      open={open}
      onOk={() => addGovernorate()}
      onCancel={() => emptyFields()}
      mask={false}
    >
      <div className="grid grid-cols-12 gap-2">
        <div className="grid grid-cols-12 sm:col-span-8  col-span-12 gap-1">
          <div className="col-span-12">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
        </div>
      </div>
    </Modal>

    <Button type="primary" onClick={() => setOpen(true)}>
      Add
    </Button>

    <Table columns={columns} dataSource={dataGovernorates} />
  </div>
}
