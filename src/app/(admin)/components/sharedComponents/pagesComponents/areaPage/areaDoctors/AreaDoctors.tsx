"use client";

import { AutoComplete, Button, DatePicker, Divider, Dropdown, Input, Menu, Modal, notification, Skeleton, Slider, SliderSingleProps, Space, Table, Tag, TimePicker, TimePickerProps, Upload } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import dayjs from 'dayjs';
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ColumnsType } from "antd/es/table";
import { profileComponent } from "../../../../../../../stores/other-store-interfaces";
import { apiArea, apiDoctor } from "../../../../../../../stores/apis";
import { usePlacesStore } from "../../../../../../../stores/placesStore/data.store";
import { useMedicalStore } from "../../../../../../../stores/medicalStore/data.store";


export default function AreaDoctors({ profile_id }: profileComponent) {
    const { getDoctorsData, filteredDataDoctors, filter_total, total, getFilteredDataDoctors, getSpecializationsData, dataSpecializations } = useMedicalStore();
    const { dataGovernorates, getGovernoratesData, getCitiesData, getAreasData, getStreetsData, dataCities, dataAreas, dataStreets } = usePlacesStore()
    const router = useRouter();
    const Map = dynamic(
        () => import("../../../maps/map/Map"),
        { ssr: false }
    );

    const [doctors, setDoctors] = useState([])
    const fetchDataDoctors = async () => {
        try {
            const res = await apiArea.get(`/doctors/${profile_id}`);
            setDoctors(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        getStreetsData(); getAreasData(); getCitiesData(); getGovernoratesData();
        fetchDataDoctors().finally(() => setPageLoading(false));
    }, [profile_id]);


    //table constants
    const [page, setPage] = useState(1)
    const [filter_page, setFilterPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [filtered, setFiltered] = useState(false)
    //Add Modal

    const [area_id, setAreaId] = useState(1);


    const [searchTextSpecilization, setSearchTextSpecilization] = useState("");
    const [searchTextClassification, setSearchTextClassification] = useState("");
    const [searchTextLoyalty, setSearchTextLoyalty] = useState("");
    const [searchTextSex, setSearchTextSex] = useState("");
    const [searchTextGovernorate, setSearchTextGovernorate] = useState("");
    const [searchTextCity, setSearchTextCity] = useState("");
    const [searchTextArea, setSearchTextArea] = useState("");
    const [searchTextStreet, setSearchTextStreet] = useState("");



    //for AddingModal 
    const [optionsSpecializations, setOptionsSpecializations] = useState(dataSpecializations?.map(e => { return { value: e.id, label: e.name } }));
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

    //Location Modal 
    const [locationId, setlocationId] = useState(0);
    const [openLocationModal, setOpenLocationModal] = useState(false);
    // const [loading4, setLoading4] = useState(false);
    const [lan, setLan] = useState(0);
    const [lat, setLat] = useState(0);

    //Filter Modal 
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [loading3, setLoading3] = useState(false);

    //showModal
    const openShowModal = (id: number) => {
        router.push(`/doctors/${id}`);
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
            getSpecializationsData();
            setOptionsSpecializations(dataSpecializations?.map(e => { return { value: e.id, label: e.name } }));
            setOpenFilterModal(true);
        }
        else {
            setFiltered(false);
        }
    }
    const getFilteredData = (page: number, limit: number) => {
        getFilteredDataDoctors({
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
            //setting the area id as a constant 
            filter_area_id: profile_id,
            filter_city_id,
            filter_specialization_id,
            filter_street_id
        })
        setFiltered(true);
    }
    const handleFilter = () => {
        getFilteredData(filter_page, limit);
        setOpenFilterModal(false)
    }

    //location 
    async function OpenLocationModal(id: number) {
        const doctor = doctors.find(e => e.id == id)
        setLan(Number(doctor?.lan));
        setLat(Number(doctor?.lat));
        // setLoading4(true);
        setOpenLocationModal(true);
    }


    //downloadExcele
    const [allData, setAllData] = useState([])
    const downloadExcel = () => {
        apiArea.get(`/doctors/${profile_id}`)
            .then(res => {
                setAllData(res.data);
                const formattedData = (allData ?? []).map(item => ({
                    "تاريخ الإضافة": item.created_at.slice(0, 10),
                    "البريد": item.email,
                    "الهاتف": item.phone_number,
                    "الأرضي": item.telephone_number,
                    "الولاء": optionsLoyalty?.find(e => e.value == Number(item.loyalty))?.label,
                    "التصنيف": optionsClassification?.find(e => e.value == Number(item.classification))?.label,
                    "الشارع": dataStreets?.find(e => e.id == Number(item.street_id))?.name,
                    "المنطقة": dataAreas?.find(e => e.id == Number(item.area_id))?.name,
                    "المدينة": dataCities?.find(e => e.id == Number(item.city_id))?.name,
                    "المحافظة": dataGovernorates?.find(e => e.id == Number(item.governorate_id))?.name,
                    "الإختصاص": dataSpecializations?.find(e => e.id == Number(item.specialization_id))?.name,
                    "اسم العائلة": item.last_name,
                    "الاسم": item.first_name,
                    "معرف الطبيب": item.id,
                }));
                const worksheet = XLSX.utils.json_to_sheet(formattedData);
                worksheet["!cols"] = [
                    { wch: 15 },
                    { wch: 15 },
                    { wch: 15 },
                    { wch: 10 },
                    { wch: 10 },
                    { wch: 10 },
                    { wch: 10 },
                    { wch: 10 },
                    { wch: 10 },
                    { wch: 10 },
                    { wch: 15 },
                ];
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "أطباء المنطقة");
                XLSX.writeFile(workbook, "أطباء المنطقة.xlsx");
            })
            .catch(err => {
                notification.error({
                    message: "خطأ",
                    description: "حدث خطأ في جلب البيانات",
                    placement: 'bottomLeft'
                });
            });
    };

    const [pageLoading, setPageLoading] = useState(true);


    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            fixed: "left",
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
            title: "الاختصاص",
            dataIndex: "specialization_id",
            sorter: (a: any, b: any) => Number(a.specialization_id) - Number(b.specialization_id),
            render: (value: number) => {
                return dataSpecializations?.find(e => e.id == Number(value))?.name;
            }
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
            key: "id",
            render: (_: any, record: any) => (
                <Space size="middle">


                    <Button
                        type="primary"
                        variant="outlined"
                        onClick={() => { OpenLocationModal(record.id); }}
                    >
                        موقع
                    </Button>

                </Space>
            ),
        },
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
                        عرض
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
            okButtonProps={{ type: "primary", variant: "outlined" }}
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
                        placeholder=" الاسم الثاني "
                    />
                </div>

                <div className="col-span-6 xl:col-span-4">
                    <div>
                        <h3>
                            الاختصاص :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsSpecializations}
                        placeholder="الاختصاص"
                        value={searchTextSpecilization}

                        onChange={(text) => {
                            setSearchTextSpecilization(text);
                            setFilterSpecializationId(undefined);
                        }}
                        onSelect={(value, option) => {
                            setFilterSpecializationId(Number(option.value));
                            setSearchTextSpecilization(option?.label as string);
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
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

        <div className="grid grid-cols-12 gap-4 md:gap-6 w-full">
            <Button className="col-span-4" variant="solid" color="purple" onClick={() => OpenFilterModal()}>
                فلترة
            </Button>
            <Button className="col-span-4" variant="solid" color="green" onClick={() => downloadExcel()}>
                تنزيل
            </Button>
        </div>
        {
            (pageLoading) ? <Skeleton className="h-full w-full" paragraph={{ rows: 10 }} />
                :
                filtered ? <Table
                    scroll={{ x: "max-content" }
                    }
                    columns={columns}
                    style={{ maxWidth: 1100 }}
                    pagination={{
                        position: ["topRight"],
                        current: filter_page,
                        pageSize: limit,
                        total: filter_total,
                        onChange: (filter_page, pageSize) => {
                            setFilterPage(filter_page)
                            getFilteredData(filter_page, pageSize)
                            // setPage(lastPage)
                        },
                    }}
                    dataSource={filteredDataDoctors || []} />
                    :
                    <Table
                        scroll={{ x: "max-content" }}
                        columns={columns}
                        style={{ maxWidth: 1100 }}
                        pagination={{
                            position: ["topRight"],
                            current: page,
                            pageSize: limit,
                            total: total,
                            onChange: (page, pageSize) => {
                                getDoctorsData(page, pageSize);
                                setPage(page)
                                // setPage(lastPage)
                            },
                        }}
                        dataSource={doctors || []} />

        }


    </div>
}
