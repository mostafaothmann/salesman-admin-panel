"use client";

import { AutoComplete, Button, DatePicker, Divider, Input, InputNumber, Modal, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { usePlacesStore } from "../../../../stores/placesStore/data.store";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useUsersStore } from "../../../../stores/usersStore/data.store";
import { ROLE } from "../../../../stores/users-store-interfaces";
import { Eye, EyeClosed } from "lucide-react";
import type { ColumnsType } from "antd/es/table";


export default function SalesmansPage() {
    const { getSalesmansData, total, filter_total, filteredDataSalesmans,
        getFilteredDataSalesmans, dataSalesmans, deleteSalesman, addSalesman,
    } = useUsersStore();
    const { dataGovernorates, getGovernoratesData, getCitiesData, getAreasData, getStreetsData,
        dataCities, dataAreas, dataStreets } = usePlacesStore()
    const router = useRouter();

    const Map = dynamic(
        () => import("../../../../sharedComponents/maps/map/Map"),
        { ssr: false }
    );

    //table constants
    const [page, setPage] = useState(1)
    const [filter_page, setFilterPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [pageSize, setPageSize] = useState(10)

    const [filtered, setFiltered] = useState(false)
    //Add Modal
    const { TextArea } = Input;
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [admin_description, setAdminDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [leader_id, setLeaderId] = useState(null);
    const [account_status_id, setAccountStatusId] = useState(1);
    const [account_type_id, setAccountTypeId] = useState(1);
    const [city_id, setCityId] = useState(1);
    const [governorate_id, setGovernorateId] = useState(1);
    const [area_id, setAreaId] = useState(1);
    const [street_id, setStreetId] = useState(1);
    const [level, setLevel] = useState(0);
    const [birth_date, setBirthDate] = useState("");
    const [sex_id, setSexId] = useState(0);
    const [phone_number, setPhoneNumber] = useState("");
    const [telephone_number, setTelephoneNumber] = useState("");
    const [searchTextSex, setSearchTextSex] = useState("");
    const [searchTextGovernorate, setSearchTextGovernorate] = useState("");
    const [searchTextCity, setSearchTextCity] = useState("");
    const [searchTextArea, setSearchTextArea] = useState("");
    const [searchTextStreet, setSearchTextStreet] = useState("");
    const [searchTextAccountStatus, setSearchTextAccountStatus] = useState("");
    const [searchTextLeader, setSearchTextLeader] = useState("");
    const [searchTextAccountType, setSearchTextAccountType] = useState("");


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    //for AddingModal 
    const [optionsGovernorates, setOptionsGovernorates] = useState(dataGovernorates?.map(e => { return { value: e.id, label: e.name } }) || []);
    const [optionsCities, setOptionsCities] = useState([])
    const [optionsAreas, setOptionsAreas] = useState([])
    const area = dataAreas?.find(
        item => item.id === area_id)
    const [optionsStreets, setOptionsStreets] = useState([])

    const [optionsLeaders, setOptionsLeaders] = useState(dataSalesmans?.map(e => { return { value: e.id, label: `${e.first_name} ${e.last_name}` } }) || []);

    const optionsSex = [
        { value: 0, label: 'غير معروف' },
        { value: 1, label: 'ذكر' },
        { value: 2, label: 'أنثى' }]

    const optionsStatus = [
        { value: 1, label: 'منتظر' },
        { value: 2, label: 'مقبول' },
        { value: 3, label: 'تحت المراجعة' },
        { value: 4, label: 'متوقف' },
    ]

    const optionsAccountType = [
        { value: 1, label: 'علمي' },
        { value: 2, label: 'تجاري' },
        { value: 3, label: "علمي تجاري" },
    ]



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
        router.push(`/pharmacis/${id}`);
    }

    async function changeOpenModalAdd() {
        await getGovernoratesData();
        await getSalesmansData(page, limit);

        setOptionsLeaders(dataSalesmans?.map(e => { return { value: e.id, label: `${e.first_name} ${e.last_name}` } }))
        setOptionsGovernorates(dataGovernorates?.map(e => { return { value: e.id, label: e.name } }) || []);
        setOpen(true);
    }

    //addDoctor Function
    async function handleAdd() {
        setGovernorateId(governorate_id + 1);
        setCityId(city_id + 1)
        setAreaId(area_id + 1)
        setStreetId(street_id + 1)
        await addSalesman({
            first_name: first_name,
            level: level,
            password: password,
            email: email,
            leader_id: leader_id,
            last_name: last_name,
            birth_date: birth_date,
            admin_description: admin_description,
            account_status_id: account_status_id,
            account_type_id: account_type_id,
            sex: sex_id,
            phone_number: phone_number,
            telephone_number: telephone_number,
            role: ROLE.SALESMAN,
            governorate_id: governorate_id,
            city_id: city_id,
            street_id: street_id,
            area_id: area_id,
        })
        getSalesmansData(page, limit);
        setBirthDate("");
        setFirstName("");
        setSexId(0);
        setLastName("");
        setAccountTypeId(null)
        setTelephoneNumber("");
        setPhoneNumber("");
        setSearchTextSex("");
        setSearchTextGovernorate("");
        setSearchTextAccountType("");
        setSearchTextAccountStatus("");
        setSearchTextArea("");
        setSearchTextStreet("");
        setAdminDescription("");
        setSearchTextLeader("");
        setLeaderId(null)
        setOpen(false)
    }


    //emptyFields function
    const emptyFields = () => {
        setFirstName("");
        setLastName("");
        setBirthDate("")
        setTelephoneNumber("");
        setPhoneNumber("");
        setSearchTextSex("");
        setSearchTextGovernorate("");
        setSearchTextCity("");
        setSearchTextArea("");
        setSearchTextStreet("");
        setAdminDescription("");
        setSearchTextAccountStatus("");
        setAccountTypeId(0);
        setFilterMinTime(-1);
        setFilterMaxTime(31);
        setAccountStatusId(0);
        setFilterAccountStatusId(0);
        setFilterAccountTypeId(0);
        setOpen(false);
    }

    //Filter Modal 
    const [filter_first_name, setFilterFirstName] = useState("")
    const [filter_last_name, setFilterLastName] = useState("")
    const [filter_governorate_id, setFilterGovernorateId] = useState(0)
    const [filter_city_id, setFilterCityId] = useState(0)
    const [filter_area_id, setFilterAreaId] = useState(0)
    const [filter_street_id, setFilterStreetId] = useState(0)
    const [filter_account_status_id, setFilterAccountStatusId] = useState(0)
    const [filter_account_type_id, setFilterAccountTypeId] = useState(0)
    const [filter_max_time, setFilterMaxTime] = useState(31)
    const [filter_min_time, setFilterMinTime] = useState(-1)


    const OpenFilterModal = () => {
        if (!filtered) {
            //  getSpecializationsData();
            getGovernoratesData();
            setOptionsGovernorates(dataGovernorates?.map(e => { return { value: e.id, label: e.name } }) || []);
            setOptionsLeaders(dataSalesmans?.map(e => { return { value: e.id, label: `${e.first_name} ${e.last_name}` } }))
            setOpenFilterModal(true);
        }
        else {
            setFiltered(false);
        }
    }
    const getFilteredData = (page: number, limit: number) => {
        getFilteredDataSalesmans({
            filter_first_name,
            filter_last_name,
            page,
            limit,
            filter_governorate_id: governorate_id,
            filter_area_id: area_id,
            filter_city_id: city_id,
            filter_street_id: street_id,
            filter_account_status_id,
            filter_account_type_id,
            filter_min_time,
            filter_max_time,
        })
        setFiltered(true);
    }
    const handleFilter = () => {
        getFilteredData(page, limit);
        setOpenFilterModal(false)
    }
    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }

    //delete 
    async function handleDelete(id: number) {
        setLoading2(true);
        await deleteSalesman(id);
        getSalesmansData(page, limit);
        setLoading2(false);
        setOpenDeleteModal(false);
    }


    //location 
    async function OpenLocationModal(id: number) {
        const salesman = dataSalesmans?.find(e => e.id == id)
        console.log(salesman)
        console.log(id)
        setLan(Number(salesman?.lan));
        setLat(Number(salesman?.lat));
        // setLoading4(true);
        setOpenLocationModal(true);
    }


    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataSalesmans ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "المندوبين");
        XLSX.writeFile(workbook, "المندوبين.xlsx");
    };
    useEffect(() => { getSalesmansData(page, limit); console.log("dataSalesmans  : ", dataSalesmans) }, []);

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
            title: 'العضوية',
            dataIndex: "leader_id",
            sorter: (a: any, b: any) => Number(a.leader_id) - Number(b.leader_id),
            render: (value: number) => {
                const salesman = dataSalesmans?.find(e => e.id === Number(value));
                const isSalesman = value != null;

                if (!salesman && isSalesman) return null;

                return (
                    <Tag color={isSalesman ? "#592C46" : "#01B9B0"}>
                        {isSalesman ? "مندوب مبيعات" : "مشرف مبيعات"}
                        {isSalesman && (
                            <>
                                <Divider type="horizontal" style={{ borderColor: "white", margin: "0 5px" }} />
                                قائده {salesman?.first_name} {salesman?.last_name}
                            </>
                        )}
                    </Tag>
                );
            }
        },
        {
            title: 'نوع الحساب',
            dataIndex: "account_type_id",
            sorter: (a: any, b: any) => Number(a.account_status_id) - Number(b.account_status_id),
            render: (value: number) => {
                let tagColor = "#01B9B0";
                let mainLabel = "";
                console.log(value)
                switch (value) {
                    case 1:
                        tagColor = "#355872";
                        mainLabel = "علمي";
                        break;
                    case 2:
                        tagColor = "#1C0770";
                        mainLabel = "تجاري";
                        break;
                    case 3:
                        tagColor = "#FF5A5A";
                        mainLabel = "علمي تجاري";
                        break;
                    default:
                        tagColor = "#d9d9d9";
                        mainLabel = "غير معروف";
                }

                return (
                    <Tag color={tagColor}>
                        {mainLabel}
                    </Tag>
                );
            }
        },
        {
            title: 'حالة الحساب',
            dataIndex: "account_status_id",
            sorter: (a: any, b: any) => Number(a.account_status_id) - Number(b.account_status_id),
            render: (value: number) => {
                let tagColor = "#01B9B0";
                let mainLabel = "مشرف مبيعات";
                let showLeader = false;
                switch (value) {
                    case 1:
                        tagColor = "#01B9B0";
                        mainLabel = "منتظر";
                        break;
                    case 2:
                        tagColor = "#196A0B";
                        mainLabel = "مقبول";
                        break;
                    case 3:
                        tagColor = "#FF9800";
                        mainLabel = "تحت المراجعة";
                        break;
                    case 4:
                        tagColor = "#650304";
                        mainLabel = "متوقف";
                        break;
                    // add more cases here
                    default:
                        tagColor = "#d9d9d9";
                        mainLabel = "غير معروف";
                }

                return (
                    <Tag color={tagColor}>
                        {mainLabel}
                    </Tag>
                );
            }
        },
        {
            title: "تاريخ الإضافة",
            dataIndex: "created_at",
            sorter: (a: any, b: any) => a?.created_at.localeCompare(b?.created_at),
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
            key: "id",
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
        {/*Adding Modal*/}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#592C46]">
                    <span> إضافة مندوب</span>
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


                <div className="col-span-6 xl:col-span-6">
                    <div>
                        <h3>
                            الجنس :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsSex}
                        placeholder="الجنس"
                        value={searchTextSex}

                        onChange={(text) => {
                            setSearchTextSex(text);
                            setSexId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setSexId(option.value);
                            setSearchTextSex(option?.label as string);
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>

                <div className="col-span-6 xl:col-span-4">
                    <div>
                        <h3>
                            قائد الفريق :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsLeaders}
                        placeholder="قائد الفريق"
                        value={searchTextLeader}

                        onChange={(text) => {
                            setSearchTextLeader(text);
                            setLeaderId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setLeaderId(option.value);
                            setSearchTextLeader(option?.label as string);
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>



                <div className="col-span-6 xl:col-span-4">
                    <div>
                        <h3>
                            حالة الحساب :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsStatus}
                        placeholder="حالة الحساب"
                        value={searchTextAccountStatus}

                        onChange={(text) => {
                            setSearchTextAccountStatus(text);
                            setAccountStatusId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {

                            setAccountStatusId(option.value);
                            setSearchTextAccountStatus(option?.label as string);

                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>

                <div className="col-span-6 xl:col-span-4">
                    <div>
                        <h3>
                            نوع الحساب :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsAccountType}
                        placeholder="نوع الحساب "
                        value={searchTextAccountType}

                        onChange={(text) => {
                            setSearchTextAccountType(text);
                            setAccountTypeId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setAccountTypeId(option.value);
                            setSearchTextAccountType(option?.label as string);
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
                        value={searchTextGovernorate}

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
                        onSelect={(value, option) => {
                            getCitiesData()
                            setGovernorateId(option.value);
                            setSearchTextGovernorate(option?.label as string);
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
                        value={searchTextCity}

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
                        onSelect={(value, option) => {
                            getAreasData()
                            setCityId(option.value);
                            setSearchTextCity(option?.label as string);
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
                        value={searchTextArea}

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
                        onSelect={(value, option) => {
                            getStreetsData()
                            setAreaId(option.value);
                            setSearchTextArea(option?.label as string);
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
                        value={searchTextStreet}

                        onChange={(text) => {
                            setSearchTextStreet(text);
                            setStreetId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setStreetId(option.value);
                            setSearchTextStreet(option?.label as string);
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


        {/*Location Modal*/}
        <Modal
            title="الموقع"
            open={openLocationModal}
            onOk={() => setOpenLocationModal(false)}
            onCancel={() => setOpenLocationModal(false)}
            // confirmLoading={loading4}
            mask={false}
            okButtonProps={{ type: "primary", variant: "outlined" }}
        >
            <Map lan={lan} lat={lat}></Map>
        </Modal>


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

            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6 xl:col-span-4">
                    <h3>
                        الاسم الأول :
                    </h3>
                    <Input
                        className="w-full"
                        value={filter_first_name}
                        onChange={(e) => setFilterFirstName(e.target.value)}
                        placeholder=" الاسم الأول "
                    />
                </div>
                <div className="col-span-6 xl:col-span-4">
                    <h3>
                        الاسم الثاني :
                    </h3>
                    <Input
                        className="w-full"
                        value={filter_last_name}
                        onChange={(e) => setFilterLastName(e.target.value)}
                        placeholder="الاسم الثاني"
                    />
                </div>

                <div className="grid grid-cols-12 gap-2 col-span-12 xl:col-span-12">
                    <div className="col-span-12">
                        <h3>
                            مدة العمل:
                        </h3>
                    </div>
                    <div className="col-span-6 xl:col-span-6">
                        <h3>من :</h3>
                        <InputNumber style={{ width: '100%' }}
                            min={0} max={30} onChange={(e) => setFilterMinTime(e)} />

                    </div>
                    <div className="col-span-6 xl:col-span-6">
                        <h4>إلى :</h4>
                        <InputNumber style={{ width: '100%' }}
                            min={filter_min_time} max={30} onChange={(e) => setFilterMaxTime(e)} />
                    </div>
                </div>


                <div className="col-span-6 xl:col-span-6">
                    <div>
                        <h3>
                            نوع الحساب :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsAccountType}
                        placeholder="نوع الحساب"
                        value={searchTextAccountType}

                        onChange={(text) => {
                            setSearchTextAccountType(text);
                            setFilterAccountTypeId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setFilterAccountTypeId(option.value);
                            setSearchTextAccountType(option?.label as string);
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>


                <div className="col-span-6 xl:col-span-6">
                    <div>
                        <h3>
                            حالة الحساب :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsStatus}
                        placeholder="حالة الحساب"
                        value={searchTextAccountStatus}

                        onChange={(text) => {
                            setSearchTextAccountStatus(text);
                            setFilterAccountStatusId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setFilterAccountStatusId(option.value);
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
                        value={searchTextGovernorate}

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
                        onSelect={(value, option) => {
                            getCitiesData()
                            setGovernorateId(option.value);
                            setSearchTextGovernorate(option?.label as string);
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
                        value={searchTextCity}

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
                        onSelect={(value, option) => {
                            getAreasData()
                            setCityId(option.value);
                            setSearchTextCity(option?.label as string);
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
                        value={searchTextArea}

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
                        onSelect={(value, option) => {
                            getStreetsData()
                            setAreaId(option.value);
                            setSearchTextArea(option?.label as string);
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
                        value={searchTextStreet}

                        onChange={(text) => {
                            setSearchTextStreet(text);
                            setStreetId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setStreetId(option.value);
                            setSearchTextStreet(option?.label as string);
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
        <div className="grid grid-cols-12 gap-4 md:gap-6 w-full">
            <Button className="col-span-4" variant="solid" color="cyan" onClick={() => changeOpenModalAdd()}>
                إضافة
            </Button>
            <Button className="col-span-4" variant="solid" color="purple" onClick={() => OpenFilterModal()}>
                فلترة
            </Button>
            <Button className="col-span-4" variant="solid" color="green" onClick={() => downloadExcel()}>
                تنزيل
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
                dataSource={filteredDataSalesmans || []} />
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
                    dataSource={dataSalesmans || []} />
            }

        </div>

    </div>
}
