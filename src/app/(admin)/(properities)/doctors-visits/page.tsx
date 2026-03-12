"use client";

import { AutoComplete, Button, Checkbox, DatePicker, Divider, Image, Input, InputNumber, Modal, Slider, SliderSingleProps, Space, Table, Tag, TimePicker, TimePickerProps } from "antd";
import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { usePlacesStore } from "../../../../stores/placesStore/data.store";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import type { ColumnsType } from "antd/es/table";
import { useMedicalStore } from "../../../../stores/medicalStore/data.store";
import { apiAssistant, apiDoctor, apiPharmacist, apiType, apiSalesman, apiSample, apiBaseGift, apiGiftVisit } from "../../../../stores/apis";
import dayjs from 'dayjs';
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import  html2canvas  from "html2canvas"

export default function DoctorsVisitsPage() {
    const { getDoctorVisitData, doctorVisitD, getDoctorsVisitsData, total, filter_total, filteredDataDoctorsVisits,
        getFilteredDataDoctorsVisits, dataDoctorsVisits, deleteDoctorVisit, addDoctorVisit,
        editDoctorVisit } = useMedicalStore();
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
    const [doctorsNames, setDoctorsNames] = useState([])
    const [salesmansNames, setSalesmansNames] = useState([])
    const [typesNames, setTypesNames] = useState([])
    const [assistantsNames, setAssistantsNames] = useState([])
    const [doctorsSamples, setDoctorsSamples] = useState([])
    const [baseGiftsNames, setBaseGiftsNames] = useState([])
    const [giftsVisits, setGiftsVisits] = useState([])

    //Add Modal
    const { TextArea } = Input;;
    const [open, setOpen] = useState(false);
    const [searchTextGovernorate, setSearchTextGovernorate] = useState("");
    const [searchTextCity, setSearchTextCity] = useState("");
    const [searchTextArea, setSearchTextArea] = useState("");
    const [searchTextStreet, setSearchTextStreet] = useState("");
    const [searchTextVisitStatus, setSearchVisitStatus] = useState("");
    const [searchTextSalesman, setSearchTextSalesman] = useState("");
    const [searchTextDoctor, setSearchTextDoctor] = useState("");
    const [searchTextAssistant, setSearchTextAssistant] = useState("");
    const [searchTextType, setSearchTextType] = useState("");

    //for AddingModal 

    const optionsStatus = [
        { value: 1, label: 'قيد الإنشاء' },
        { value: 2, label: 'تحت المراجعة' },
        { value: 3, label: 'مقبولة' },
        { value: 4, label: 'مرفوضة' }
    ]

    //Location Modal 
    const [locationId, setlocationId] = useState(0);
    const [openLocationModal, setOpenLocationModal] = useState(false);

    // const [loading4, setLoading4] = useState(false);
    const [lan, setLan] = useState(0);
    const [lat, setLat] = useState(0);
    const [doctorLan, setDoctorLan] = useState(0);
    const [doctorLat, setDoctorLat] = useState(0);

    //Show Modal 
    const [shownId, setShownId] = useState(0);
    const [openShowModal, setOpenShowModal] = useState(false);
    const [loading4, setLoading4] = useState(false);


    //Filter Modal 
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [filtered, setFiltered] = useState(false)

    //for FilteringModal 
    const [filter_area_id, setFilterAreaId] = useState(-1);
    const [optionsGovernorates, setOptionsGovernorates] = useState(dataGovernorates?.map(e => { return { value: e.id, label: e.name } }) || []);
    const [optionsCities, setOptionsCities] = useState([])
    const [optionsAreas, setOptionsAreas] = useState([])
    const area = dataAreas?.find(
        item => item.id === filter_area_id)
    const [optionsStreets, setOptionsStreets] = useState([])

    async function changeOpenModalAdd() {
        await getGovernoratesData();
        await getDoctorsVisitsData(page, limit);
        setOpen(true);
    }

    //emptyFields function
    const emptyFields = () => {
        setFilterMinDate("");
        setFilterMaxDate("");
        setFilterTypeId(-1);
        setFilterSalesmanId(-1);
        setFilterDoctorId(-1);
        setFilterVisitStatusId(-1);
        setFilterMinClssification(-1);
        setFilterMaxClssification(6);
        setFilterAssistantId(-1);
        setFilterSpecializationID(-1);
        setOpen(false);
    }

    //Filter Modal 
    const filterMinDate = dayjs('12:08:23', 'HH:mm:ss')
    const filterMaxDate = dayjs('12:08:23', 'HH:mm:ss')

    const [filter_salesman_id, setFilterSalesmanId] = useState(-1)
    const [filter_assistant_id, setFilterAssistantId] = useState(-1)
    const [filter_doctor_id, setFilterDoctorId] = useState(-1)
    const [filter_type_id, setFilterTypeId] = useState(-1)
    const [filter_visit_status_id, setFilterVisitStatusId] = useState(-1)
    const [filter_min_date, setFilterMinDate] = useState(filterMinDate.toString());
    const [filter_max_date, setFilterMaxDate] = useState(filterMaxDate.toString());
    const [filter_min_classification, setFilterMinClssification] = useState(-1);
    const [filter_max_classification, setFilterMaxClssification] = useState(6);
    const [filter_specialization_id, setFilterSpecializationID] = useState(-1)
    const [filter_city_id, setFilterCityId] = useState(-1);
    const [filter_governorate_id, setFilterGovernorateId] = useState(-1);
    const [filter_street_id, setFilterStreetId] = useState(-1);
    const onChangeFilterMinDate: TimePickerProps['onChange'] = (time, timeString) => {
        setFilterMinDate(timeString)
    };
    const onChangeFilterMaxDate: TimePickerProps['onChange'] = (time, timeString) => {
        setFilterMaxDate(timeString)
    };


    //Show Modal Funcs 
    async function OpenShowModal(id: number) {
        setShownId(id);
        await getDoctorVisitData(id);
        console.log(doctorVisitD)
        setOpenShowModal(true);
    }
    async function handleValidation(status: number) {
        await editDoctorVisit(shownId, { ...doctorVisitD, visit_status_id: status })
        getDoctorsVisitsData(page, limit);
        setOpenShowModal(false);
        emptyFields();
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

    const getFilteredData = (page: number, limit: number) => {
        getFilteredDataDoctorsVisits({
            page,
            limit,
            filter_governorate_id: filter_governorate_id,
            filter_area_id: filter_area_id,
            filter_city_id: filter_city_id,
            filter_min_classification,
            filter_max_classification,
            filter_doctor_id,
            filter_specialization_id,
            filter_street_id: filter_street_id,
            filter_visit_status_id,
            filter_min_date,
            filter_max_date,
            filter_assistant_id,
            filter_salesman_id,
            filter_type_id
        })
        setFiltered(true);
    }
    const handleFilter = () => {
        getFilteredData(page, limit);
        setOpenFilterModal(false)
        emptyFields();
    }

    //location Modal
    async function OpenLocationModal(id: number) {
        const doctorVisit = dataDoctorsVisits?.find(e => e.id == id)
        setLan(Number(doctorVisit?.lan));
        setLat(Number(doctorVisit?.lat));
        setDoctorLan(Number(doctorVisit?.doctorLan));
        setDoctorLat(Number(doctorVisit?.doctorLat));
        // setLoading4(true);
        setOpenLocationModal(true);
    }

    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataDoctorsVisits ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "المندوبين");
        XLSX.writeFile(workbook, "المندوبين.xlsx");
    };

    //download Pdf Visit
    const showModalRef = useRef<HTMLDivElement>(null);

    const downloadPDF = async () => {
        if (!showModalRef.current) return;

        const canvas = await html2canvas(showModalRef.current);
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("Visit.pdf");
    };

    //print Pdf Visit
    const handlePrint = useReactToPrint({
        contentRef: showModalRef,
        documentTitle: "زيارة طبيب",
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    salesmanRes,
                    doctorRes,
                    typeRes,
                    assistantRes,
                    samplesRes,
                    baseGiftsRes,
                    giftsVisitsRes
                ] = await Promise.all([
                    apiSalesman.get('/fullname'),
                    apiDoctor.get('/fullname'),
                    apiType.get('/names'),
                    apiAssistant.get('/fullname'),
                    apiSample.get('/all'),
                    apiBaseGift.get('/names'),
                    apiGiftVisit.get('/all')
                ]);
                setSalesmansNames(salesmanRes.data);
                setDoctorsNames(doctorRes.data);
                setTypesNames(typeRes.data);
                setAssistantsNames(assistantRes.data);
                setDoctorsSamples(samplesRes.data);
                setBaseGiftsNames(baseGiftsRes.data);
                setGiftsVisits(giftsVisitsRes.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        getDoctorsVisitsData(page, limit);
        console.log(dataDoctorsVisits)
    }, []);

    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            fixed: 'left',
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: 'الكوبون',
            dataIndex: "photo",
            render: (value: string) => {
                return <Image
                    height={50}
                    width={50}
                    src={value}></Image>
            }
        },
        {
            title: "المندوب",
            dataIndex: "salesman_id",
            sorter: (a: any, b: any) => Number(a.salesmna_id) - Number(b.salesmna_id),
            render: (value: number) => {
                const salesman = salesmansNames?.find(e => e.id == Number(value));
                return `${salesman?.first_name} ${salesman?.last_name}`
            }
        },
        {
            title: "الطبيب",
            dataIndex: "doctor_id",
            sorter: (a: any, b: any) => Number(a.doctor_id) - Number(b.doctor_id),
            render: (value: number) => {
                const doctor = doctorsNames?.find(e => e.id == Number(value));
                return `${doctor?.first_name} ${doctor?.last_name}`
            }
        },
        {
            title: "المشرف الموثق",
            dataIndex: "assistant_id",
            sorter: (a: any, b: any) => Number(a.assistant_id) - Number(b.assistant_id),
            render: (value: number) => {
                const assistant = assistantsNames?.find(e => e.id == Number(value));
                return `${assistant?.first_name} ${assistant?.last_name}`
            }
        },
        {
            title: "صنف الزيارة",
            dataIndex: "type_id",
            sorter: (a: any, b: any) => Number(a.filter_city_id) - Number(b.filter_city_id),
            render: (value: number) => {
                const type = typesNames?.find(e => e.id == Number(value));
                return `${type?.name}`
            }
        },
        {
            title: "تاريخ الزيارة",
            dataIndex: "created_at",
            sorter: (a: any, b: any) => a?.created_at.localeCompare(b?.created_at),
            render: (value: string) => { return value?.slice(0, 10) }
        },
        {
            title: "توقيت الزيارة",
            dataIndex: "created_at",
            sorter: (a: any, b: any) => a?.created_at.localeCompare(b?.created_at),
            render: (value: string) => { return value?.slice(11, 16) }
        },
        {
            title: 'حالة الزيارة',
            dataIndex: "visit_status_id",
            sorter: (a: any, b: any) => Number(a.visit_status_id) - Number(b.visit_status_id),
            render: (value: number) => {
                let tagColor = "#01B9B0";
                let mainLabel = "قيد الإنشاء";
                switch (value) {
                    case 1:
                        tagColor = "#01B9B0";
                        mainLabel = "قيد الإنشاء";
                        break;
                    case 2:
                        tagColor = "#196A0B";
                        mainLabel = "تحت المراجعة";;
                        break;
                    case 3:
                        tagColor = "#FF9800";
                        mainLabel = "مقبولة";
                        break;
                    case 4:
                        tagColor = "#650304";
                        mainLabel = "مرفوضة";
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
            title: "تاريخ اخر مراجعة",
            dataIndex: "created_at",
            sorter: (a: any, b: any) => a?.created_at.localeCompare(b?.created_at),
            render: (value: string) => { return value?.slice(0, 10) }
        },
        {
            title: "",
            render: (_: any, record: any) => (
                <Space size="middle">
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
                        onClick={() => OpenShowModal(record.id)}
                    >
                        Show
                    </Button>
                </Space>
            ),
        }
    ];

    return <div>

        {/*Location Modal*/}
        <Modal
            title="الموقع"
            open={openLocationModal}
            onOk={() => setOpenLocationModal(false)}
            onCancel={() => setOpenLocationModal(false)}
            // confirmLoading={loading4}
            mask={false}
            width={1000}
            height={400}
            okButtonProps={{ type: "primary", variant: "outlined" }} // 🔥 bold & strong
        >
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6 h-[400]">
                    <h3>
                        موقع الطبيب
                    </h3>
                    <Map lan={doctorLan} lat={doctorLat}></Map>
                </div>
                <div className="col-span-12 md:col-span-6 h-[400] ">
                    <h3>
                        موقع الزيارة
                    </h3>
                    <Map lan={lan} lat={lat}></Map>
                </div>
            </div>

        </Modal>


        {/*Filter Modal*/}
        <Modal
            title="فلترة النتائج"
            open={openFilterModal}
            onOk={() => handleFilter()}
            onCancel={() => { setOpenFilterModal(false); emptyFields() }}
            confirmLoading={loading3}
            mask={false}

            okButtonProps={{ type: "primary", variant: "outlined" }} // 🔥 bold & strong
        >
            <div className="grid grid-cols-12 gap-4">

                <div className="col-span-6 xl:col-span-6">
                    <div>
                        <h3>
                            حالة الزيارة :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsStatus}
                        placeholder="حالة الزيارة"
                        // what user sees & types
                        value={searchTextVisitStatus}
                        // typing updates text
                        onChange={(text) => {
                            setSearchVisitStatus(text);
                            setFilterVisitStatusId(undefined); // clear ID while typing
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            setFilterVisitStatusId(option.value);                 // ID
                            setSearchVisitStatus(option?.label as string);
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
                            مندوب الزيارة :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={
                            salesmansNames?.map(e => { return { value: e.id, label: `${e.first_name} ${e.last_name}` } })
                        }
                        placeholder="مندوب الزيارة"
                        // what user sees & types
                        value={searchTextSalesman}
                        // typing updates text
                        onChange={(text) => {
                            setSearchTextSalesman(text);
                            setFilterSalesmanId(undefined); // clear ID while typing
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            setFilterSalesmanId(option.value);                 // ID
                            setSearchTextSalesman(option?.label as string);
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
                            مشرف الزيارة :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={assistantsNames?.map(e => { return { value: e.id, label: `${e.first_name} ${e.last_name}` } })
                        }
                        placeholder="مشرف الزيارة"
                        // what user sees & types
                        value={searchTextAssistant}
                        // typing updates text
                        onChange={(text) => {
                            setSearchTextAssistant(text);
                            setFilterAssistantId(undefined); // clear ID while typing
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            setFilterAssistantId(option.value);                 // ID
                            setSearchTextAssistant(option?.label as string);
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
                            طبيب الزيارة :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={doctorsNames?.map(e => { return { value: e.id, label: `${e.first_name} ${e.last_name}` } })
                        }
                        placeholder="طبيب الزيارة"
                        // what user sees & types
                        value={searchTextDoctor}
                        // typing updates text
                        onChange={(text) => {
                            setSearchTextDoctor(text);
                            setFilterDoctorId(undefined); // clear ID while typing
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            setFilterDoctorId(option.value);                 // ID
                            setSearchTextDoctor(option?.label as string);
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
                            صنف الزيارة :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={typesNames?.map(e => { return { value: e.id, label: `${e.name} ` } })
                        }
                        placeholder="صنف الزيارة"
                        // what user sees & types
                        value={searchTextType}
                        // typing updates text
                        onChange={(text) => {
                            setSearchTextType(text);
                            setFilterTypeId(undefined); // clear ID while typing
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            setFilterTypeId(option.value);                 // ID
                            setSearchTextType(option?.label as string);
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
                            اختصاص الطبيب  :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={
                            salesmansNames?.map(e => { return { value: e.id, label: `${e.first_name} ${e.last_name}` } })
                        }
                        placeholder="اختصاص الطبيب"
                        // what user sees & types
                        value={searchTextSalesman}
                        // typing updates text
                        onChange={(text) => {
                            setSearchTextSalesman(text);
                            setFilterSalesmanId(undefined); // clear ID while typing
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            setFilterSalesmanId(option.value);                 // ID
                            setSearchTextSalesman(option?.label as string);
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
                        تاريخ الزيارة  :
                    </h3>
                </div>
                <div className="col-span-6 xl:col-span-6">
                    <h3>من :</h3>
                    <DatePicker className="w-full" onChange={onChangeFilterMinDate} />
                </div>
                <div className="col-span-6 xl:col-span-6">
                    <h4>إلى :</h4>
                    <DatePicker className="w-full" onChange={onChangeFilterMaxDate} />
                </div>

                <div className="col-span-12 sm:col-span-3">
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
                            setFilterGovernorateId(undefined); // clear ID while typing
                            setFilterCityId(undefined); // clear ID while typing
                            setFilterAreaId(undefined); // clear ID while typing
                            setFilterStreetId(undefined); // clear ID while typing
                            const governorate = dataGovernorates?.find(
                                item => item.id === filter_governorate_id)
                            setOptionsCities(governorate?.cities?.map(e => { return { value: e.id, label: e.name } }) || [])
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            getCitiesData()
                            setFilterGovernorateId(option.value);                 // ID
                            setSearchTextGovernorate(option?.label as string);
                            const governorate = dataGovernorates?.find(
                                item => item.id === filter_governorate_id)
                            setOptionsCities(governorate?.cities?.map(e => { return { value: e.id, label: e.name } }) || [])
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>

                <div className="col-span-12 sm:col-span-3">
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
                            setFilterCityId(undefined); // clear ID while typing
                            setFilterAreaId(undefined); // clear ID while typing
                            setFilterStreetId(undefined); // clear ID while typing
                            const city = dataCities?.find(
                                item => item.id === filter_city_id)
                            setOptionsAreas(city?.areas?.map(e => { return { value: e.id, label: e.name } }) || [])
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            getAreasData()
                            setFilterCityId(option.value);                 // ID
                            setSearchTextCity(option?.label as string);
                            const city = dataCities?.find(
                                item => item.id === filter_city_id)
                            setOptionsAreas(city?.areas?.map(e => { return { value: e.id, label: e.name } }) || [])

                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>

                <div className="col-span-12 sm:col-span-3">
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
                            setFilterAreaId(undefined); // clear ID while typing
                            setFilterStreetId(undefined); // clear ID while typing
                            const area = dataAreas?.find(
                                item => item.id === filter_area_id)
                            setOptionsStreets(area?.streets?.map(e => { return { value: e.id, label: e.name } }) || [])

                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            getStreetsData()
                            setFilterAreaId(option.value);                 // ID
                            setSearchTextArea(option?.label as string);
                            const area = dataAreas?.find(
                                item => item.id === filter_area_id)
                            setOptionsStreets(area?.streets?.map(e => { return { value: e.id, label: e.name } }) || [])

                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>

                <div className="col-span-12 sm:col-span-3">
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
                            setFilterStreetId(undefined); // clear ID while typing
                        }}
                        // when user selects from dropdown
                        onSelect={(value, option) => {
                            setFilterStreetId(option.value);                 // ID
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
        </Modal >


        {/* Show Modal */}
        <Modal
            width={1000}
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span>تفاصيل الزيارة</span>
                </div>
            }
            open={openShowModal}
            onCancel={() => { setOpenShowModal(false); emptyFields() }}
            footer={[
                <Button key="print" variant="solid" color="yellow" onClick={() => { handlePrint(); emptyFields() }}>
                    طباعة
                </Button>,
                <Button key="download" variant="solid" color="red" onClick={() => { downloadPDF(); emptyFields() }}>
                    تنزيل كملف
                </Button>,
                <Button key="accept" variant="solid" color="cyan" onClick={() => handleValidation(3)}>
                    قبول
                </Button>,
                <Button key="reject" variant="solid" color="purple" onClick={() => handleValidation(4)}>
                    رفض
                </Button>,
                <Button key="cancel" variant="solid" color="green" onClick={() => { setOpenShowModal(false); emptyFields() }}>
                    إغلاق
                </Button>
            ]
            }
            confirmLoading={loading4}   // ✅ spinner on OK button
            mask={false}
        >

            <div className="grid grid-cols-12 gap-4" ref={showModalRef}>

                <div className="grid grid-cols-12 gap-2 col-span-12 md:col-span-6">

                    <div className="col-span-12">
                        <Image
                            width={"100%"}
                            height={254}
                            src={doctorVisitD?.photo}></Image>
                    </div>

                    <div className="col-span-12">
                        <h3>
                            ملاحظة الزيارة :
                        </h3>
                        <TextArea
                            disabled
                            value={doctorVisitD?.note}
                            style={{ maxWidth: '100%' }}
                            rows={4}
                            placeholder="ملاحظة الزيارة"
                        />
                    </div>
                    <div className="col-span-12">
                        <h3>
                            عينات الزيارة :
                        </h3>
                        {doctorsSamples?.filter(e => e.visit_id == shownId)?.map(f => {
                            return <div className=" w-[49%] inline-block bg-[#01B9B0]  rounded-[4] p-[8] m-[2]">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-1"></div>
                                    <div className="col-span-10 text-white font-bold">{typesNames.find(e => e.id == f.type_id)?.name}</div>
                                    <div className="col-span-1 text-white font-bold">{f.quantity}</div>
                                </div>
                            </div>
                        })}

                    </div>
                    <div className="col-span-12">
                        <div className="flex">
                            <Checkbox disabled
                                checked={Boolean(doctorVisitD?.is_other_spoken_note)}
                            >
                            </Checkbox>
                            <h4>
                                يوجد ملاحظة مندوب أخرى
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-2 col-span-12 sm:col-span-6 w-full h-full mt-5">

                    <div className="col-span-12 xl:col-span-3 md:col-span-3 sm:col-span-6">
                        <h3>
                            اسم الطبيب :
                        </h3>
                        <Input
                            disabled
                            value={
                                `${(doctorsNames?.find(e => e.id == Number(doctorVisitD?.doctor_id)))?.first_name} ${doctorsNames?.find(e => e.id == Number(doctorVisitD?.doctor_id))?.last_name}`
                            }
                            placeholder="اسم الطبيب"
                        />
                    </div>

                    <div className="col-span-12 md:col-span-3 sm:col-span-6">
                        <h3>
                            اسم المشرف :
                        </h3>
                        <Input
                            disabled
                            value={
                                `${(assistantsNames?.find(e => e.id == Number(doctorVisitD?.assistant_id)))?.first_name} ${assistantsNames?.find(e => e.id == Number(doctorVisitD?.assistant_id))?.last_name}`
                            }
                            placeholder="اسم المشرف"
                        />
                    </div>

                    <div className="col-span-12 md:col-span-3 sm:col-span-6">
                        <h3>
                            اسم المندوب :
                        </h3>
                        <Input
                            disabled
                            value={
                                `${(salesmansNames?.find(e => e.id == Number(doctorVisitD?.salesman_id)))?.first_name} ${salesmansNames?.find(e => e.id == Number(doctorVisitD?.salesman_id))?.last_name}`
                            }
                            placeholder="اسم المندوب"
                        />
                    </div>

                    <div className="col-span-12 md:col-span-3">
                        <h3>
                            صنف الزيارة  :
                        </h3>
                        <Input
                            disabled
                            value={
                                `${(typesNames?.find(e => e.id == Number(doctorVisitD?.type_id)))?.name}`
                            }
                            placeholder="صنف الزيارة"
                        />
                    </div>

                    <div className="col-span-12 xl:col-span-6">
                        <h3>
                            عددالمرضى :
                        </h3>
                        <Input
                            disabled
                            value={
                                `${doctorVisitD?.number_of_patients}`
                            }
                            placeholder="عدد المرضى"
                        />
                    </div>

                    <div className="col-span-12 xl:col-span-6">
                        <h3>
                            أقرب الصيدليات :
                        </h3>
                        <Input
                            disabled
                            value={
                                `${doctorVisitD?.closest_pharmacy}`
                            }
                            placeholder="أقرب الصيدليات"
                        />
                    </div>


                    <div className="col-span-12 xl:col-span-6">
                        <h3>
                            تاريخ الزيارة  :
                        </h3>
                        <Input
                            disabled
                            value={
                                `${doctorVisitD?.created_at?.slice(0, 10)}`
                            }
                            placeholder="تاريخ الزيارة"
                        />
                    </div>

                    <div className="col-span-12 xl:col-span-6">
                        <h3>
                            آخر المراجعة :
                        </h3>
                        <Input
                            disabled
                            value={
                                `${doctorVisitD?.validated_at?.slice(0, 10)}`
                            }
                            placeholder="آخر المراجعة"
                        />
                    </div>


                    <div className="col-span-12">
                        <h3>
                            ملاحظة المشرف :
                        </h3>
                        <TextArea
                            disabled
                            value={doctorVisitD?.note}
                            style={{ maxWidth: '100%' }}
                            rows={4}
                            placeholder="ملاحظة المشرف"
                        />
                    </div>

                    <div className="col-span-12">
                        <h3>
                            هدايا الزيارة :
                        </h3>
                        {giftsVisits?.filter(e => e.visit_id == shownId)?.map(f => {
                            return <div className=" w-[49%] inline-block bg-[#01B9B0]  rounded-[4] p-[8] m-[2]">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-1"></div>
                                    <div className="col-span-10 text-white font-bold">{baseGiftsNames.find(e => e.id == f.base_gift_id)?.name}</div>
                                    <div className="col-span-1 text-white font-bold">{f.quantity}</div>
                                </div>
                            </div>
                        })}

                    </div>

                    <div className="flex col-span-12">
                        <div className="flex">
                            <Checkbox disabled
                                checked={Boolean(doctorVisitD?.is_other_spoken_note)}
                            >
                            </Checkbox>
                            <h4>
                                يوجد ملاحظة مشرف أخرى
                            </h4>
                        </div>
                    </div>
                </div>

            </div>

        </Modal >

        <div className="grid grid-cols-12 gap-4 md:gap-6 w-full">
            <Button className="col-span-5" variant="solid" color="green" onClick={() => downloadExcel()}>
                تنزيل
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
                    placement: ['topEnd'],
                    current: filter_page,
                    pageSize: limit,
                    total: filter_total,
                    onChange: (page, pageSize) => {
                        setFilterPage(filter_page)
                        getFilteredData(page, pageSize)
                        // setPage(lastPage)
                    },
                }}
                dataSource={filteredDataDoctorsVisits || []} />
                :
                <Table
                    scroll={{ x: "max-content" }}
                    style={{ maxWidth: 1100 }}
                    columns={columns}
                    pagination={{
                        placement: ['topEnd'],
                        current: page,
                        pageSize: limit,
                        total: total,
                        onChange: (page, pageSize) => {
                            getDoctorsVisitsData(page, pageSize);
                            setPage(page)
                            //setPage(lastPage)
                        },
                    }}
                    dataSource={dataDoctorsVisits || []} />
            }

        </div>

    </div >
}
