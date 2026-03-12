"use client";

import { AutoComplete, Button, DatePicker, Divider, Dropdown, Input, Menu, Modal, Slider, SliderSingleProps, Space, Table, Tag, TimePicker, TimePickerProps, Upload } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useMedicalStore } from "../../../../stores/medicalStore/data.store";
import dayjs from 'dayjs';
import { usePlacesStore } from "../../../../stores/placesStore/data.store";
import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";
import { ColumnsType } from "antd/es/table";


export default function PharmacistsPage() {
    const { getPharmacistData, getPharmacistsData, total, filter_total, filteredDataPharmacisits, getFilteredDataPharmacists, dataPharmacists, pharmacistD, deletePharmacist, addPharmacist, editPharmacist } = useMedicalStore();
    const { dataGovernorates, getGovernoratesData, getCitiesData, getAreasData, getStreetsData, dataCities, dataAreas, dataStreets } = usePlacesStore()
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
    const [salesman_description, setSalesmanDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [city_id, setCityId] = useState(1);
    const [governorate_id, setGovernorateId] = useState(1);
    const [area_id, setAreaId] = useState(1);
    const [street_id, setStreetId] = useState(1);
    const [specialization_id, setSpecializationId] = useState(1);
    const [classificationId, setClassificationId] = useState(1);
    const [loyaltyId, setLoyaltyId] = useState(0);
    const [birth_date, setBirthDate] = useState("");
    const [sex_id, setSexId] = useState(0);
    const [phone_number, setPhoneNumber] = useState("");
    const [telephone_number, setTelephoneNumber] = useState("");
    const [wife_husband_first_name, setWifeHusbandFirstName] = useState("");
    const [wife_husband_last_name, setWifeHusbandLastName] = useState("");
    const [graduation_university, setGraduationUniversity] = useState("");
    const [graduation_country, setGraduationCountry] = useState("");
    const [searchTextSpecilization, setSearchTextSpecilization] = useState("");
    const [searchTextClassification, setSearchTextClassification] = useState("");
    const [searchTextLoyalty, setSearchTextLoyalty] = useState("");
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

    const optionsSex = [
        { value: 1, label: 'ذكر' },
        { value: 2, label: 'أنثى' }]
    const optionsLoyalty = [
        { value: 1, label: 'مخلص جدا' },
        { value: 2, label: 'مخلص' },
        { value: 3, label: 'عادي' },
        { value: 4, label: 'غير مخلص' },
        { value: 5, label: 'سيء جدا' }
    ]
    const optionsClassification = [
        { value: 1, label: 'مهم جدا' },
        { value: 2, label: 'مهم' },
        { value: 3, label: 'عادي' },
        { value: 4, label: 'سيء' },
        { value: 5, label: 'سيء جدا' }]

    const firstStartTime = dayjs('12:08:23', 'HH:mm:ss');
    const firstEndTime = dayjs('12:08:23', 'HH:mm:ss');
    const secondStartTime = dayjs('12:08:23', 'HH:mm:ss');
    const secondEndTime = dayjs('12:08:23', 'HH:mm:ss');
    const favouriteStartTime = dayjs('12:08:23', 'HH:mm:ss');
    const favouriteEndTime = dayjs('12:08:23', 'HH:mm:ss');

    const [first_time_opening, setFirstTimeOpening] = useState(firstStartTime.toString());
    const [first_time_closing, setFirstTimeClosing] = useState(firstEndTime.toString());
    const [second_time_opening, setSecondTimeOpening] = useState(secondStartTime.toString());
    const [second_time_closing, setSecondTimeClosing] = useState(secondEndTime.toString());
    const [favourite_time_opening, setFavouriteTimeOpening] = useState(favouriteStartTime.toString());
    const [favourite_time_closing, setFavouriteTimeClosing] = useState(favouriteEndTime.toString());
    const onChangeFirstTimeOpening: TimePickerProps['onChange'] = (time, timeString) => {
        setFirstTimeOpening(timeString)
    };
    const onChangeFirstTimeClosing: TimePickerProps['onChange'] = (time, timeString) => {
        setFirstTimeClosing(timeString)
    };
    const onChangeSecondTimeOpening: TimePickerProps['onChange'] = (time, timeString) => {
        setSecondTimeOpening(timeString)
    };
    const onChangeSecondTimeClosing: TimePickerProps['onChange'] = (time, timeString) => {
        setSecondTimeClosing(timeString)
    };
    const onChangeFavouriteTimeOpening: TimePickerProps['onChange'] = (time, timeString) => {
        setFavouriteTimeOpening(timeString)
    };
    const onChangeFavouriteTimeClosing: TimePickerProps['onChange'] = (time, timeString) => {
        setFavouriteTimeClosing(timeString)
    };



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
        setOptionsGovernorates(dataGovernorates?.map(e => { return { value: e.id, label: e.name } }) || []);
        setOpen(true);
    }

    //addDoctor Function
    async function handleAdd() {
        setGovernorateId(governorate_id + 1);
        setSpecializationId(specialization_id + 1);
        setCityId(city_id + 1)
        setAreaId(area_id + 1)
        setStreetId(street_id + 1)
        await addPharmacist({
            first_name: first_name,
            last_name: last_name,
            favourite_time_opening: favourite_time_opening,
            favourite_time_closing: favourite_time_closing,
            first_work_time_opening: first_time_opening,
            first_work_time_closing: first_time_closing,
            second_work_time_opening: second_time_opening,
            second_work_time_closing: second_time_closing,
            governorate_id: governorate_id,
            city_id: city_id,
            street_id: street_id,
            area_id: area_id,
            graduation_country: graduation_country,
            graduation_university: graduation_university,
            birth_date: birth_date,
            classification: classificationId,
            loyalty: loyaltyId,
            admin_description: admin_description,
            salesman_description: salesman_description,
            sex: sex_id,
            wife_husband_first_name: wife_husband_first_name,
            wife_husband_last_name: wife_husband_first_name,
            phone_number: phone_number,
            telephone_number: telephone_number
        })
        getPharmacistsData(page, limit);
        setBirthDate("");
        setFirstName("");
        setLastName("");
        setGraduationUniversity("");
        setWifeHusbandFirstName("");
        setWifeHusbandLastName("");
        setTelephoneNumber("");
        setPhoneNumber("");
        setSearchTextSpecilization("");
        setSearchTextLoyalty("");
        setSearchTextClassification("");
        setSearchTextSex("");
        setSearchTextGovernorate("");
        setSearchTextCity("");
        setSearchTextArea("");
        setSearchTextStreet("");
        setAdminDescription("");
        setSalesmanDescription("");
        setOpen(false)
    }


    //emptyFields function
    const emptyFields = () => {
        setFirstName("");
        setLastName("");
        setBirthDate("")
        setGraduationUniversity("");
        setWifeHusbandFirstName("")
        setWifeHusbandLastName("")
        setTelephoneNumber("");
        setPhoneNumber("");
        setSearchTextSpecilization("");
        setSearchTextLoyalty("");
        setSearchTextClassification("");
        setSearchTextSex("");
        setSearchTextGovernorate("");
        setSearchTextCity("");
        setSearchTextArea("");
        setSearchTextStreet("");
        setAdminDescription("");
        setSalesmanDescription("");
        setGraduationCountry("");
        setGraduationCountry("")
        setOpen(false)
    }

    //Filter Modal 
    const [filter_first_name, setFilterFirstName] = useState("")
    const [filter_last_name, setFilterLastName] = useState("")
    const [filter_min_age, setFilterMinAge] = useState(-1)
    const [filter_max_age, setFilterMaxAge] = useState(101)
    const [filter_min_classification, setFilterMinClassification] = useState(-1)
    const [filter_max_classification, setFilterMaxClassification] = useState(6)
    const [filter_min_loyalty, setFilterMinLoyalty] = useState(-1)
    const [filter_max_loyalty, setFilterMaxLoyalty] = useState(6)
    const [filter_specialization_id, setFilterSpecializationId] = useState(0)
    const [filter_governorate_id, setFilterGovernorateId] = useState(0)
    const [filter_city_id, setFilterCityId] = useState(0)
    const [filter_area_id, setFilterAreaId] = useState(0)
    const [filter_street_id, setFilterStreetId] = useState(0)
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
    const OpenFilterModal = () => {
        if (!filtered) {
            //  getSpecializationsData();

            // setOptionsSpecializations(dataSpecializations?.map(e => { return { value: e.id, label: e.name } }));
            setOpenFilterModal(true);
        }
        else {
            setFiltered(false);
        }
    }
    const getFilteredData = (page: number, limit: number) => {
        getFilteredDataPharmacists({
            filter_first_name,
            filter_last_name,
            page: 1,
            limit,
            filter_max_age,
            filter_min_age,
            filter_min_classification,
            filter_max_classification,
            filter_min_loyalty,
            filter_max_loyalty,
            filter_governorate_id,
            filter_area_id,
            filter_city_id,
            filter_specialization_id,
            filter_street_id
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
        await deletePharmacist(id);
        getPharmacistsData(page, limit);
        setLoading2(false);
        setOpenDeleteModal(false);
    }


    //location 
    async function OpenLocationModal(id: number) {
        const pharmacist = dataPharmacists?.find(e => e.id == id)
        console.log(pharmacist)
        console.log(id)
        setLan(Number(pharmacist?.lan));
        setLat(Number(pharmacist?.lat));
        // setLoading4(true);
        setOpenLocationModal(true);
    }


    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataPharmacists ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "الأطباء");
        XLSX.writeFile(workbook, "الأطباء.xlsx");
    };
    useEffect(() => { getPharmacistsData(page, limit); }, []);

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
            title: "التصنيف",
            dataIndex: "classification",
            sorter: (a: any, b: any) => Number(a.classification) - Number(b.classification),
            render: (value: number) => {
                return optionsClassification?.find(e => e.value == Number(value))?.label;
            }
        },
        {
            title: "الولاء",
            dataIndex: "loyalty",
            sorter: (a: any, b: any) => Number(a.loyalty) - Number(b.loyalty),
            render: (value: number) => {
                return optionsLoyalty?.find(e => e.value == Number(value))?.label;
            }
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
        }
        ,
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
        <Button variant="solid" color="purple" onClick={() => OpenFilterModal()}>
            فلترة
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
                <div className="col-span-6 xl:col-span-4">
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
                <div className="col-span-6 xl:col-span-4">
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


                <div className="col-span-6 xl:col-span-4">
                    <div>
                        <h3>
                            التصنيف :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsClassification}
                        placeholder="التصنيف"
                        // what user sees & types
                        value={searchTextClassification}
                        // typing updates text
                        onChange={(text) => {
                            setSearchTextClassification(text);
                            setClassificationId(undefined); // clear ID while typing
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            setClassificationId(option.value);                 // ID
                            setSearchTextClassification(option?.label as string);  // show name

                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>

                <div className="col-span-12 xl:col-span-4">
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


                <div className="col-span-12 xl:col-span-4">
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

                <div className="col-span-12 xl:col-span-4">
                    <h3>
                        تاريخ الولادة  :
                    </h3>
                    <DatePicker className="w-full"
                        value={birth_date}
                        onChange={(e) => setBirthDate(e)}
                        placeholder="تاريخ الولادة " />
                </div>


                <div className="col-span-6 xl:col-span-4">
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


                <div className="col-span-6 xl:col-span-4">
                    <div>
                        <h3>
                            الولاء :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsLoyalty}
                        placeholder="الولاء"
                        // what user sees & types
                        value={searchTextLoyalty}
                        // typing updates text
                        onChange={(text) => {
                            setSearchTextLoyalty(text);
                            setLoyaltyId(undefined); // clear ID while typing
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            setLoyaltyId(option.value);                 // ID
                            setSearchTextLoyalty(option?.label as string);  // show name
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>

                <div className="grid grid-cols-12 gap-2 col-span-12 xl:col-span-12">
                    <div className="col-span-12">
                        <h3>
                            موعد الدوام  الأول :
                        </h3>
                    </div>
                    <div className="col-span-6 xl:col-span-6">
                        <h4>من :</h4>
                        <TimePicker className="w-full" use12Hours format="h:mm a" onChange={onChangeFirstTimeOpening} />
                    </div>

                    <div className="col-span-6 xl:col-span-6">
                        <h4>إلى :</h4>
                        <TimePicker className="w-full" use12Hours format="h:mm a" onChange={onChangeFirstTimeClosing} />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-2 col-span-12 xl:col-span-12">
                    <div className="col-span-12">
                        <h3>
                            موعد الدوام  الثاني :
                        </h3>
                    </div>
                    <div className="col-span-6 xl:col-span-6">
                        <h3>من :</h3>
                        <TimePicker className="w-full" use12Hours format="h:mm a" onChange={onChangeSecondTimeOpening} />
                    </div>
                    <div className="col-span-6 xl:col-span-6">
                        <h4>إلى :</h4>
                        <TimePicker className="w-full" use12Hours format="h:mm a" onChange={onChangeSecondTimeClosing} />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-2 col-span-12 xl:col-span-12">
                    <div className="col-span-12">
                        <h3>
                            موعد الزيارة المفضل :
                        </h3>
                    </div>
                    <div className="col-span-6 xl:col-span-6">
                        <h3>من :</h3>
                        <TimePicker className="w-full" use12Hours format="h:mm a" onChange={onChangeFavouriteTimeOpening} />
                    </div>
                    <div className="col-span-6 xl:col-span-6">
                        <h4>إلى :</h4>
                        <TimePicker className="w-full" use12Hours format="h:mm a" onChange={onChangeFavouriteTimeClosing} />
                    </div>
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

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        بلد التخرج:
                    </h3>
                    <Input
                        className="w-full"
                        value={graduation_country}
                        onChange={(e) => setGraduationCountry(e.target.value)}
                        placeholder="بلد التخرج"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        جامعة التخرج:
                    </h3>
                    <Input
                        className="w-full"
                        value={graduation_university}
                        onChange={(e) => setGraduationUniversity(e.target.value)}
                        placeholder="جامعة التخرج"
                    />
                </div>


                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        اسم الزوج/الزوجة الأول:
                    </h3>
                    <Input
                        className="w-full"
                        value={wife_husband_first_name}
                        onChange={(e) => setWifeHusbandFirstName(e.target.value)}
                        placeholder="اسم الزوج/الزوجة الأول"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        اسم الزوج/الزوجة الثاني:
                    </h3>
                    <Input
                        className="w-full"
                        value={wife_husband_last_name}
                        onChange={(e) => setWifeHusbandLastName(e.target.value)}
                        placeholder="اسم الزوج/الزوجة الثاني"
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
            <Map lan={lan} lat={lat}></Map>
        </Modal>


        {/*Filter Modal*/}
        <Modal
            title="فلترة النتائج"
            open={openFilterModal}
            onOk={() => handleFilter()}
            onCancel={() => setOpenFilterModal(false)}
            confirmLoading={loading3}
            mask={false}

            okButtonProps={{ type: "primary", variant: "outlined" }} // 🔥 bold & strong
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
                        placeholder=" الاسم الثاني "
                    />
                </div>

                <div className="col-span-12 xl:col-span-12">
                    <div>
                        <h3>
                            التصنيف :
                        </h3>
                    </div>
                    <Slider min={0} max={5} range marks={marks} step={1} defaultValue={[0, 4]} />

                </div>
            </div>
        </Modal>

        <Button variant="solid" color="purple" onClick={() => changeOpenModalAdd()}>
            إضافة
        </Button>
        {filtered ? <Table
            scroll={{ x: "max-content" }}
            columns={columns}
            style={{ maxWidth: 1100 }}
            pagination={{
                position: ["topRight"],
                current: filter_page,
                pageSize: limit,
                total: filter_total,
                onChange: (page, pageSize) => {
                    setFilterPage(filter_page)
                    getFilteredData(filter_page, pageSize)
                    // setPage(lastPage)
                },
            }}
            dataSource={filteredDataPharmacisits || []} />
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
                        getPharmacistsData(page, pageSize);
                        setPage(page)
                        // setPage(lastPage)
                    },
                }}
                dataSource={dataPharmacists || []} />
        }

    </div>
}
