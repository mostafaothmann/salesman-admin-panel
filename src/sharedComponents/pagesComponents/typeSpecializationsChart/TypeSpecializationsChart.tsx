"use client";

import { AutoComplete, Button, Input, Modal } from "antd";
import ButtonGroup from "antd/es/button/ButtonGroup";
import BarChartOne from "../../charts/bar/BarChartOne";
import { useTypeStore } from "../../../stores/typesStore/data.store";
import { useState } from "react";
import { useMedicalStore } from "../../../stores/medicalStore/data.store";

interface profileComponent {
    id: number;
}
export function TypeSpecializationsChart({ id: number }: profileComponent) {
    const { getTypeData, typeD, dataSpecializationForType, getSpecializationForType } = useTypeStore()
    const { dataSpecializations, addSpecializationType, getSpecializationTypesData } = useMedicalStore()


    //Add Modal
    const [type_id, setTypeId] = useState(0);
    const [specialization_id, setSpecializationId] = useState(0);

    const [status, setStatus] = useState("");
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    //Delete Modal 
    const [delitedID, setDelitedID] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading2, setLoading2] = useState(false);

    //Functions

    //addType function
    async function handleAdd() {
        await addSpecializationType({ type_id, specialization_id, status })
        getSpecializationTypesData();
        setSearchText("");
        setSpecializationId(0)
        setTypeId(0)
        setOpen(false)
        setStatus("")
    }
    //emptyFields function
    const emptyFields = () => {
        setSearchText("");
        setSpecializationId(0)
        setTypeId(0)
        setStatus("")
        setOpen(false)
    }

    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }


    //for adding anotehr specialization
    const options = dataSpecializations.map(e => { return { value: e.id, label: e.name } })

    return <div>

        <div className="col-span-12 space-y-6 ">

            <Button variant="solid" color="cyan" onClick={() => setOpen(true)} >إضافة اختصاص</Button>

            <Button type="default" danger>حذف اختصاص</Button>

            {/*Adding Modal*/}

            <BarChartOne
                name={"عدد الأطباء"}
                title={"الاختصاصات"}
                data={dataSpecializationForType?.map(e => { return e.doctor_count })}
                categories={dataSpecializationForType?.map(e => { return e.name })}
            />
            <Modal
                title="إضافة اختصاص جديد"
                open={open}
                onOk={() => handleAdd()}
                okButtonProps={{ variant: "outlined", color: "purple" }}
                onCancel={() => emptyFields()}
                mask={false}
            >
                <div className="md:col-span-6 col-span-12">
                    <AutoComplete
                        style={{ width: 200 }}
                        options={options}
                        placeholder="الاختصاص"

                        // what user sees & types
                        value={searchText}

                        // typing updates text
                        onChange={(text) => {
                            setSearchText(text);
                            setSpecializationId(undefined); // clear ID while typing
                        }}

                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            setSpecializationId(option.value);                 // ID
                            setSearchText(option?.label as string);  // show name
                        }}

                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>
            </Modal>
        </div>
    </div>
}