"use client";

import { AutoComplete, Button, Checkbox, DatePicker, Divider, Image, Input, InputNumber, Modal, Skeleton, Slider, SliderSingleProps, Space, Table, Tag, TimePicker, TimePickerProps } from "antd";
import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { usePlacesStore } from "../../../../../../../stores/placesStore/data.store";
import dynamic from "next/dynamic";
import type { ColumnsType } from "antd/es/table";
import { useMedicalStore } from "../../../../../../../stores/medicalStore/data.store";
import { apiAssistant, apiDoctor, apiPharmacist, apiType, apiSalesman, apiSample, apiBaseGift, apiGiftVisit } from "../../../../../../../stores/apis";
import dayjs from 'dayjs';
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas"
import { profileComponent } from "../../../../../../../stores/other-store-interfaces";
import ButtonGroup from "antd/es/button/ButtonGroup";
import { useRouter } from "next/navigation";

export default function DoctorNotes({ profile_id }: profileComponent) {
    const [visits, setVisits] = useState([])
    const { dataGovernorates,
        dataAreas } = usePlacesStore()
    const { getDoctorVisitData, doctorVisitD, editDoctorVisit } = useMedicalStore();

    const [pageLoading, setPageLoading] = useState(true);

    //Going To Salesman and Type
    //showModal
    const router = useRouter();

    const goToTypePage = (id: number) => {
        router.push(`/types/${id}`);
    }

    const goToSalesmanPage = (id: number) => {
        router.push(`/salesmans/${id}`);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiDoctor.get(`/visits/${profile_id}`);
                setVisits(res.data);
                const [
                    salesmanRes,
                    doctorRes,
                    typeRes,
                    assistantRes,
                    samplesRes,
                    baseGiftsRes,
                    giftsVisitsRes,
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
        fetchData().finally(() => setPageLoading(false));
    }, [profile_id]);

    const Map = dynamic(
        () => import("../../../maps/map/Map"),
        { ssr: false }
    );
    //table constants
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



    //for FilteringModal 
    const [filter_area_id, setFilterAreaId] = useState(-1);
    const [optionsGovernorates, setOptionsGovernorates] = useState(dataGovernorates?.map(e => { return { value: e.id, label: e.name } }) || []);
    const [optionsCities, setOptionsCities] = useState([])
    const [optionsAreas, setOptionsAreas] = useState([])
    const area = dataAreas?.find(
        item => item.id === filter_area_id)
    const [optionsStreets, setOptionsStreets] = useState([])

    //emptyFields function
    const emptyFields = () => {
        setOpen(false);
    }

    //Show Modal Funcs 
    async function OpenShowModal(id: number) {
        setShownId(id);
        await getDoctorVisitData(id);
        setOpenShowModal(true);
    }




    //location Modal
    async function OpenLocationModal(id: number) {
        const doctorVisit = visits?.find(e => e.id == id)
        setLan(Number(doctorVisit?.lan));
        setLat(Number(doctorVisit?.lat));
        setDoctorLan(Number(doctorVisit?.doctorLan));
        setDoctorLat(Number(doctorVisit?.doctorLat));
        // setLoading4(true);
        setOpenLocationModal(true);
    }

    //downloadExcele
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(visits ?? []);
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


    const columns: ColumnsType<any> = [
        {
            title: "",
            key: "id",
            fixed: 'right',
            render: (_: any, record: any) => (
                <Space size="middle" >

                </Space>
            ),
        }
    ];

    return <div>

        {/* Show Modal */}
        <Modal
            width={1000}
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span>تفاصيل الزيارة</span>
                </div>
            }
            open={openShowModal}
            onCancel={() => {
                setOpenShowModal(false);
                emptyFields();
            }}
            footer={[
                <ButtonGroup>
                    <Button
                        key="print"
                        variant="solid"
                        style={{ backgroundColor: "#592C46", color: "white" }}
                        onClick={() => {
                            handlePrint();
                            emptyFields();
                        }}
                    >
                        طباعة
                    </Button>

                    <Button
                        key="download"
                        variant="solid"
                        style={{ backgroundColor: "#592C46", color: "white" }}
                        onClick={() => {
                            downloadPDF();
                            emptyFields();
                        }}
                    >
                        تنزيل كملف
                    </Button>

                    <Button
                        key="cancel"
                        variant="solid"
                        style={{ backgroundColor: "#592C46", color: "white" }}
                        onClick={() => {
                            setOpenShowModal(false);
                            emptyFields();
                        }}
                    >
                        إغلاق
                    </Button>
                </ButtonGroup>
            ]
            }
            confirmLoading={loading4}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-4" ref={showModalRef}>

                {/* LEFT SIDE */}
                <div className="grid grid-cols-12 gap-2 col-span-12 md:col-span-6">

                  {/*   <div className="col-span-12">
                        <Image
                            width="100%"
                            height={254}
                            src={doctorVisitD?.photo}
                        />
                    </div> */}

                    <div className="col-span-12">
                        <h3 className="font-bold text-gray-700">ملاحظة الزيارة:</h3>
                        <TextArea
                            disabled
                            value={doctorVisitD?.note}
                            rows={4}
                        />
                    </div>

                    <div className="col-span-12">
                        <h3 className="font-bold text-gray-700">عينات الزيارة:</h3>

                        {doctorsSamples
                            ?.filter(e => e.visit_id == shownId)
                            ?.map(f => (
                                <div
                                    key={f.id}
                                    className="w-[49%] inline-block bg-[#01B9B0] rounded p-2 m-[2px]"
                                >
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-1" />

                                        <div className="col-span-10 text-white font-bold">
                                            {typesNames?.find(e => e.id == f.type_id)?.name}
                                        </div>

                                        <div className="col-span-1 text-white font-bold">
                                            {f.quantity}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="col-span-12 flex items-center gap-2">
                        <Checkbox
                            disabled
                            checked={Boolean(doctorVisitD?.is_other_spoken_note)}
                        />
                        <h4>يوجد ملاحظة مندوب أخرى</h4>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="grid grid-cols-12 gap-2 col-span-12 sm:col-span-6 mt-5">

                    <div className="col-span-12 sm:col-span-6">
                        <h3 className="font-bold text-gray-700">اسم الطبيب:</h3>
                        <Input
                            disabled
                            value={
                                (() => {
                                    const doc = doctorsNames?.find(
                                        e => e.id === Number(doctorVisitD?.doctor_id)
                                    );
                                    return `${doc?.first_name ?? ""} ${doc?.last_name ?? ""}`;
                                })()
                            }
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <h3 className="font-bold text-gray-700">اسم المشرف:</h3>
                        <Input
                            disabled
                            value={
                                (() => {
                                    const a = assistantsNames?.find(
                                        e => e.id === Number(doctorVisitD?.assistant_id)
                                    );
                                    return `${a?.first_name ?? ""} ${a?.last_name ?? ""}`;
                                })()
                            }
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <h3 className="font-bold text-gray-700">اسم المندوب:</h3>
                        <Input
                            disabled
                            value={
                                (() => {
                                    const s = salesmansNames?.find(
                                        e => e.id === Number(doctorVisitD?.salesman_id)
                                    );
                                    return `${s?.first_name ?? ""} ${s?.last_name ?? ""}`;
                                })()
                            }
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <h3 className="font-bold text-gray-700">صنف الزيارة:</h3>
                        <Input
                            disabled
                            value={
                                typesNames?.find(e => e.id === Number(doctorVisitD?.type_id))
                                    ?.name ?? ""
                            }
                        />
                    </div>

                    <div className="col-span-12 xl:col-span-6">
                        <h3 className="font-bold text-gray-700">عدد المرضى:</h3>
                        <Input disabled value={doctorVisitD?.number_of_patients ?? ""} />
                    </div>

                    <div className="col-span-12 xl:col-span-6">
                        <h3 className="font-bold text-gray-700">أقرب الصيدليات:</h3>
                        <Input disabled value={doctorVisitD?.closest_pharmacy ?? ""} />
                    </div>

                    <div className="col-span-12 xl:col-span-6">
                        <h3 className="font-bold text-gray-700">تاريخ الزيارة:</h3>
                        <Input disabled value={doctorVisitD?.created_at?.slice?.(0, 10) ?? ""} />
                    </div>

                    <div className="col-span-12 xl:col-span-6">
                        <h3 className="font-bold text-gray-700">آخر المراجعة:</h3>
                        <Input disabled value={doctorVisitD?.validated_at?.slice?.(0, 10) ?? ""} />
                    </div>

                    <div className="col-span-12">
                        <h3 className="font-bold text-gray-700">ملاحظة المشرف:</h3>
                        <TextArea disabled value={doctorVisitD?.note} rows={4} />
                    </div>

                    <div className="col-span-12">
                        <h3 className="font-bold text-gray-700">هدايا الزيارة:</h3>

                        {giftsVisits
                            ?.filter(e => e.visit_id == shownId)
                            ?.map(f => (
                                <div
                                    key={f.id}
                                    className="w-[49%] inline-block bg-[#01B9B0] rounded p-2 m-[2px]"
                                >
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-1" />

                                        <div className="col-span-10 text-white font-bold">
                                            {baseGiftsNames?.find(e => e.id == f.base_gift_id)?.name}
                                        </div>

                                        <div className="col-span-1 text-white font-bold">
                                            {f.quantity}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="col-span-12 flex items-center gap-2">
                        <Checkbox
                            disabled
                            checked={Boolean(doctorVisitD?.is_other_spoken_note)}
                        />
                        <h4>يوجد ملاحظة مشرف أخرى</h4>
                    </div>

                </div>
            </div>
        </Modal >

        < div className="grid grid-cols-12 gap-4 md:gap-6 w-full" >

        </div>
        <div className="max-w-full">
            {pageLoading ? (
                <Skeleton className="h-full w-full" paragraph={{ rows: 10 }} />
            ) : (
                <div className="grid grid-cols-12 gap-4">
                    {visits.map((visit, index) => (
                        <div
                            key={index}
                            className="col-span-12 grid grid-cols-12 gap-4 rounded-xl bg-white p-5 shadow-md border border-gray-100"
                        >
                            {/* Salesman */}
                            <div className="col-span-12 md:col-span-3 sm:col-span-6">
                                <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                    اسم المندوب:
                                </h3>
                                <Input
                                    disabled
                                    className="bg-gray-50 border border-gray-200 text-gray-700"
                                    value={`${salesmansNames?.find(s => s.id == Number(visit?.salesman_id))
                                        ?.first_name || ""
                                        } ${salesmansNames?.find(s => s.id == Number(visit?.salesman_id))
                                            ?.last_name || ""
                                        }`}
                                />
                            </div>

                            {/* Date */}
                            <div className="col-span-12 md:col-span-3 sm:col-span-6">
                                <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                    تاريخ الزيارة:
                                </h3>
                                <Input
                                    disabled
                                    className="bg-gray-50 border border-gray-200 text-gray-700"
                                    value={visit?.created_at?.slice(0, 10)}
                                />
                            </div>

                            {/* Type */}
                            <div className="col-span-12 md:col-span-3 sm:col-span-6">
                                <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                    صنف الزيارة:
                                </h3>
                                <Input
                                    disabled
                                    className="bg-gray-50 border border-gray-200 text-gray-700"
                                    value={
                                        typesNames?.find(t => t.id == Number(visit?.type_id))?.name || ""
                                    }
                                />
                            </div>

                            {/* Assistant */}
                            <div className="col-span-12 md:col-span-3 sm:col-span-6">
                                <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                    اسم المشرف:
                                </h3>
                                <Input
                                    disabled
                                    className="bg-gray-50 border border-gray-200 text-gray-700"
                                    value={`${assistantsNames?.find(a => a.id == Number(visit?.assistant_id))
                                        ?.first_name || ""
                                        } ${assistantsNames?.find(a => a.id == Number(visit?.assistant_id))
                                            ?.last_name || ""
                                        }`}
                                />
                            </div>

                            {/* Doctor Note */}
                            <div className="col-span-12 sm:col-span-6">
                                <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                    ملاحظة الطبيب:
                                </h3>
                                <TextArea
                                    disabled
                                    rows={4}
                                    className="bg-gray-50 border border-gray-200 text-gray-700"
                                    value={visit?.note}
                                />
                            </div>

                            {/* Admin Note */}
                            <div className="col-span-12 sm:col-span-6">
                                <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                    ملاحظة المشرف:
                                </h3>
                                <TextArea
                                    disabled
                                    rows={4}
                                    className="bg-gray-50 border border-gray-200 text-gray-700"
                                    value={visit?.admin_note}
                                />
                            </div>
                            <ButtonGroup>
                                <Button
                                    className="bg-[#01B9B0] text-white hover:bg-[#019f98] w-[100]"
                                    onClick={() => OpenShowModal(visit.id)}
                                >
                                    <h3 className="text-sm font-semibold text-[#592C46] mb-1">
                                        عرض الزيارة
                                    </h3>
                                </Button>
                                <Button
                                    className="bg-[#01B9B0] text-white hover:bg-[#019f98] w-[100]"
                                    onClick={() => goToTypePage(visit.type_id)}
                                >
                                    <h3 className="text-sm font-semibold text-[#592C46] mb-1">
                                        عرض الصنف
                                    </h3>
                                </Button>
                                <Button
                                    className="bg-[#01B9B0] text-white hover:bg-[#019f98] w-[100]"
                                    onClick={() => goToSalesmanPage(visit.salesman_id)}
                                >
                                    <h3 className="text-sm font-semibold text-[#592C46] mb-1">
                                        عرض المندوب
                                    </h3>
                                </Button>
                            </ButtonGroup>
                        </div>
                    ))}
                </div>


            )}
        </div>

    </div >
}
