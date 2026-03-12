"use client";

import { AutoComplete, Button, DatePicker, Input, Modal, SliderSingleProps, Space, Table, TimePickerProps, Upload } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import dayjs from 'dayjs';
import { usePlacesStore } from "../../../../stores/placesStore/data.store";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useUsersStore } from "../../../../stores/usersStore/data.store";
import { ROLE } from "../../../../stores/users-store-interfaces";
import { Eye, EyeClosed } from "lucide-react";
import { ColumnsType } from "antd/es/table";


export default function AssistantsPage() {
    const { getAssistantsData, addAssistant, deleteAssistant, dataAssistants, assistantD } = useUsersStore();
    const { dataGovernorates, getGovernoratesData, getCitiesData, getAreasData, getStreetsData, dataCities, dataAreas, dataStreets } = usePlacesStore()
    const router = useRouter();

    //Add Modal
    const { TextArea } = Input;
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [admin_description, setAdminDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [city_id, setCityId] = useState(1);
    const [governorate_id, setGovernorateId] = useState(1);
    const [area_id, setAreaId] = useState(1);
    const [street_id, setStreetId] = useState(1);
    const [account_status_id, setAccountStatusId] = useState(1);
    const [birth_date, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [sex_id, setSexId] = useState(0);
    const [phone_number, setPhoneNumber] = useState("");
    const [telephone_number, setTelephoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [searchTextAccountStatus, setSearchTextAccountStatus] = useState("");
    const [searchTextSex, setSearchTextSex] = useState("");
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

    const optionsStatus = [
        { value: 1, label: 'منتظر' },
        { value: 2, label: 'مقبول' },
        { value: 3, label: 'تحت المراجعة' },
        { value: 4, label: 'متوقف' },
    ]
    const optionsSex = [
        { value: 1, label: 'ذكر' },
        { value: 2, label: 'أنثى' }]




    //Location Modal 
    const [locationId, setlocationId] = useState(0);
    const [openLocationModal, setOpenLocationModal] = useState(false);
    // const [loading4, setLoading4] = useState(false);
    const [lan, setLan] = useState(0);
    const [lat, setLat] = useState(0);

    //Delete Modal 
    const [delitedID, setDelitedID] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading2, setLoading2] = useState(false);

    //Filter Modal 
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [loading3, setLoading3] = useState(false);

    //showModal
    const openShowModal = (id: number) => {
        router.push(`/assistants/${id}`);
    }

    async function changeOpenModalAdd() {
        await getGovernoratesData();
        setOptionsGovernorates(dataGovernorates?.map(e => { return { value: e.id, label: e.name } }) || []);
        setOpen(true);
    }

    //addAssistant Function
    async function handleAdd() {
        setGovernorateId(governorate_id + 1);
        setAccountStatusId(account_status_id + 1);
        setCityId(city_id + 1)
        setAreaId(area_id + 1)
        setStreetId(street_id + 1)
        await addAssistant({
            first_name: first_name,
            last_name: last_name,
            governorate_id: governorate_id,
            city_id: city_id,
            street_id: street_id,
            area_id: area_id,
            account_status_id: account_status_id,
            birth_date: birth_date,
            admin_description: admin_description,
            sex: sex_id,
            phone_number: phone_number,
            telephone_number: telephone_number,
            email: email,
            role: ROLE.ASSISTANT,
            password: password
        })
        getAssistantsData();
        setBirthDate("");
        setFirstName("");
        setLastName("");
        setTelephoneNumber("");
        setPhoneNumber("");
        setSearchTextAccountStatus("");
        setSearchTextSex("");
        setSearchTextGovernorate("");
        setSearchTextCity("");
        setSearchTextArea("");
        setSearchTextStreet("");
        setAdminDescription("");
        setOpen(false)
    }


    //emptyFields function
    const emptyFields = () => {
        setFirstName("");
        setLastName("");
        setBirthDate("")
        setTelephoneNumber("");
        setPhoneNumber("");
        setSearchTextAccountStatus("");
        setSearchTextSex("");
        setSearchTextGovernorate("");
        setSearchTextCity("");
        setSearchTextArea("");
        setSearchTextStreet("");
        setAdminDescription("");
        setOpen(false)
    }

    const marks: SliderSingleProps['marks'] = {
        0: 'سيء جدا',
        1: 'سيء',
        2: 'عادي',
        3: 'مهم',
        5: {
            style: {
                color: '#f50',
            },
            label: <strong>مهم جدا</strong>,
        },
    };

    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }

    //delete 
    async function handleDelete(id: number) {
        setLoading2(true);
        await deleteAssistant(id);
        getAssistantsData();
        setLoading2(false);
        setOpenDeleteModal(false);
    }


    //location 
    async function OpenLocationModal(id: number) {
        const assistant = dataAssistants.find(e => e.id == id)
        console.log(assistant)
        console.log(id)
        setLan(Number(assistant?.lan));
        setLat(Number(assistant?.lat));
        // setLoading4(true);
        setOpenLocationModal(true);
    }


    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataAssistants ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "المشرفين");
        XLSX.writeFile(workbook, "المشرفين.xlsx");
    };
    useEffect(() => { getAssistantsData(); }, []);

    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            fixed: 'left',
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "الاسم",
            dataIndex: "first_name",
            sorter: (a: any, b: any) => a.first_name.localeCompare(b.first_name),
        },
        {
            title: "اسم العائلة",
            dataIndex: "last_name",
            sorter: (a: any, b: any) => a.last_name.localeCompare(b.last_name),
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
            title: "رقم الهاتف",
            dataIndex: "phone_number"
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
                        type="primary"
                        variant="outlined"
                        onClick={() => { OpenLocationModal(record.id); }}
                    >
                        Location
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
                        onClick={() => openShowModal(record.id)}
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
                    <span> إضافة طبيب</span>
                </div>
            }
            open={open}
            onOk={() => { handleAdd(); }}
            okButtonProps={{ variant: "outlined", color: "purple" }}
            onCancel={() => emptyFields()}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        الاسم الأول :
                    </h3>
                    <Input
                        className="w-full"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder=" الاسم الأول "
                    />
                </div>
                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        الاسم الثاني :
                    </h3>
                    <Input
                        className="w-full"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder=" الاسم الثاني "
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

                <div className="col-span-12 xl:col-span-6">
                    <h3>
                        البريد   :
                    </h3>
                    <Input
                        className="w-full"
                        value={email}
                        type={"email"}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="البريد"
                    />
                </div>


                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        كلمة السر   :
                    </h3>
                    <Input.Password
                        placeholder="كلمة السر"
                        className="w-full"
                        value={password}

                        onChange={(e) => setPassword(e.target.value)}
                        iconRender={(visible) => (visible ? <Eye /> : <EyeClosed />)}
                    />

                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        تاريخ الولادة  :
                    </h3>
                    <DatePicker className="w-full"
                        value={birth_date}
                        onChange={(e) => setBirthDate(e)}
                        placeholder="تاريخ الولادة " />
                </div>


                <div className="col-span-6 xl:col-span-3">
                    <div>
                        <h3>
                            الجنس :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsSex}
                        placeholder="الجنس"
                        // what user sees & types
                        value={searchTextSex}
                        // typing updates text
                        onChange={(text) => {
                            setSearchTextSex(text);
                            setSexId(undefined); // clear ID while typing
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            setSexId(option.value);                 // ID
                            setSearchTextSex(option?.label as string);  // show name
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
                            حالة الحساب :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsStatus}
                        placeholder="حالة الحساب"
                        // what user sees & types
                        value={searchTextAccountStatus}
                        // typing updates text
                        onChange={(text) => {
                            setSearchTextAccountStatus(text);
                            setAccountStatusId(undefined); // clear ID while typing
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {

                            setAccountStatusId(option.value);                 // ID
                            setSearchTextAccountStatus(option?.label as string);

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

            </div>
        </Modal>


        {/*Delete Modal*/}
        <Modal
            title="تعديل حالة الحساب"
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
            style={{ maxWidth: 1100 }}
            pagination={{
                position: ["topRight"],
            }}
            scroll={{ x: "max-content" }}
            columns={columns}
            dataSource={dataAssistants || []} />
    </div>
}
