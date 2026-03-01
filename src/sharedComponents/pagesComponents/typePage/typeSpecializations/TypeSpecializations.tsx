"use client";

import { AutoComplete, Button, Input, Modal } from "antd";
import ButtonGroup from "antd/es/button/ButtonGroup";
import BarChartOne from "../../../charts/bar/BarChartOne";
import { useTypeStore } from "../../../../stores/typesStore/data.store";
import { useEffect, useState } from "react";
import { useMedicalStore } from "../../../../stores/medicalStore/data.store";

interface profileComponent {
    id: number;
}
export function TypeSpecializations({ id }: profileComponent) {
    const { getTypeData, typeD, dataSpecializationForType, getSpecializationForType } = useTypeStore()
    const { dataSpecializations, addSpecializationType, dataSpecializationTypes, deleteSpecializationType, getSpecializationsData, getSpecializationTypesData, deleteSpecialization } = useMedicalStore()
    useEffect(() => { getSpecializationsData() }, [])
    useEffect(() => { getSpecializationForType(id) }, [])

    //Add Modal
    const [type_id, setTypeId] = useState(id);
    const [specialization_id, setSpecializationId] = useState(0);
    const [status, setStatus] = useState("");
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    //Delete Modal 
    const [deleted_id, setDeletedID] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [deleted_specialization_id, setDeletedSpecializationId] = useState(0);

    //Functions
    //addType function
    async function handleAdd() {
        await addSpecializationType({ type_id, specialization_id, status })
        getSpecializationTypesData();
        getSpecializationForType(id);
        setSearchText("");
        setSpecializationId(0)
        setOpen(false)
        setStatus("")
    }

    //emptyFields function
    const emptyFields = () => {
        setDeletedSpecializationId(0)
        setSearchText("");
        setSpecializationId(0)
        setStatus("")
        setOpenDeleteModal(false)
        setOpen(false)
    }

    //deleteModal
    const OpenDeleteModal = () => {
        setOpenDeleteModal(true);
    }
    //delete 
    async function handleDelete() {
        setLoading2(true);
        setDeletedSpecializationId(deleted_specialization_id + 1)
        const found = dataSpecializations?.find(e => e.id === deleted_specialization_id)?.id;
        const deleted = dataSpecializationTypes?.find(e => e.specialization_id == found && e.type_id == id)?.id;
        await deleteSpecializationType(deleted);
        getSpecializationForType(id);
        setLoading2(false);
        emptyFields();
        setOpenDeleteModal(false);
    }

    //for adding anotehr specialization
    const options = dataSpecializations?.map(e => { return { value: e.id, label: e.name } })
    const optionsForDelete = dataSpecializationForType?.map(e => { return { value: e.id, label: e.name } })

    return <div>
        <div className="col-span-12 space-y-6 ">
            <div className="flex col-span-12 xl:col-span-6 ">
                <ButtonGroup>
                    <Button variant="solid" color="cyan" onClick={() => setOpen(true)} >إضافة</Button>

                    <Button type="default" danger onClick={() => OpenDeleteModal()}>حذف</Button>
                </ButtonGroup>
            </div>

            <BarChartOne
                name={"عدد الأطباء"}
                horizontal={false}
                title={"الاختصاصات"}
                data={dataSpecializationForType?.map(e => { return e.doctor_count })}
                categories={dataSpecializationForType?.map(e => { return e.name })}
            />

            {/*Adding Modal*/}

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
                        value={searchText}
                        onChange={(text) => {
                            setSearchText(text);
                            setSpecializationId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setSpecializationId(option.value);           
                            setSearchText(option?.label as string); 
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>
            </Modal>

            {/*Deleting Modal*/}

            <Modal
                title="حذف اختصاص"
                open={openDeleteModal}
                onOk={() => handleDelete()}
                okButtonProps={{ danger: true }}
                onCancel={() => emptyFields()}
                mask={false}
            >
                <div className="md:col-span-6 col-span-12">
                    <AutoComplete
                        style={{ width: 200 }}
                        options={optionsForDelete}
                        placeholder="الاختصاص"
                        value={searchText}
                        onChange={(text) => {
                            setSearchText(text);
                            setDeletedSpecializationId(undefined); 
                        }}
                        onSelect={(value, option) => {
                            setDeletedSpecializationId(option.value);            
                            setSearchText(option?.label as string);  
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