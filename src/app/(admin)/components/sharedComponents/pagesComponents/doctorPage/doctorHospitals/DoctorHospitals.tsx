"use client";


import { AutoComplete, Button, Dropdown, Input, Modal, notification, Skeleton, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { usePlacesStore } from "../../../../../../../stores/placesStore/data.store";
import dynamic from "next/dynamic";
import { ColumnsType } from "antd/es/table";
import { useMedicalStore } from "../../../../../../../stores/medicalStore/data.store";
import { profileComponent } from "../../../../../../../stores/other-store-interfaces";
import { apiDoctor, apiHospital } from "../../../../../../../stores/apis";


export default function DoctorHospitals({ profile_id }: profileComponent) {
    const { dataGovernorates, dataCities, dataAreas, dataStreets } = usePlacesStore();
    const { dataHospitals, hospitalD, getHospitalData, deleteHospitalDoctor, getHospitalsData, editHospital, deleteHospital, addHospital, addHospitalDoctor } = useMedicalStore()

    const Map = dynamic(
        () => import("../../../maps/map/Map"),
        { ssr: false }
    );

    const [pageLoading, setPageLoading] = useState(true);
    const [hospitals, setHospitals] = useState([])
    //to get orders data for this type only

    const [searchText, setSearchText] = useState("");
    const [hospital_id, setHospitalId] = useState(0);
    
    const fetchDataHospitals = async () => {
        try {
            const res = await apiDoctor.get(`/hospitals/${profile_id}`);
            setHospitals(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchDataHospitals().finally(() => setPageLoading(false));
    }, [profile_id]);


    const [hospitalsNames, setHospitalsNames] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    res,
                ] = await Promise.all([
                    apiHospital.get('/names'),
                ]);
                setHospitalsNames(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    const [optionsHospitals, setOptionsHospitals] = useState(hospitalsNames?.map(e => { return { value: e.id, label: e.name } }));


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


    async function changeOpenModalAdd() {
        emptyFields();
        setOptionsHospitals(hospitalsNames?.map(e => { return { value: e.id, label: e.name } }))
        setOpen(true);
    }



    //addHospital Function
    async function handleAdd() {


        try {
            const res = await addHospitalDoctor({
                doctor_id: profile_id,
                hospital_id: hospital_id
            })
            if (res?.status == 201) {
                notification.success({
                    message: "نجاح",
                    description: "تمت العملية بنجاح",
                    placement: 'bottomLeft'
                });
            } else if (res?.status == 500) {
                notification.error({
                    message: "خطأ",
                    description: "حدث خطأ في الاتصال بالسيرفر",
                    placement: 'bottomLeft'
                });
            }
            else {
                notification.error({
                    message: "فشل",
                    description: "فشل العملية",
                    placement: 'bottomLeft'
                });
            }
        } catch (error) {
            notification.error({
                message: "فشل",
                description: "فشل العملية",
                placement: 'bottomLeft'
            });
        }
        emptyFields();
        fetchDataHospitals()
        setOpen(false)
    }


    //emptyFields function
    const emptyFields = () => {
        setName("");
        setTelephoneNumber("");
        setPhoneNumber("");
        setAdminDescription("");
        setSearchText("")
        setSalesmanDescription("")
        setOpen(false);
    }


    //location Function
    async function OpenLocationModal(id: number) {
        const hospital = hospitals?.find(e => e.id == id)
        setLan(Number(hospital?.lan));
        setLat(Number(hospital?.lat));
        setOpenLocationModal(true);
    }

    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }
    //showModal 
    const OpenShowModal = (id: number) => {
        const Hospital = hospitals?.find(
            item => item.id === id
        );
        getHospitalData(Hospital?.hospital_id)
        setName(Hospital?.name)
        setSalesmanDescription(Hospital?.salesman_description)
        setAdminDescription(Hospital?.admin_description)
        setStreetId(Hospital?.street_id);
        setGovernorateId(Hospital?.governorate_id);
        setAreaId(Hospital?.area_id);
        setCityId(Hospital?.city_id)
        setPhoneNumber(Hospital?.phone_number)
        setTelephoneNumber(Hospital?.telephone_number)
        setOpenShowModal(true);
    }

    //delete Function
    async function handleDelete(id: number) {
        setLoading2(true);
        try {
            const res = await deleteHospitalDoctor(id);
            if (res?.status == 200) {
                notification.success({
                    message: "نجاح",
                    description: "تمت العملية بنجاح",
                    placement: 'bottomLeft'
                });
            } else if (res?.status == 500) {
                notification.error({
                    message: "خطأ",
                    description: "فشل العملية",
                    placement: 'bottomLeft'
                });
            }
            else {
                notification.error({
                    message: "فشل",
                    description: "فشل العملية",
                    placement: 'bottomLeft'
                });
            }
        } catch (error) {
            notification.error({
                message: "فشل",
                description: "فشل العملية",
                placement: 'bottomLeft'
            });
        }
        fetchDataHospitals();
        setLoading2(false);
        setOpenDeleteModal(false);
    }


    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            fixed: 'left',
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "المشفى",
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
                        موقع
                    </Button>
              
                    <Button
                        type="default"
                        danger
                        onClick={() => { OpenDeleteModal(record.id); }}
                    >
                        حذف
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
                        عرض
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
                <div className="col-span-12 sm:col-span-6">
                    <h3>
                        المشفى :
                    </h3>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsHospitals}
                        placeholder="المشفى"
                        value={searchText}
                        onChange={(text) => {
                            setSearchText(text);
                            setHospitalId(undefined);
                        }}
                        onSelect={(value, option) => {
                            setHospitalId(option.value);
                            setSearchText(option?.label as string);
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

        {/* Show Modal */}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span>تفاصيل المشفى</span>
                </div>
            }
            open={openShowModal}
            onOk={() => emptyFields()}
            okButtonProps={{ variant: "outlined", color: "cyan" }}

            onCancel={() => { setOpenShowModal(false); emptyFields() }}
            confirmLoading={loading}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        اسم المشفى
                    </h3>
                    <Input
                        disabled
                        value={hospitalD?.name}
                        placeholder="اسم المشفى"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        رقم الهاتف  :
                    </h3>
                    <Input
                        disabled
                        value={hospitalD?.phone_number}
                        placeholder="رقم الهاتف"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        رقم الأرضي  :
                    </h3>
                    <Input
                        disabled
                        value={hospitalD?.telephone_number}
                        placeholder="رقم الأرضي"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        المحافظة  :
                    </h3>
                    <Input
                        disabled
                        value={dataGovernorates?.find(e => e?.id == hospitalD?.governorate_id)?.name}
                        placeholder="المحافظة"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        المدينة  :
                    </h3>
                    <Input
                        disabled
                        value={dataCities?.find(e => e?.id == hospitalD?.city_id)?.name}
                        placeholder="المدينة"
                    />
                </div>


                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        المنطقة  :
                    </h3>
                    <Input
                        disabled
                        value={dataAreas?.find(e => e?.id == hospitalD?.area_id)?.name}
                        placeholder="المنطقة"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        الشارع  :
                    </h3>
                    <Input
                        disabled
                        value={dataStreets?.find(e => e?.id == hospitalD?.street_id)?.name}
                        placeholder="الشارع"
                    />
                </div>


                <div className="col-span-12">
                    <h3>
                        وصف الإدارة :
                    </h3>
                    <TextArea
                        disabled
                        value={hospitalD?.admin_description}
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
                        value={hospitalD?.salesman_description}
                        onChange={(e) => setSalesmanDescription(e.target.value)}
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
            okButtonProps={{ type: "primary", variant: "outlined" }}
        >
            <div className="w-full h-[400]">
                <Map lan={lan} lat={lat}></Map>

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

        <div className="grid grid-cols-12 gap-4 md:gap-6 w-full">
            <Button className="col-span-5" variant="solid" color="cyan" onClick={() => changeOpenModalAdd()}>
                إضافة
            </Button>
        </div>
        {
            (pageLoading) ? <Skeleton className="h-full w-full" paragraph={{ rows: 10 }} />
                :
                <Table
                    scroll={{ x: "max-content" }}
                    columns={columns} dataSource={hospitals}
                    pagination={{
                        position: ["topRight"],
                    }} />
        }
    </div>
}
