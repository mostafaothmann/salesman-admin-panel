"use client";


import { AutoComplete, Button, Dropdown, Input, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { usePlacesStore } from "../../../../stores/placesStore/data.store";
import dynamic from "next/dynamic";
import { ColumnsType } from "antd/es/table";
import { useMedicalStore } from "../../../../stores/medicalStore/data.store";


export default function AssociationsPage() {
    const { getGovernoratesData, dataGovernorates, getCitiesData, dataCities, getAreasData, dataAreas, getStreetsData, dataStreets } = usePlacesStore();
    const { dataAssociations, associationD, getAssociationData, getAssociationsData, editAssociation, deleteAssociation, addAssociation } = useMedicalStore()

    const Map = dynamic(
        () => import("../../../../sharedComponents/maps/map/Map"),
        { ssr: false }
    );

    //Add Modal
    const [name, setName] = useState("");
    const [lan, setLan] = useState(0);
    const [lat, setLat] = useState(0);
    const [openLocationModal, setOpenLocationModal] = useState(false);

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



    //Add Modal
    const { TextArea } = Input;
    const [admin_description, setAdminDescription] = useState("");
    const [salesman_description, setSalesmanDescription] = useState("");

    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("")
    const [city_id, setCityId] = useState(1);
    const [governorate_id, setGovernorateId] = useState(1);
    const [area_id, setAreaId] = useState(1);
    const [street_id, setStreetId] = useState(1);
    const [phone_number, setPhoneNumber] = useState("");
    const [telephone_number, setTelephoneNumber] = useState("");
    const [searchTextGovernorate, setSearchTextGovernorate] = useState("");
    const [searchTextCity, setSearchTextCity] = useState("");
    const [searchTextArea, setSearchTextArea] = useState("");
    const [searchTextStreet, setSearchTextStreet] = useState("");

    //for AddingModal 
    const [optionsGovernorates, setOptionsGovernorates] = useState(dataGovernorates?.map(e => { return { value: e.id, label: e.name } }) || []);
    const [optionsCities, setOptionsCities] = useState([])
    const [optionsAreas, setOptionsAreas] = useState([])
    const area = dataAreas?.find(
        item => item.id === area_id)
    const [optionsStreets, setOptionsStreets] = useState([])

    async function changeOpenModalAdd() {
        emptyFields();
        await getGovernoratesData();
        setOptionsGovernorates(dataGovernorates?.map(e => { return { value: e.id, label: e.name } }) || []);
        setOpen(true);
    }

    //handleEdit
    async function handleEdit() {
        setLoading(true);
        console.log(editedId)
        await editAssociation(editedId, {
            governorate_id, city_id, area_id, street_id, admin_description, salesman_description,
            name, phone_number, telephone_number, country, email
        });
        await getAssociationsData();
        setLoading(false);
        setOpenEditModal(false);
    }


    //addAssociation Function
    async function handleAdd() {
        setGovernorateId(governorate_id + 1);
        setCityId(city_id + 1)
        setAreaId(area_id + 1)
        setStreetId(street_id + 1)
        await addAssociation({
            name: name,
            admin_description: admin_description,
            salesman_description: salesman_description,
            phone_number: phone_number,
            telephone_number: telephone_number,
            governorate_id: governorate_id,
            country: country,
            email: email,
            city_id: city_id,
            street_id: street_id,
            area_id: area_id,
        })

        getAssociationsData();
        setTelephoneNumber("");
        setPhoneNumber("");
        setSearchTextGovernorate("");
        setSearchTextArea("");
        setSearchTextStreet("");
        setAdminDescription("");
        setOpen(false)
    }


    //emptyFields function
    const emptyFields = () => {
        setName("");
        setTelephoneNumber("");
        setPhoneNumber("");
        setSearchTextGovernorate("");
        setSearchTextCity("");
        setSearchTextArea("");
        setSearchTextStreet("");
        setAdminDescription("");
        setSalesmanDescription("")
        setOpen(false);
    }


    //location 
    async function OpenLocationModal(id: number) {
        const salesman = dataAssociations?.find(e => e.id == id)
        console.log(salesman)
        console.log(id)
        setLan(Number(salesman?.lan));
        setLat(Number(salesman?.lat));
        // setLoading4(true);
        setOpenLocationModal(true);
    }













    //editModal
    async function OpenEditModal(id: number) {
        await getAssociationsData()
        setEditedId(id);
        const Association = dataAssociations?.find(
            item => item.id === id
        );
        getGovernoratesData();
        setOptionsGovernorates(dataGovernorates?.map(e => { return { value: e.id, label: e.name } }) || []);
        setSearchTextGovernorate(dataGovernorates?.find(e => e.id == Association?.governorate_id)?.name);
        setSearchTextCity(dataCities?.find(e => e.id == Association?.city_id)?.name)
        setSearchTextArea(dataAreas?.find(e => e.id == Association?.area_id)?.name)
        setSearchTextStreet(dataStreets?.find(e => e.id == Association?.street_id)?.name)
        setName(Association?.name);
        setSalesmanDescription(Association?.salesman_description);
        setAdminDescription(Association?.admin_description);
        setStreetId(Association?.street_id);
        setGovernorateId(Association?.governorate_id);
        setAreaId(Association?.area_id);
        setCityId(Association?.city_id);
        setPhoneNumber(Association?.phone_number);
        setTelephoneNumber(Association?.telephone_number);
        setOpenEditModal(true);
    }
    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }
    //showModal
    const OpenShowModal = (id: number) => {
        const Association = dataAssociations?.find(
            item => item.id === id
        );
        getAssociationData(Association?.id)

        setName(Association?.name)
        setSalesmanDescription(Association?.salesman_description)
        setAdminDescription(Association?.admin_description)
        setStreetId(Association?.street_id);
        setGovernorateId(Association?.governorate_id);
        setAreaId(Association?.area_id);
        setCityId(Association?.city_id)
        setPhoneNumber(Association?.phone_number)
        setTelephoneNumber(Association?.telephone_number)
        setOpenShowModal(true);
    }

    //delete 
    async function handleDelete(id: number) {
        setLoading2(true);
        await deleteAssociation(id);
        getAssociationsData();
        setLoading2(false);
        setOpenDeleteModal(false);
    }

    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataAssociations ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "الجمعيات");
        XLSX.writeFile(workbook, "الجمعيات.xlsx");
    };
    useEffect(() => { getAssociationsData(); }, []);
    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            fixed: 'left',
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "الجمعية",
            dataIndex: "name",
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },

        {
            title: "المدينة",
            dataIndex: "city_id",
            sorter: (a: any, b: any) => Number(a.city_id) - Number(b.city_id),
            render: (value: number) => {
                return dataCities?.find(e => e.id == Number(value))?.name;
            }
        },

        {
            title: "المنطقة",
            dataIndex: "area_id",
            sorter: (a: any, b: any) => Number(a.area_id) - Number(b.area_id),
            render: (value: number) => {
                return dataAreas?.find(e => e.id == Number(value))?.name;
            }
        },
        {
            title: "الشارع",
            dataIndex: "street_id",
            sorter: (a: any, b: any) => Number(a.street_id) - Number(b.street_id),
            render: (value: number) => {
                return dataStreets?.find(e => e.id == Number(value))?.name;
            }
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
                        color="blue"
                        variant="outlined"
                        onClick={() => { OpenLocationModal(record.id); }}
                    >
                        Location
                    </Button>
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
        },
        {
            title: "",
            fixed: 'right',
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
        <Button variant="solid" color="purple" onClick={() => downloadExcel()}>
            تنزيل
        </Button>

        {/*Adding Modal*/}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#592C46]">
                    <span> إضافة جمعية</span>
                </div>
            }
            open={open}
            onOk={() => handleAdd()}
            okButtonProps={{ variant: "outlined", color: "purple" }}
            onCancel={() => emptyFields()}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-2">

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        اسم الجمعية
                    </h3>
                    <Input
                        className="w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="اسم الجمعية"
                    />
                </div>


                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        رقم الهاتف  :
                    </h3>
                    <Input
                        className="w-full"
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="رقم الهاتف"
                    />
                </div>



                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        رقم الأرضي  :
                    </h3>
                    <Input
                        className="w-full"
                        value={telephone_number}
                        onChange={(e) => setTelephoneNumber(e.target.value)}
                        placeholder="  رقم الأرضي "
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                </div>


                <div className="col-span-6 xl:col-span-3">
                    <div>
                        <h3>
                            المحافظة :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsGovernorates}
                        placeholder="المحافظة"
                        // what user sees & types
                        value={searchTextGovernorate}
                        // typing updates text
                        onChange={(text) => {
                            getCitiesData()
                            setSearchTextGovernorate(text);
                            setSearchTextCity("");
                            setSearchTextArea("");
                            setSearchTextStreet("");
                            setGovernorateId(undefined); // clear ID while typing
                            setCityId(undefined); // clear ID while typing
                            setAreaId(undefined); // clear ID while typing
                            setStreetId(undefined); // clear ID while typing
                            const governorate = dataGovernorates?.find(
                                item => item.id === governorate_id)
                            setOptionsCities(governorate?.cities?.map(e => { return { value: e.id, label: e.name } }) || [])
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            getCitiesData()
                            setGovernorateId(option.value);                 // ID
                            setSearchTextGovernorate(option?.label as string);  // show name
                            const governorate = dataGovernorates?.find(
                                item => item.id === governorate_id)
                            setOptionsCities(governorate?.cities?.map(e => { return { value: e.id, label: e.name } }) || [])
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>

                <div className="col-span-6 xl:col-span-3">
                    <div>
                        <h3>
                            المدينة :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsCities}
                        placeholder="المدينة"
                        // what user sees & types
                        value={searchTextCity}
                        // typing updates text
                        onChange={(text) => {
                            getAreasData()
                            setSearchTextCity(text);
                            setSearchTextArea("");
                            setSearchTextStreet("");
                            setCityId(undefined); // clear ID while typing
                            setAreaId(undefined); // clear ID while typing
                            setStreetId(undefined); // clear ID while typing
                            const city = dataCities?.find(
                                item => item.id === city_id)
                            setOptionsAreas(city?.areas?.map(e => { return { value: e.id, label: e.name } }) || [])
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            getAreasData()
                            setCityId(option.value);                 // ID
                            setSearchTextCity(option?.label as string);  // show name
                            const city = dataCities?.find(
                                item => item.id === city_id)
                            setOptionsAreas(city?.areas?.map(e => { return { value: e.id, label: e.name } }) || [])

                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>

                <div className="col-span-6 xl:col-span-3">
                    <div>
                        <h3>
                            المنطقة :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsAreas}
                        placeholder="المنطقة"
                        // what user sees & types
                        value={searchTextArea}
                        // typing updates text
                        onChange={(text) => {
                            getStreetsData()
                            setSearchTextArea(text);
                            setSearchTextStreet("");
                            setAreaId(undefined); // clear ID while typing
                            setStreetId(undefined); // clear ID while typing
                            const area = dataAreas?.find(
                                item => item.id === area_id)
                            setOptionsStreets(area?.streets?.map(e => { return { value: e.id, label: e.name } }) || [])

                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            getStreetsData()
                            setAreaId(option.value);                 // ID
                            setSearchTextArea(option?.label as string);  // show name
                            const area = dataAreas?.find(
                                item => item.id === area_id)
                            setOptionsStreets(area?.streets?.map(e => { return { value: e.id, label: e.name } }) || [])

                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>

                <div className="col-span-6 xl:col-span-3">
                    <div>
                        <h3>
                            الشارع :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsStreets}
                        placeholder="الشارع"
                        // what user sees & types
                        value={searchTextStreet}
                        // typing updates text
                        onChange={(text) => {
                            setSearchTextStreet(text);
                            setStreetId(undefined); // clear ID while typing
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            setStreetId(option.value);                 // ID
                            setSearchTextStreet(option?.label as string);  // show name
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>


                <div className="col-span-12">
                    <h3>
                        وصف الإدارة :
                    </h3>
                    <TextArea
                        value={admin_description}
                        style={{ maxWidth: '100%' }}
                        onChange={(e) => setAdminDescription(e.target.value)}
                        rows={4}
                        placeholder="وصف الإدارة"
                    />
                </div>

                <div className="col-span-12">
                    <h3>
                        وصف المندوبين :
                    </h3>
                    <TextArea
                        value={salesman_description}
                        style={{ maxWidth: '100%' }}
                        onChange={(e) => setSalesmanDescription(e.target.value)}
                        rows={4}
                        placeholder="وصف المندوبين"
                    />
                </div>
            </div>
        </Modal>



        {/*Location Modal*/}
        <Modal
            title="الموقع"
            open={openLocationModal}
            onOk={() => setOpenLocationModal(false)}
            onCancel={() => setOpenLocationModal(false)}
            // confirmLoading={loading4}
            mask={false}
            okButtonProps={{ type: "primary", variant: "outlined" }} // 🔥 bold & strong
        >
            <div className="w-full h-[400]">
                <Map lan={lan} lat={lat}></Map>

            </div>
        </Modal>


        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span> تعديل جمعية</span>
                </div>
            }
            open={open1}
            okButtonProps={{ variant: "outlined", color: "blue" }}
            onOk={() => handleEdit()}
            onCancel={() => { setOpenEditModal(false); emptyFields() }}
            confirmLoading={loading}   // ✅ spinner on OK button
            mask={false}
        >
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        اسم الجمعية
                    </h3>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="اسم الجمعية"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        رقم الهاتف  :
                    </h3>
                    <Input
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="رقم الهاتف"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        رقم الأرضي  :
                    </h3>
                    <Input
                        onChange={(e) => setTelephoneNumber(e.target.value)}
                        value={telephone_number}
                        placeholder="رقم الأرضي"
                    />
                </div>


                <div className="col-span-6 xl:col-span-3">
                    <div>
                        <h3>
                            المحافظة :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsGovernorates}
                        placeholder="المحافظة"
                        // what user sees & types
                        value={searchTextGovernorate}
                        // typing updates text
                        onChange={(text) => {
                            getCitiesData()
                            setSearchTextGovernorate(text);
                            setSearchTextCity("");
                            setSearchTextArea("");
                            setSearchTextStreet("");
                            setGovernorateId(undefined); // clear ID while typing
                            setCityId(undefined); // clear ID while typing
                            setAreaId(undefined); // clear ID while typing
                            setStreetId(undefined); // clear ID while typing
                            const governorate = dataGovernorates?.find(
                                item => item.id === governorate_id)
                            setOptionsCities(governorate?.cities?.map(e => { return { value: e.id, label: e.name } }) || [])
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            getCitiesData()
                            setGovernorateId(option.value);                 // ID
                            setSearchTextGovernorate(option?.label as string);  // show name
                            const governorate = dataGovernorates?.find(
                                item => item.id === governorate_id)
                            setOptionsCities(governorate?.cities?.map(e => { return { value: e.id, label: e.name } }) || [])
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>

                <div className="col-span-6 xl:col-span-3">
                    <div>
                        <h3>
                            المدينة :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsCities}
                        placeholder="المدينة"
                        // what user sees & types
                        value={searchTextCity}
                        // typing updates text
                        onChange={(text) => {
                            getAreasData()
                            setSearchTextCity(text);
                            setSearchTextArea("");
                            setSearchTextStreet("");
                            setCityId(undefined); // clear ID while typing
                            setAreaId(undefined); // clear ID while typing
                            setStreetId(undefined); // clear ID while typing
                            const city = dataCities?.find(
                                item => item.id === city_id)
                            setOptionsAreas(city?.areas?.map(e => { return { value: e.id, label: e.name } }) || [])
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            getAreasData()
                            setCityId(option.value);                 // ID
                            setSearchTextCity(option?.label as string);  // show name
                            const city = dataCities?.find(
                                item => item.id === city_id)
                            setOptionsAreas(city?.areas?.map(e => { return { value: e.id, label: e.name } }) || [])

                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>

                <div className="col-span-6 xl:col-span-3">
                    <div>
                        <h3>
                            المنطقة :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsAreas}
                        placeholder="المنطقة"
                        // what user sees & types
                        value={searchTextArea}
                        // typing updates text
                        onChange={(text) => {
                            getStreetsData()
                            setSearchTextArea(text);
                            setSearchTextStreet("");
                            setAreaId(undefined); // clear ID while typing
                            setStreetId(undefined); // clear ID while typing
                            const area = dataAreas?.find(
                                item => item.id === area_id)
                            setOptionsStreets(area?.streets?.map(e => { return { value: e.id, label: e.name } }) || [])

                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            getStreetsData()
                            setAreaId(option.value);                 // ID
                            setSearchTextArea(option?.label as string);  // show name
                            const area = dataAreas?.find(
                                item => item.id === area_id)
                            setOptionsStreets(area?.streets?.map(e => { return { value: e.id, label: e.name } }) || [])

                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>

                <div className="col-span-6 xl:col-span-3">
                    <div>
                        <h3>
                            الشارع :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsStreets}
                        placeholder="الشارع"
                        // what user sees & types
                        value={searchTextStreet}
                        // typing updates text
                        onChange={(text) => {
                            setSearchTextStreet(text);
                            setStreetId(undefined); // clear ID while typing
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            setStreetId(option.value);                 // ID
                            setSearchTextStreet(option?.label as string);  // show name
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>

                <div className="col-span-12">
                    <h3>
                        وصف الإدارة :
                    </h3>
                    <TextArea
                        value={admin_description}
                        style={{ maxWidth: '100%' }}
                        onChange={(e) => setAdminDescription(e.target.value)}
                        rows={4}
                        placeholder="وصف الإدارة"
                    />
                </div>

                <div className="col-span-12">
                    <h3>
                        وصف المندوبين :
                    </h3>
                    <TextArea
                        value={salesman_description}
                        style={{ maxWidth: '100%' }}
                        onChange={(e) => setSalesmanDescription(e.target.value)}
                        rows={4}
                        placeholder="وصف المندوبين"
                    />
                </div>
            </div>


        </Modal>

        {/* Show Modal */}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span>تفاصيل الجمعية</span>
                </div>
            }
            open={openShowModal}
            onOk={() => emptyFields()}
            okButtonProps={{ variant: "outlined", color: "cyan" }}

            onCancel={() => { setOpenShowModal(false); emptyFields() }}
            confirmLoading={loading}   // ✅ spinner on OK button
            mask={false}
        >
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        اسم الجمعية
                    </h3>
                    <Input
                        disabled
                        value={associationD?.name}
                        placeholder="اسم الجمعية"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        رقم الهاتف  :
                    </h3>
                    <Input
                        disabled
                        value={associationD?.phone_number}
                        placeholder="رقم الهاتف"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        رقم الأرضي  :
                    </h3>
                    <Input
                        disabled
                        value={associationD?.telephone_number}
                        placeholder="رقم الأرضي"
                    />
                </div>



                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        المحافظة  :
                    </h3>
                    <Input
                        disabled
                        value={dataGovernorates?.find(e => e?.id == associationD?.governorate_id)?.name}
                        placeholder="المحافظة"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        المدينة  :
                    </h3>
                    <Input
                        disabled
                        value={dataCities?.find(e => e?.id == associationD?.city_id)?.name}
                        placeholder="المدينة"
                    />
                </div>


                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        المنطقة  :
                    </h3>
                    <Input
                        disabled
                        value={dataAreas?.find(e => e?.id == associationD?.area_id)?.name}
                        placeholder="المنطقة"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        الشارع  :
                    </h3>
                    <Input
                        disabled
                        value={dataStreets?.find(e => e?.id == associationD?.street_id)?.name}
                        placeholder="الشارع"
                    />
                </div>


                <div className="col-span-12">
                    <h3>
                        وصف الإدارة :
                    </h3>
                    <TextArea
                        disabled
                        value={associationD?.admin_description}
                        onChange={(e) => setAdminDescription(e.target.value)}
                        placeholder="وصف الإدارة"
                    />
                </div>

                <div className="col-span-12">
                    <h3>
                        وصف المندوبين :
                    </h3>
                    <TextArea
                        disabled
                        value={associationD?.salesman_description}
                        onChange={(e) => setSalesmanDescription(e.target.value)}
                        placeholder="وصف المندوبين"
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

        <Button variant="solid" color="purple" onClick={() => changeOpenModalAdd()}>
            إضافة
        </Button>

        <Table
            scroll={{ x: "max-content" }}
            columns={columns} dataSource={dataAssociations}
            pagination={{
                position: ["topRight"],
            }} />
    </div>
}
