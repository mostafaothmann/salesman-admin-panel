"use client";

import { AutoComplete, Button, Checkbox, DatePicker, Divider, Image, Input, InputNumber, Modal, Slider, SliderSingleProps, Space, Table, Tag, TimePicker, TimePickerProps } from "antd";
import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { usePlacesStore } from "../../../../stores/placesStore/data.store";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import type { ColumnsType } from "antd/es/table";
import { useMedicalStore } from "../../../../stores/medicalStore/data.store";
import { apiAssistant, apiDoctor, apiPharmacist, apiType, apiSalesman, apiSample, apiBaseGift, apiGiftVisit, apiProduct, apiOffer } from "../../../../stores/apis";
import dayjs from 'dayjs';
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas"
import { useCommercialStore } from "../../../../stores/commercialStore/data.store";

export default function OrdersPage() {
    const { dataOrders, getOrdersData, getOrderData, orderD, editOrder, getFilteredDataOrders, filteredDataOrders, total, filter_total } = useCommercialStore();
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
    const [pharmacistsNames, setPharmacistsNames] = useState([])
    const [salesmansNames, setSalesmansNames] = useState([])
    const [typesNames, setTypesNames] = useState([])
    const [assistantsNames, setAssistantsNames] = useState([])
    const [offers, setOffers] = useState([])
    const [products, setProducts] = useState([])

    //Add Modal
    const { TextArea } = Input;;
    const [open, setOpen] = useState(false);
    const [searchTextGovernorate, setSearchTextGovernorate] = useState("");
    const [searchTextCity, setSearchTextCity] = useState("");
    const [searchTextArea, setSearchTextArea] = useState("");
    const [searchTextStreet, setSearchTextStreet] = useState("");
    const [searchTextVisitStatus, setSearchVisitStatus] = useState("");
    const [searchTextSalesman, setSearchTextSalesman] = useState("");
    const [searchTextPharmacist, setSearchTextPharmacist] = useState("");
    const [searchTextAssistant, setSearchTextAssistant] = useState("");
    const [searchTextType, setSearchTextType] = useState("");

    //for AddingModal 

    const optionsStatus = [
        { value: 1, label: 'قيد الإنشاء' },
        { value: 2, label: 'تحت المراجعة' },
        { value: 3, label: 'مقبولة' },
        { value: 4, label: 'مرفوضة' }
    ]


    // const [loading4, setLoading4] = useState(false);
    const [lan, setLan] = useState(0);
    const [lat, setLat] = useState(0);

    //Show Modal 
    const [shownId, setShownId] = useState(0);
    const [openShowModal, setOpenShowModal] = useState(false);
    const [loading4, setLoading4] = useState(false);


    //Filter Modal 
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [filtered, setFiltered] = useState(false)

    //for FilteringModal 
    const [optionsGovernorates, setOptionsGovernorates] = useState(dataGovernorates?.map(e => { return { value: e.id, label: e.name } }) || []);
    const [optionsCities, setOptionsCities] = useState([])
    const [optionsAreas, setOptionsAreas] = useState([])
    const [filter_area_id, setFilterAreaId] = useState(-1);

    const area = dataAreas?.find(
        item => item.id === filter_area_id)
    const [optionsStreets, setOptionsStreets] = useState([])

    async function changeOpenModalAdd() {
        await getOrdersData(page, limit);
        setOpen(true);
    }

    //emptyFields function
    const emptyFields = () => {
        setFilterPharmacistId(-1);
        setFilterSalesmanId(-1);
        setFilterAssistantId(-1);
        setOpen(false);
    }

    /*     //Filter Modal 
        const filterMinDate = dayjs('12:08:23', 'HH:mm:ss')
     */
    const [filter_salesman_id, setFilterSalesmanId] = useState(-1)
    const [filter_assistant_id, setFilterAssistantId] = useState(-1)
    const [filter_pharmacist_id, setFilterPharmacistId] = useState(-1)
    const [filter_min_quantity, setFilterMinQuantityId] = useState(-1)
    const [filter_max_quantity, setFilterMaxQuantityId] = useState(-1)
    const [filter_min_total_price, setFilterMinTotalPrice] = useState(-1)
    const [filter_max_total_price, setFilterMaxTotalPrice] = useState(-1)
    const [filter_order_status, setFilterOrderStatus] = useState(-1)
    const [filter_street_id, setFilterStreetId] = useState(-1);



    /*  
        const onChangeFilterMinDate: TimePickerProps['onChange'] = (time, timeString) => {
            setFilterMinDate(timeString)
        }; */

    //Location Modal 
    const [locationId, setlocationId] = useState(0);
    const [openLocationModal, setOpenLocationModal] = useState(false);


    //location Modal
    async function OpenLocationModal(id: number) {
        const order = dataOrders?.find(e => e.id == id)
        setLan(Number(order?.lan));
        setLat(Number(order?.lat));
        // setLoading4(true);
        setOpenLocationModal(true);
    }

    //Show Modal Funcs 
    async function OpenShowModal(id: number) {
        setShownId(id);
        await getOrderData(id);
        setOpenShowModal(true);
    }
    async function handleValidation(status: number) {
        await editOrder(shownId, { ...orderD })
        getOrdersData(page, limit);
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
        getFilteredDataOrders({
            page,
            limit,
            filter_min_quantity,
            filter_max_quantity,
            filter_min_total_price,
            filter_max_total_price,
            filter_assistant_id,
            filter_salesman_id,
            filter_pharmacist_id,
            filter_order_status
        })
        setFiltered(true);
    }
    const handleFilter = () => {
        getFilteredData(page, limit);
        setOpenFilterModal(false)
        emptyFields();
    }


    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataOrders ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "الفواتير");
        XLSX.writeFile(workbook, "الفواتير.xlsx");
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
                    pharmacistRes,
                    typeRes,
                    assistantRes,
                    productRes,
                    offerRes
                ] = await Promise.all([
                    apiSalesman.get('/fullname'),
                    apiPharmacist.get('/fullname'),
                    apiType.get('/names'),
                    apiAssistant.get('/fullname'),
                    apiProduct.get('/preview'),
                    apiOffer.get('/preview'),
                ]);
                setSalesmansNames(salesmanRes.data);
                setPharmacistsNames(pharmacistRes.data);
                setTypesNames(typeRes.data);
                setAssistantsNames(assistantRes.data);
                setProducts(productRes.data);
                setOffers(offerRes.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        getOrdersData(page, limit);
    }, []);

    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            fixed: 'left',
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
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
            title: "الصيدلي",
            dataIndex: "pharmacist_id",
            sorter: (a: any, b: any) => Number(a.pharmacist_id) - Number(b.pharmacist_id),
            render: (value: number) => {
                const pharmacist = pharmacistsNames?.find(e => e.id == Number(value));
                return `${pharmacist?.first_name} ${pharmacist?.last_name}`
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
            title: "تاريخ الفاتورة",
            dataIndex: "created_at",
            sorter: (a: any, b: any) => a?.created_at.localeCompare(b?.created_at),
            render: (value: string) => { return value?.slice(0, 10) }
        },
        {
            title: "توقيت الفاتورة",
            dataIndex: "created_at",
            sorter: (a: any, b: any) => a?.created_at.localeCompare(b?.created_at),
            render: (value: string) => { return value?.slice(11, 16) }
        },
        {
            title: 'حالة الفاتورة',
            dataIndex: "visit_status_id",
            sorter: (a: any, b: any) => Number(a.visit_status_id) - Number(b.visit_status_id),
            render: (value: number) => {
                let tagColor = "#01B9B0";
                let mainLabel = "تحت المراجعة";
                switch (value) {
                    case 1:
                        tagColor = "#196A0B";
                        mainLabel = "تحت المراجعة";
                        break;
                    case 2:
                        tagColor = "#FF9800";
                        mainLabel = "مقبول";
                        break;
                    case 3:
                        tagColor = "#650304";
                        mainLabel = "مرفوض";
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
            okButtonProps={{ type: "primary", variant: "outlined" }}
        >
            <div className="grid grid-cols-12 gap-4 h-[400]">
                <div className="col-span-12 h-ful">
                    <h3>
                        موقع الصيدلية
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

            okButtonProps={{ type: "primary", variant: "outlined" }}
        >
            <div className="grid grid-cols-12 gap-4">

                <div className="col-span-6 xl:col-span-6">
                    <div>
                        <h3>
                            حالة الفاتورة :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsStatus}
                        placeholder="حالة الفاتورة"
                        value={searchTextVisitStatus}

                        onChange={(text) => {
                            setSearchVisitStatus(text);
                            setFilterOrderStatus(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setFilterOrderStatus(option.value);
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
                            مندوب الفاتورة :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={
                            salesmansNames?.map(e => { return { value: e.id, label: `${e.first_name} ${e.last_name}` } })
                        }
                        placeholder="مندوب الفاتورة"
                        value={searchTextSalesman}

                        onChange={(text) => {
                            setSearchTextSalesman(text);
                            setFilterSalesmanId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setFilterSalesmanId(option.value);
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
                            مشرف الفاتورة :
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={assistantsNames?.map(e => { return { value: e.id, label: `${e.first_name} ${e.last_name}` } })
                        }
                        placeholder="مشرف الفاتورة"
                        value={searchTextAssistant}

                        onChange={(text) => {
                            setSearchTextAssistant(text);
                            setFilterAssistantId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setFilterAssistantId(option.value);
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
                            الصيدلي:
                        </h3>
                    </div>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={pharmacistsNames?.map(e => { return { value: e.id, label: `${e.first_name} ${e.last_name}` } })
                        }
                        placeholder="الصيدلي"
                        value={searchTextPharmacist}

                        onChange={(text) => {
                            setSearchTextPharmacist(text);
                            setFilterPharmacistId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setFilterPharmacistId(option.value);
                            setSearchTextPharmacist(option?.label as string);
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>

                {/* 
                <div className="col-span-12">
                    <h3>
                        تاريخ الفاتورة  :
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
 */}

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
                        value={searchTextArea}

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
                        onSelect={(value, option) => {
                            getStreetsData()
                            setFilterAreaId(option.value);
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
                        value={searchTextStreet}

                        onChange={(text) => {
                            setSearchTextStreet(text);
                            setFilterStreetId(undefined); // clear ID while typing
                        }}
                        onSelect={(value, option) => {
                            setFilterStreetId(option.value);
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
                    <span>تفاصيل الفاتورة</span>
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
                        <h3>
                            عروض  :
                        </h3>
                        {offers?.filter(e => e.order_id == shownId)?.map(f => {
                            return <div className=" w-[49%] inline-block bg-[#01B9B0]  rounded-[4] p-[8] m-[2]">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-1"></div>
                                    <div className="col-span-3 text-white font-bold">{typesNames.find(e => e.id == f.type_id)?.name}</div>
                                    <div className="col-span-1 text-white font-bold">{f.base_quantity}</div>
                                    <div className="col-span-1 text-white font-bold">{f.return_quantity}</div>
                                    <div className="col-span-1 text-white font-bold">{f.total_quantity}</div>
                                </div>
                            </div>
                        })}

                    </div>
                    <div className="col-span-12">
                        <div className="flex">
                            <Checkbox disabled
                                checked={Boolean(orderD?.is_there_return)}
                            >
                            </Checkbox>
                            <h4>
                                يوجد ملاحظة مندوب أخرى
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-2 col-span-12 sm:col-span-6 w-full h-full mt-5">



                    <div className="col-span-12 md:col-span-3 sm:col-span-6">
                        <h3>
                            اسم المشرف :
                        </h3>
                        <Input
                            disabled
                            value={
                                `${(assistantsNames?.find(e => e.id == Number(orderD?.assistant_id)))?.first_name} ${assistantsNames?.find(e => e.id == Number(orderD?.assistant_id))?.last_name}`
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
                                `${(salesmansNames?.find(e => e.id == Number(orderD?.salesman_id)))?.first_name} ${salesmansNames?.find(e => e.id == Number(orderD?.salesman_id))?.last_name}`
                            }
                            placeholder="اسم المندوب"
                        />
                    </div>




                    <div className="col-span-12 xl:col-span-6">
                        <h3>
                            تاريخ الفاتورة  :
                        </h3>
                        <Input
                            disabled
                            value={
                                `${orderD?.created_at?.slice(0, 10)}`
                            }
                            placeholder="تاريخ الفاتورة"
                        />
                    </div>

                    <div className="col-span-12 xl:col-span-6">
                        <h3>
                            آخر المراجعة :
                        </h3>
                        <Input
                            disabled
                            value={
                                `${orderD?.validated_at?.slice(0, 10)}`
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
                            value={orderD?.note}
                            style={{ maxWidth: '100%' }}
                            rows={4}
                            placeholder="ملاحظة المشرف"
                        />
                    </div>

                    <div className="col-span-12">
                        <h3>
                            منتجات :
                        </h3>
                        {products?.filter(e => e.order_id == shownId)?.map(f => {
                            return <div className=" w-[49%] inline-block bg-[#01B9B0]  rounded-[4] p-[8] m-[2]">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-1"></div>
                                    <div className="col-span-10 text-white font-bold">{typesNames.find(e => e.id == f.type_id)?.name}</div>
                                    <div className="col-span-1 text-white font-bold">{f.quantity}</div>
                                </div>
                            </div>
                        })}

                    </div>

                    <div className="flex col-span-12">
                        <div className="flex">
                            <Checkbox disabled
                                checked={Boolean(orderD?.is_there_return)}
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
            <Button className="col-span-5" variant="solid" color="purple" onClick={() => OpenFilterModal()}>
                فلترة
            </Button>
            <Button className="col-span-5" variant="solid" color="green" onClick={() => downloadExcel()}>
                تنزيل
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
                dataSource={filteredDataOrders || []} />
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
                            getOrdersData(page, pageSize);
                            setPage(page)
                            //setPage(lastPage)
                        },
                    }}
                    dataSource={dataOrders || []} />
            }

        </div>

    </div >
}
