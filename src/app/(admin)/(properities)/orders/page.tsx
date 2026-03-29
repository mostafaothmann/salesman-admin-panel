"use client";

import { AutoComplete, Button, Divider, Input, InputNumber, Modal, Space, Table, Tag, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { usePlacesStore } from "../../../../stores/placesStore/data.store";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import type { ColumnsType } from "antd/es/table";
import { apiAssistant, apiPharmacist, apiType, apiSalesman, apiProduct, apiOffer } from "../../../../stores/apis";
import dayjs from 'dayjs';
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas"
import { useCommercialStore } from "../../../../stores/commercialStore/data.store";
import { Edit, Info, Trash } from "lucide-react";
import ButtonGroup from "antd/es/button/ButtonGroup";

export default function OrdersPage() {
    const { dataOrders, getOrdersData, deleteProduct, editOffer, editProduct, deleteOffer,
        getOrderData, orderD, editOrder, getFilteredDataOrders, filteredDataOrders, total,
        filter_total } = useCommercialStore();
    const { dataGovernorates, getStreetsData,
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
    const [searchTextArea, setSearchTextArea] = useState("");
    const [searchTextStreet, setSearchTextStreet] = useState("");
    const [searchTextVisitStatus, setSearchVisitStatus] = useState("");
    const [searchTextSalesman, setSearchTextSalesman] = useState("");
    const [searchTextPharmacist, setSearchTextPharmacist] = useState("");
    const [searchTextAssistant, setSearchTextAssistant] = useState("");
    const [searchTextType, setSearchTextType] = useState("");


    //Edit Modal for Product/Offer
    const [name, setName] = useState("");
    const [id, setId] = useState(0);
    const [return_discount, setRetunDiscount] = useState(0);
    const [return_total_price, setReturnTotalPrice] = useState(0);
    const [base_total_price, setBaseTotalPrice] = useState(0);
    const [base_quantity, setBaseQuantity] = useState(0);
    const [return_quantity, setReturnQuantity] = useState(0);
    const [total_quantity, setTotalQuantity] = useState(0);
    const [price_for_piece, setPriceForPiece] = useState(0);
    const [total_price, setTotalPrice] = useState(0);
    const [total_delivery_percentage, setTotalDeliveryPercentage] = useState(0);
    const [delivery_percentage_for_piece, setDeliveryPercentageForPiece] = useState(0);
    const [percentage_for_piece, setPercentageForPiece] = useState(0);
    const [base_percentage, setBasePercentage] = useState(0);
    const [return_percentage, setReturnPercentage] = useState(0);
    const [total_percentage, setTotalPercentage] = useState(0);
    const [type_id, setTypeId] = useState(0);
    const [order_id, setOrderId] = useState(0);


    //for AddingModal 
    const optionsStatus = [
        { value: 1, label: 'تحت المراجعة' },
        { value: 2, label: 'مقبولة' },
        { value: 3, label: 'مرفوضة' }
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
        await fetchDataForOrder(id);
        setOpenShowModal(true);
    }
    async function handleValidation(status: number) {
        await editOrder(shownId, { ...orderD, order_status: status })
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

    const valueRenderer = (value: number) => {
        if (value >= 1000000) {
            return <Tag color={"#355872"}>
                {value / 1000000} مليون
            </Tag>
        }
        else if (value >= 1000) {
            return <Tag color={"#1C0770"}>
                {value / 1000} ألف
            </Tag>
        }
        else return <Tag color={"#FF5A5A"}>
            {value} ليرة
        </Tag>;
    }
    const fetchData = async () => {
        try {
            const [
                salesmanRes,
                pharmacistRes,
                typeRes,
                assistantRes
            ] = await Promise.all([
                apiSalesman.get('/fullname'),
                apiPharmacist.get('/fullname'),
                apiType.get('/names'),
                apiAssistant.get('/fullname'),
            ]);
            setSalesmansNames(salesmanRes.data);
            setPharmacistsNames(pharmacistRes.data);
            setTypesNames(typeRes.data);
            setAssistantsNames(assistantRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchDataForOrder = async (id: number) => {
        try {
            const [
                productRes,
                offerRes
            ] = await Promise.all([
                apiProduct.get(`/preview/${id}`),
                apiOffer.get(`/preview/${id}`),
            ]);
            setProducts(productRes.data);
            setOffers(offerRes.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
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
            dataIndex: "order_status",
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




    //Delet Product Modal
    const [openProductDeleteModal, setOpenProductDeleteModal] = useState(false);
    //deleteModal
    const OpenProductDeleteModal = (id: number) => {
        setProductDelitedID(id);
        setOpenProductDeleteModal(true);
    }
    //delete 
    async function handleProductDelete(id: number) {
        setLoading2(true);
        await deleteProduct(id);
        fetchDataForOrder(shownId)
        setLoading2(false);
        setOpenProductDeleteModal(false);

    }
    //Delete Modal 
    const [offerDelitedID, setOfferDelitedID] = useState(0);

    //Delete Modal 
    const [productDelitedID, setProductDelitedID] = useState(0);
    const [loading2, setLoading2] = useState(false);

    //Delet Offer Modal
    const [openOfferDeleteModal, setOpenOfferDeleteModal] = useState(false);
    //deleteModal
    const OpenOfferDeleteModal = (id: number) => {
        setOfferDelitedID(id);
        setOpenOfferDeleteModal(true);
    }
    //delete 
    async function handleOfferDelete(id: number) {
        setLoading2(true);
        await deleteOffer(id);
        await fetchDataForOrder(shownId);
        setLoading2(false);
        setOpenOfferDeleteModal(false);
    }


    //Edit Product Modal
    const [openProductEditModal, setOpenProductEditModal] = useState(false);
    const [productEditedId, setProductEditedId] = useState(0)
    const [loading, setLoading] = useState(false);

    //edit Product Modal 
    const OpenProductEditModal = (id: number) => {
        setProductEditedId(id);
        const product = products?.find(
            item => item.id === id
        );
        setBaseQuantity(product?.base_quantity || 0);
        setReturnQuantity(product?.return_quantity || 0);
        setTotalQuantity(product?.total_quantity || 0);
        setPercentageForPiece(product?.percentage_for_piece || 0);
        setBasePercentage(product?.base_percentage || 0);
        setReturnPercentage(product?.return_percentage);
        setTotalPercentage(product?.total_percentage || 0);
        setPriceForPiece(product?.price_for_piece || 0);
        setBaseTotalPrice(product?.base_total_price || 0);
        setReturnTotalPrice(product?.return_total_price || 0);
        setTotalPrice(product?.total_price || 0);
        setDeliveryPercentageForPiece(product?.delivery_percentage_for_piece || 0);
        setTotalDeliveryPercentage(product?.total_delivery_percentage || 0);
        setRetunDiscount(product?.return_discount || 0);
        setOrderId(product?.order_id || 0)
        setId(product?.id || 0);
        setTotalPrice(product?.total_price || 0);
        setOpenProductEditModal(true);
    }

    //handle ProductEdit
    async function handleProductEdit() {
        setLoading(true);
        const product = products?.find(
            item => item.id === id
        );
        await editProduct(productEditedId, { ...product, return_discount, return_quantity, base_quantity, total_quantity, price_for_piece });
        setLoading(false);
        setOpenProductEditModal(false);
        fetchDataForOrder(shownId);
    }

    //Edit Offer Modal
    const [openOfferEditModal, setOpenOfferEditModal] = useState(false);
    const [offerEditedId, setOfferEditedId] = useState(0)

    //edit Offer Modal 
    const OpenOfferEditModal = (id: number) => {
        setOfferEditedId(id);
        const offer = offers?.find(
            item => item.id === id
        );
        setBaseQuantity(offer?.base_quantity || 0);
        setReturnQuantity(offer?.return_quantity || 0);
        setTotalQuantity(offer?.total_quantity || 0);
        setPercentageForPiece(offer?.percentage_for_piece || 0);
        setBasePercentage(offer?.base_percentage || 0);
        setReturnPercentage(offer?.return_percentage);
        setTotalPercentage(offer?.total_percentage || 0);
        setPriceForPiece(offer?.price_for_piece || 0);
        setBaseTotalPrice(offer?.base_total_price || 0);
        setReturnTotalPrice(offer?.return_total_price || 0);
        setTotalPrice(offer?.total_price || 0);
        setDeliveryPercentageForPiece(offer?.delivery_percentage_for_piece || 0);
        setTotalDeliveryPercentage(offer?.total_delivery_percentage || 0);
        setRetunDiscount(offer?.return_discount || 0);
        setOrderId(offer?.order_id || 0)
        setId(offer?.id || 0);
        setTotalPrice(offer?.total_price || 0);
        setOpenOfferEditModal(true);
    }

    //handle Offer Edit
    async function handleOfferEdit() {
        setLoading(true);
        const offer = offers?.find(
            item => item.id === id
        );
        await editOffer(offerEditedId, {
            ...offer,
            order_id,
            price_for_piece,
            base_quantity,
            return_quantity,
            return_discount,
            delivery_percentage_for_piece,
        });
        setLoading(false);
        setOpenOfferEditModal(false);
        fetchDataForOrder(shownId);
    }

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
                            setFilterOrderStatus(undefined); 
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
                            setFilterSalesmanId(undefined); 
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
                            setFilterAssistantId(undefined); 
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
                            setFilterPharmacistId(undefined); 
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
                            setFilterAreaId(undefined); 
                            setFilterStreetId(undefined); 
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
                            setFilterStreetId(undefined); 
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
            width={1100}
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span>NO:o{orderD?.id}</span>
                </div>
            }
            open={openShowModal}
            onCancel={() => { setOpenShowModal(false); emptyFields() }}
            footer={[
                <ButtonGroup>
                    <Button key="print" variant="solid" color="purple" onClick={() => { handlePrint(); emptyFields() }}>
                        طباعة
                    </Button>,
                    <Button key="download" variant="solid" color="purple" onClick={() => { downloadPDF(); emptyFields() }}>
                        تنزيل كملف
                    </Button>,
                    <Button key="accept" variant="solid" color="purple" onClick={() => handleValidation(2)}>
                        قبول
                    </Button>,
                    <Button key="reject" variant="solid" color="purple" onClick={() => handleValidation(3)}>
                        رفض
                    </Button>,
                    <Button key="cancel" variant="solid" color="purple" onClick={() => { setOpenShowModal(false); emptyFields() }}>
                        إغلاق
                    </Button>
                </ButtonGroup>
            ]
            }
            confirmLoading={loading4}   
            mask={false}
        >

            <div className="grid grid-cols-12 gap-4" ref={showModalRef}>
                <div className="col-span-12">

                    <div className=" w-full bg-[#01B9B0]  rounded-[4] p-[8] m-0">
                        <div className="grid grid-cols-12">
                            <div className="col-span-1 text-white font-bold text-center">اسم المنتج</div>

                            <div className="col-span-1 text-white font-bold text-center">الكمية الأساسية</div>
                            <div className="col-span-1 text-white font-bold text-center">الكمية المرجعة</div>
                            <div className="col-span-1 text-white font-bold text-center">الكمية النهائية</div>


                            <div className="col-span-1 text-white font-bold text-center">السعر الأساسي</div>
                            <div className="col-span-1 text-white font-bold text-center">السعر المرجع</div>
                            <div className="col-span-1 text-white font-bold text-center">السعر النهائي</div>

                            <div className="col-span-1 text-white font-bold text-center">النسبة الأساسية</div>
                            <div className="col-span-1 text-white font-bold text-center">النسبة المرجعة</div>
                            <div className="col-span-1 text-white font-bold text-center">النسبة النهائية</div>


                            <div className="col-span-1 text-white font-bold text-center">نسبة التوصيل</div>
                        </div>
                    </div>


                </div>
                <Divider type="horizontal" className="col-span-12" style={{ borderTop: '4px solid #d9d9d9', margin: '0' }} ></Divider>

                <div className="col-span-12">
                    <h3>
                        عروض  :
                    </h3>
                    {offers?.filter(e => e.order_id == shownId)?.map(f => {
                        return <div className=" w-full bg-[#01B9B0]  rounded-[4] p-[8] m-[2]">
                            <div className="grid grid-cols-12 gap-4">

                                <div className="col-span-1 text-white font-bold text-center">{typesNames.find(e => e.id == f.type_id)?.name}</div>

                                <div className="col-span-1 text-white font-bold text-center">{f.base_quantity}</div>
                                <div className="col-span-1 text-white font-bold text-center">{f.return_quantity}</div>
                                <div className="col-span-1 text-white font-bold text-center">{f.total_quantity}</div>
                                <div className="col-span-1 text-white font-bold text-center">{valueRenderer(f.base_total_price)} </div>
                                <div className="col-span-1 text-white font-bold text-center">{valueRenderer(f.return_total_price)} </div>
                                <div className="col-span-1 text-white font-bold text-center">{valueRenderer(f.total_price)} </div>
                                <div className="col-span-1 text-white font-bold text-center">{valueRenderer(f.base_percentage)} </div>
                                <div className="col-span-1 text-white font-bold text-center">{valueRenderer(f.return_percentage)} </div>
                                <div className="col-span-1 text-white font-bold text-center">{valueRenderer(f.total_percentage)} </div>
                                <div className="col-span-1 text-white font-bold text-center">{valueRenderer(f.total_delivery_percentage)} </div>
                                <div className="col-span-1 text-white font-bold text-center">
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-6 gap-4">
                                            <Tooltip title="حذف">
                                                <Button type="primary" danger onClick={() => { OpenOfferDeleteModal(f.id); }} shape="circle" icon={<Trash />} />
                                            </Tooltip>
                                        </div>
                                        <div className="col-span-6">
                                            <Tooltip title="تعديل">
                                                <Button type="primary" onClick={() => { OpenOfferEditModal(f.id); }} shape="circle" icon={<Edit />} />
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}

                </div>

                <div className="col-span-12">
                    <h3>
                        منتجات :
                    </h3>
                    {products?.filter(e => e.order_id == shownId)?.map(f => {
                        return <div className=" w-full bg-[#01B9B0]  rounded-[4] p-[8] m-[2]">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-1 text-white font-bold text-center">{typesNames.find(e => e.id == f.type_id)?.name}</div>

                                <div className="col-span-1 text-white font-bold text-center">{f.base_quantity}</div>
                                <div className="col-span-1 text-white font-bold text-center">{f.return_quantity}</div>
                                <div className="col-span-1 text-white font-bold text-center">{f.total_quantity}</div>


                                <div className="col-span-1 text-white font-bold text-center">{valueRenderer(f.base_total_price)} </div>
                                <div className="col-span-1 text-white font-bold text-center">{valueRenderer(f.return_total_price)} </div>
                                <div className="col-span-1 text-white font-bold text-center">{valueRenderer(f.total_price)} </div>

                                <div className="col-span-1 text-white font-bold text-center">{valueRenderer(f.base_percentage)} </div>
                                <div className="col-span-1 text-white font-bold text-center">{valueRenderer(f.return_percentage)} </div>
                                <div className="col-span-1 text-white font-bold text-center">{valueRenderer(f.total_percentage)} </div>
                                <div className="col-span-1 text-white font-bold text-center">{valueRenderer(f.total_delivery_percentage)} </div>
                                <div className="col-span-1 text-white font-bold text-center">
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-6 gap-4">
                                            <Tooltip title="حذف">
                                                <Button type="primary" danger onClick={() => { OpenProductDeleteModal(f.id); }} shape="circle" icon={<Trash />} />
                                            </Tooltip>
                                        </div>
                                        <div className="col-span-6">
                                            <Tooltip title="تعديل">
                                                <Button type="primary" onClick={() => { OpenProductEditModal(f.id); }} shape="circle" icon={<Edit />} />
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}

                </div>
                <Divider type="horizontal" className="col-span-12" style={{ borderTop: '4px solid #d9d9d9', margin: '0' }} ></Divider>


                <div className="col-span-12">

                    <div className=" w-full bg-[#01B9B0]  rounded-[4] p-[8] m-0">
                        <div className="grid grid-cols-12">
                            <div className="col-span-1 text-white font-bold text-center"></div>

                            <div className="col-span-1 text-white font-bold text-center">{valueRenderer(products?.reduce((acc, e) => acc + (e?.base_quantity || 0), 0) + offers?.reduce((acc, e) => acc + (e?.base_quantity || 0), 0))}</div>
                            <div className="col-span-1 text-white font-bold text-center">{valueRenderer(products?.reduce((acc, e) => acc + (e?.return_quantity || 0), 0) + offers?.reduce((acc, e) => acc + (e?.return_quantity || 0), 0))}</div>
                            <div className="col-span-1 text-white font-bold text-center">{valueRenderer(products?.reduce((acc, e) => acc + (e?.total_quantity || 0), 0) + offers?.reduce((acc, e) => acc + (e?.total_quantity || 0), 0))}</div>

                            <div className="col-span-1 text-white font-bold text-center">{valueRenderer(products?.reduce((acc, e) => acc + (e?.base_total_price || 0), 0) + offers?.reduce((acc, e) => acc + (e?.base_total_price || 0), 0))}</div>
                            <div className="col-span-1 text-white font-bold text-center">{valueRenderer(products?.reduce((acc, e) => acc + (e?.return_total_price || 0), 0) + offers?.reduce((acc, e) => acc + (e?.return_total_price || 0), 0))}</div>
                            <div className="col-span-1 text-white font-bold text-center">{valueRenderer(products?.reduce((acc, e) => acc + (e?.total_price || 0), 0) + offers?.reduce((acc, e) => acc + (e?.total_price || 0), 0))}</div>

                            <div className="col-span-1 text-white font-bold text-center">{valueRenderer(products?.reduce((acc, e) => acc + (e?.base_percentage || 0), 0) + offers?.reduce((acc, e) => acc + (e?.base_percentage || 0), 0))}</div>
                            <div className="col-span-1 text-white font-bold text-center">{valueRenderer(products?.reduce((acc, e) => acc + (e?.return_percentage || 0), 0) + offers?.reduce((acc, e) => acc + (e?.return_percentage || 0), 0))}</div>
                            <div className="col-span-1 text-white font-bold text-center">{valueRenderer(products?.reduce((acc, e) => acc + (e?.total_percentage || 0), 0) + offers?.reduce((acc, e) => acc + (e?.total_percentage || 0), 0))}</div>


                            <div className="col-span-1 text-white font-bold text-center">{valueRenderer(products?.reduce((acc, e) => acc + (e?.total_delivery_percentage || 0), 0) + offers?.reduce((acc, e) => acc + (e?.total_delivery_percentage || 0), 0))}</div>
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

        {/* Product */}
        {/*Delete Modal*/}
        <Modal
            title="تأكيد الحذف"
            open={openProductDeleteModal}
            onOk={() => handleProductDelete(productDelitedID)}
            onCancel={() => setOpenProductDeleteModal(false)}
            confirmLoading={loading2}
            mask={false}
            okType="danger"
            okButtonProps={{ type: "primary" }}
        >
        </Modal>

        {/* Offer */}
        {/*Delete Modal*/}
        <Modal
            title="تأكيد الحذف"
            open={openOfferDeleteModal}
            onOk={() => handleOfferDelete(offerDelitedID)}
            onCancel={() => setOpenOfferDeleteModal(false)}
            confirmLoading={loading2}
            mask={false}
            okType="danger"
            okButtonProps={{ type: "primary" }}
        >
        </Modal>


        {/*  Product Editing  Modal*/}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span>p:{order_id}:{id}</span>
                </div>
            }
            open={openProductEditModal}
            okButtonProps={{ variant: "outlined", color: "blue" }}
            onOk={() => handleProductEdit()}
            onCancel={() => { setOpenProductEditModal(false); emptyFields() }}
            confirmLoading={loading}   
            mask={false}
        >
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <h3>
                        الكمية
                    </h3>
                </div>
                <div className="col-span-6 md:col-span-6">
                    <div >
                        <h3>
                            الأساسي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={base_quantity}
                        onChange={(e) => setBaseQuantity(e)}
                        placeholder="الأساسي"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            المرتجع
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={return_quantity}
                        onChange={(e) => setReturnQuantity(e)}
                        placeholder="المرتجع"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            النهائي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={total_quantity}
                        onChange={(e) => setBaseQuantity(e)}
                        placeholder="النهائي"
                    />
                </div>

                <div className="col-span-12">
                    <h3>
                        النسبة
                    </h3>
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            للقطعة
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={percentage_for_piece}
                        onChange={(e) => setPercentageForPiece(e)}
                        placeholder="للقطعة"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            الأساسي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={base_percentage}
                        onChange={(e) => setBasePercentage(e)}
                        placeholder="الأساسي"
                    />
                </div>

                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            المرتجع
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={return_percentage}
                        onChange={(e) => setReturnPercentage(e)}
                        placeholder="المرتجع"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            النهائي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={total_percentage}
                        onChange={(e) => setTotalPercentage(e)}
                        placeholder="النهائي"
                    />
                </div>
                <div className="col-span-12">
                    <h3>
                        التوصيل
                    </h3>
                </div>
                <div className="col-span-6 md:col-span-9">
                    <div >
                        <h3>
                            للقطعة
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={delivery_percentage_for_piece}
                        onChange={(e) => setDeliveryPercentageForPiece(e)}
                        placeholder="للقطعة"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            النهائي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={total_delivery_percentage}
                        onChange={(e) => setTotalDeliveryPercentage(e)}
                        placeholder="النهائي"
                    />
                </div>
            </div>
            <Divider type="horizontal" style={{ borderTop: '2px solid #d9d9d9' }} ></Divider>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <h3>
                        السعر
                    </h3>
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            للقطعة
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={price_for_piece}
                        onChange={(e) => setPriceForPiece(e)}
                        placeholder="للقطعة"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            الأساسي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={base_total_price}
                        onChange={(e) => setBaseTotalPrice(e)}
                        placeholder="الأساسي"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            المرتجع
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={return_total_price}
                        onChange={(e) => setReturnTotalPrice(e)}
                        placeholder="المرتجع"
                    />
                </div>

                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            النهائي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={total_price}
                        onChange={(e) => setTotalPrice(e)}
                        placeholder="النهائي"
                    />
                </div>
            </div>
        </Modal>




        {/*  Offer Editing  Modal*/}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span>o:{order_id}:{id}</span>
                </div>
            }
            open={openProductEditModal}
            okButtonProps={{ variant: "outlined", color: "blue" }}
            onOk={() => handleProductEdit()}
            onCancel={() => { setOpenProductEditModal(false); emptyFields() }}
            confirmLoading={loading}   
            mask={false}
        >
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <h3>
                        الكمية
                    </h3>
                </div>
                <div className="col-span-6 md:col-span-6">
                    <div >
                        <h3>
                            الأساسي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={base_quantity}
                        onChange={(e) => setBaseQuantity(e)}
                        placeholder="الأساسي"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            المرتجع
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={return_quantity}
                        onChange={(e) => setReturnQuantity(e)}
                        placeholder="المرتجع"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            النهائي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={total_quantity}
                        onChange={(e) => setBaseQuantity(e)}
                        placeholder="النهائي"
                    />
                </div>

                <div className="col-span-12">
                    <h3>
                        النسبة
                    </h3>
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            للقطعة
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={percentage_for_piece}
                        onChange={(e) => setPercentageForPiece(e)}
                        placeholder="للقطعة"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            الأساسي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={base_percentage}
                        onChange={(e) => setBasePercentage(e)}
                        placeholder="الأساسي"
                    />
                </div>

                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            المرتجع
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={return_percentage}
                        onChange={(e) => setReturnPercentage(e)}
                        placeholder="المرتجع"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            النهائي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={total_percentage}
                        onChange={(e) => setTotalPercentage(e)}
                        placeholder="النهائي"
                    />
                </div>
                <div className="col-span-12">
                    <h3>
                        التوصيل
                    </h3>
                </div>
                <div className="col-span-6 md:col-span-9">
                    <div >
                        <h3>
                            للقطعة
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={delivery_percentage_for_piece}
                        onChange={(e) => setDeliveryPercentageForPiece(e)}
                        placeholder="للقطعة"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            النهائي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={total_delivery_percentage}
                        onChange={(e) => setTotalDeliveryPercentage(e)}
                        placeholder="النهائي"
                    />
                </div>
            </div>
            <Divider type="horizontal" style={{ borderTop: '2px solid #d9d9d9' }} ></Divider>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <h3>
                        السعر
                    </h3>
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            للقطعة
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={price_for_piece}
                        onChange={(e) => setPriceForPiece(e)}
                        placeholder="للقطعة"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            الأساسي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={base_total_price}
                        onChange={(e) => setBaseTotalPrice(e)}
                        placeholder="الأساسي"
                    />
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            المرتجع
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={return_total_price}
                        onChange={(e) => setReturnTotalPrice(e)}
                        placeholder="المرتجع"
                    />
                </div>

                <div className="col-span-6 md:col-span-3">
                    <div >
                        <h3>
                            النهائي
                        </h3>
                    </div>
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={total_price}
                        onChange={(e) => setTotalPrice(e)}
                        placeholder="النهائي"
                    />
                </div>
            </div>
        </Modal>



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
