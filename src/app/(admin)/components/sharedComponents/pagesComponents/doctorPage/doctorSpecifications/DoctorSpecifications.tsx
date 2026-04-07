"use client";

import { Type } from "../../../../../../../stores/types-store-interfaces";
import { useTypeStore } from "../../../../../../../stores/typesStore/data.store";
import { useEffect, useState } from "react";
import { AutoComplete, Button, ConfigProvider, DatePicker, Input, InputNumber, notification, Skeleton, Tabs } from "antd";
import { profileComponent } from "../../../../../../../stores/other-store-interfaces";
import { apiDoctor, apiType } from "../../../../../../../stores/apis";
import { useMedicalStore } from "../../../../../../../stores/medicalStore/data.store";
import dayjs from "dayjs";
import { usePlacesStore } from "../../../../../../../stores/placesStore/data.store";
export default function DoctorSpecification({ profile_id }: profileComponent) {
    const { dataGovernorates, getGovernoratesData, getCitiesData, getAreasData, getStreetsData, dataCities, dataAreas, dataStreets } = usePlacesStore()
    const { dataSpecializations, getSpecializationsData } = useMedicalStore();

    const { editDoctor } = useMedicalStore()
    const { TextArea } = Input;
    const { dataGroupTypes } = useTypeStore();
    const [doctorD, setDoctorData] = useState(null)
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    doctorData
                ] = await Promise.all([
                    apiDoctor.get(`/${profile_id}`),
                ]);
                setDoctorData(doctorData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getSpecializationsData();
        fetchData().finally(() => setPageLoading(false));
    }, []);


    // Basic Info
    const [id, setId] = useState<number | null>(null);
    const [first_name, setFirstName] = useState("");
    const [second_name, setSecondName] = useState("");
    const [last_name, setLastName] = useState("");
    const [gender, setGender] = useState<number | null>(null);
    const [loyalty_id, setLoyaltyId] = useState<number | null>(null);
    const [birth_date, setBirthDate] = useState(null);

    // Descriptions
    const [admin_description, setAdminDescription] = useState("");
    const [salesman_description, setSalesmanDescription] = useState("");

    // Contact
    const [phone_number, setPhoneNumber] = useState("");
    const [telephone_number, setTelephoneNumber] = useState("");
    const [email, setEmail] = useState("");

    // Location
    const [governorate_id, setGovernorateId] = useState<number | null>(null);
    const [city_id, setCityId] = useState<number | null>(null);
    const [area_id, setAreaId] = useState<number | null>(null);
    const [street_id, setStreetId] = useState<number | null>(null);
    const [lat, setLat] = useState("");
    const [lan, setLan] = useState("");
    const [full_place, setFullPlace] = useState("");
    const [close_place, setClosePlace] = useState("");
    const [close_locaiton, setclose_location] = useState("");

    // Professional
    const [specialization_id, setSpecializationId] = useState<number | null>(null);
    const [classification_id, setClassificationId] = useState<number | null>(null);
    const [graduation_country, setGraduationCountry] = useState("");
    const [graduation_university, setgraduation_university] = useState("");


    // Work & Routine
    const [waiting_time_id, setWaitingTimeId] = useState<number | null>(null);
    const [first_work_time_opening, FirstWorkTimeOpening] = useState("");
    const [first_work_time_closing, setFirstWorkTimeClosing] = useState("");
    const [second_work_time_opening, setSecondTimeOpening] = useState("");
    const [second_work_time_closing, setSecondWorkTimeClosing] = useState("");
    const [favourite_time_opening, setFavouriteTimeOpening] = useState("");
    const [favourite_time_closing, setFavouriteTimeClosing] = useState("");
    const [average_patients_per_day, setAveragePatientsPerDay] = useState<number | null>(null);
    const [secrtary_first_name, setSecrtaryFirstName] = useState("");

    // Drug / Preferences
    const [adopted_types, setAdoptedTypes] = useState("");
    const [expected_recipes, setExpectedRecipes] = useState<number | null>(null);
    const [preffered_dietary_types, setpreffered_dietary_types] = useState("");
    const [preffered_treatment_types, setpreffered_treatment_types] = useState("");
    const [preffered_companies, setpreffered_companies] = useState("");
    const [competitive_types, setcompetitive_types] = useState("");
    const [stance_on_dietary_supp, setStanceOnDietarySupp] = useState("");

    // Personality / Relationship
    const [personality_strengthens, setpersonality_strengthens] = useState("");
    const [interestes, setInterestes] = useState("");
    const [personality_type_id, setPersonalityTypeId] = useState<number | null>(null);
    const [social_pattern_id, setSocial_pattern_id] = useState<number | null>(null);
    const [salesman_relationship_id, setSalesman_relationship_id] = useState<number | null>(null);

    // System / Extra
    const [photo, setPhoto] = useState("");
    const [lastVisitNote, setLastVisitNote] = useState("");
    const [lastVisitDate, setLastVisitDate] = useState<Date | null>(null);
    const [isAddedByAdmin, setIsAddedByAdmin] = useState<boolean>(false);

    //for Auto Complete
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

    const firstStartTime = dayjs('12:08:23', 'HH:mm:ss');
    const firstEndTime = dayjs('12:08:23', 'HH:mm:ss');
    const secondStartTime = dayjs('12:08:23', 'HH:mm:ss');
    const secondEndTime = dayjs('12:08:23', 'HH:mm:ss');
    const favouriteStartTime = dayjs('12:08:23', 'HH:mm:ss');
    const favouriteEndTime = dayjs('12:08:23', 'HH:mm:ss');

    useEffect(() => {
        if (!doctorD) return;
        setId(doctorD.id);

        setFirstName(doctorD.first_name || "");
        setSecondName(doctorD.second_name || "");
        setLastName(doctorD.last_name || "");
        setGender(doctorD.gender ?? null);
        setLoyaltyId(doctorD.loyalty_id ?? null);
        setBirthDate(dayjs(doctorD.birth_date));
        setAdminDescription(doctorD.admin_description || "");
        setSalesmanDescription(doctorD.salesman_description || "");

        setPhoneNumber(doctorD.phone_number || "");
        setTelephoneNumber(doctorD.telephone_number || "");
        setEmail(doctorD.email || "");

        setGovernorateId(doctorD.governorate_id ?? null);
        setCityId(doctorD.city_id ?? null);
        setAreaId(doctorD.area_id ?? null);
        setStreetId(doctorD.street_id ?? null);
        setLat(doctorD.lat || "");
        setLan(doctorD.lan || "");
        setFullPlace(doctorD.full_place || "");
        setClosePlace(doctorD.close_place || "");
        setclose_location(doctorD.close_location || "");

        setSpecializationId(doctorD.specialization_id || "");
        setClassificationId(doctorD.classification_id || "");
        setLoyaltyId(doctorD?.loyalty_id || "")
        setGraduationCountry(doctorD.graduation_country || "");
        setgraduation_university(doctorD.graduation_university || "");

        setWaitingTimeId(doctorD.waiting_time_id ?? null);
        FirstWorkTimeOpening(doctorD.first_work_time_opening || "");
        setFirstWorkTimeClosing(doctorD.first_work_time_closing || "");
        setSecondTimeOpening(doctorD.second_time_opening || "");
        setSecondWorkTimeClosing(doctorD.second_work_time_closing || "");
        setFavouriteTimeOpening(doctorD.favourite_time_opening || "");
        setFavouriteTimeClosing(doctorD.favourite_time_closing || "");
        setAveragePatientsPerDay(doctorD.average_patients_per_day ?? null);

        setAdoptedTypes(doctorD.adopted_types || "");
        setExpectedRecipes(doctorD.expected_recipes ?? null);
        setpreffered_dietary_types(doctorD.preffered_dietary_types || "");
        setpreffered_treatment_types(doctorD.preffered_treatment_types || "");
        setpreffered_companies(doctorD.preffered_companies || "");
        setcompetitive_types(doctorD.competitive_types || "");
        setStanceOnDietarySupp(doctorD.stance_on_dietary_supp || "");

        setpersonality_strengthens(doctorD.personality_strengthens || "");
        setInterestes(doctorD.interestes || "");
        setPersonalityTypeId(doctorD.personality_type_id ?? null);
        setSocial_pattern_id(doctorD.social_pattern_id ?? null);
        setSalesman_relationship_id(doctorD.salesman_relationship_id ?? null);

        setPhoto(doctorD.photo || "");
        setLastVisitNote(doctorD.last_visit_note || "");
        setLastVisitDate(doctorD.last_visit_date ? new Date(doctorD.last_visit_date) : null);
        setIsAddedByAdmin(doctorD.is_added_by_admin ?? false);
        //for Auto Complete
    }, [doctorD]);
    useEffect(() => {
        setSearchTextLoyalty(
            optionsLoyalty?.find(e => e.value == loyalty_id)?.label || ""
        )
    }, [loyalty_id])
    useEffect(() => {
        setOptionsSpecializations(dataSpecializations?.map(e => { return { value: e.id, label: e.name } }))
        setSearchTextSpecilization(
            dataSpecializations?.find(e => e.id === specialization_id)?.name || ""
        );
    }, [specialization_id])
    useEffect(() => {

        setSearchTextClassification(
            optionsClassification?.find(e => e.value == classification_id)?.label || ""
        )
    }, [classification_id])

    //Edit Modal
    const [open1, setOpenEditModal] = useState(false);
    const [editedId, setEditedId] = useState(0)
    const [loading, setLoading] = useState(false);



    //handleEdit
    async function handleEdit() {
        setLoading(true);
        try {
            const res = await editDoctor(profile_id, {
                governorate_id,
                city_id,
                area_id,
                street_id,
                specialization_id,
                first_name,
                last_name,
                classification_id,
                loyalty_id,
                birth_date,
                admin_description,
                salesman_description,
                favourite_time_opening,
                favourite_time_closing,
                first_work_time_opening,
                first_work_time_closing,
                second_work_time_opening,
                second_work_time_closing,
                graduation_country,
                phone_number,
                telephone_number,
                graduation_university,
                gender,
                /*  wife_husband_first_name: string;
                 wife_husband_last_name: string; */
                //added recently
                full_place,
                close_place,
                email,
                second_name,
                waiting_time_id,
                stance_on_dietary_supp,
                /*    childs_under_12: number;
                   childs_above_18: number;
                   childs_between_12_18: number;
                */
                adopted_types,
                expected_recipes,
                preffered_dietary_types,
                preffered_treatment_types,
                preffered_companies,
                competitive_types,
                personality_strengthens,
                interestes,
                personality_type_id,
                social_pattern_id,
                salesman_relationship_id,
                secrtary_first_name,
            });
            if (res?.status == 200 || res?.status == 204) {
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

        setLoading(false);
        setOpenEditModal(false);
    }





    const [activeKey, setActiveKey] = useState("1");
    const renderContent = () => {
        switch (activeKey) {
            case "1":
                return <div className="grid grid-cols-12 gap-4">
                    {/* CARD */}
                    <div className="col-span-12 grid grid-cols-12 gap-4 rounded-xl bg-white p-5 shadow-md border border-gray-100">

                        {/* TEXT FIELDS */}
                        {[
                            { label: "الاسم الأول", value: first_name, set: setFirstName },
                            { label: "الاسم الثاني", value: second_name, set: setSecondName },
                            { label: "اسم العائلة", value: last_name, set: setLastName },
                            { label: "رقم الموبايل", value: phone_number, set: setPhoneNumber },
                            { label: "رقم الهاتف", value: telephone_number, set: setTelephoneNumber },
                        ].map((field, i) => (
                            <div key={i} className="col-span-12 md:col-span-4 sm:col-span-6">
                                <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                    {field.label}
                                </h3>
                                <Input
                                    value={field.value}
                                    onChange={(e) => field.set(e.target.value)}
                                    className="bg-gray-50 border border-gray-200 text-gray-700"
                                />
                            </div>
                        ))}

                        {/*Loyalty*/}
                        <div className="col-span-6 xl:col-span-4">
                            <div>
                                <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                    الولاء :
                                </h3>
                            </div>
                            <AutoComplete
                                style={{ width: '100%' }}
                                options={optionsLoyalty}
                                placeholder="الولاء"
                                value={searchTextLoyalty}

                                onChange={(text) => {
                                    setSearchTextLoyalty(text);
                                    setLoyaltyId(undefined);
                                }}
                                onSelect={(value, option) => {
                                    setLoyaltyId(option.value);
                                    setSearchTextLoyalty(option?.label as string);
                                }}
                                filterOption={(inputValue, option) =>
                                    (option?.label as string)
                                        ?.toLowerCase()
                                        .includes(inputValue.toLowerCase())
                                }
                            />
                        </div>


                        {/*Classification*/}
                        <div className="col-span-6 xl:col-span-4">
                            <div>
                                <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                    التصنيف :
                                </h3>
                            </div>
                            <AutoComplete
                                style={{ width: '100%' }}
                                options={optionsClassification}
                                placeholder="التصنيف"
                                value={searchTextClassification}

                                onChange={(text) => {
                                    setSearchTextClassification(text);
                                    setClassificationId(undefined);
                                }}
                                onSelect={(value, option) => {
                                    setClassificationId(option.value);
                                    setSearchTextClassification(option?.label as string);

                                }}
                                filterOption={(inputValue, option) =>
                                    (option?.label as string)
                                        ?.toLowerCase()
                                        .includes(inputValue.toLowerCase())
                                }
                            />
                        </div>

                        {/*Specialization*/}
                        <div className="col-span-6 xl:col-span-4">
                            <div>
                                <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
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
                                    setSpecializationId(undefined);
                                }}
                                onSelect={(value, option) => {

                                    setSpecializationId(option.value);
                                    setSearchTextSpecilization(option?.label as string);

                                }}
                                filterOption={(inputValue, option) =>
                                    (option?.label as string)
                                        ?.toLowerCase()
                                        .includes(inputValue.toLowerCase())
                                }
                            />
                        </div>



                        {/* DATE */}
                        <div className="col-span-12 md:col-span-6 ">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1 w-full">
                                تاريخ الميلاد
                            </h3>
                            <DatePicker className="w-full"
                                value={birth_date}
                                onChange={(e) => setBirthDate(e)}
                                placeholder="تاريخ الولادة " />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                               البريد الإلكتروني
                            </h3>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>
                        {/* ADMIN DESCRIPTION */}
                        <div className="col-span-12 sm:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                وصف الإدارة
                            </h3>
                            <TextArea
                                rows={4}
                                value={admin_description}
                                onChange={(e) => setAdminDescription(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* SALESMAN DESCRIPTION */}
                        <div className="col-span-12 sm:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                وصف المندوب
                            </h3>
                            <TextArea
                                rows={4}
                                value={salesman_description}
                                onChange={(e) => setSalesmanDescription(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <Button
                                type="default"
                                onClick={() => handleEdit()}
                            >
                                تعديل
                            </Button>
                        </div>

                    </div>
                </div>

            case "2":
                return <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 grid grid-cols-12 gap-4 rounded-xl bg-white p-5 shadow-md border border-gray-100">

                        {/* GOVERNORATE */}
                        <div className="col-span-12 md:col-span-3 sm:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                المحافظة
                            </h3>
                            <Input
                                value={governorate_id ?? ""}
                                onChange={(e) => setGovernorateId(Number(e.target.value))}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* CITY */}
                        <div className="col-span-12 md:col-span-3 sm:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                المدينة
                            </h3>
                            <Input
                                value={city_id ?? ""}
                                onChange={(e) => setCityId(Number(e.target.value))}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* AREA */}
                        <div className="col-span-12 md:col-span-3 sm:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                المنطقة
                            </h3>
                            <Input
                                value={area_id ?? ""}
                                onChange={(e) => setAreaId(Number(e.target.value))}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* STREET */}
                        <div className="col-span-12 md:col-span-3 sm:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                الشارع
                            </h3>
                            <Input
                                value={street_id ?? ""}
                                onChange={(e) => setStreetId(Number(e.target.value))}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* FULL PLACE */}
                        <div className="col-span-12">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                العنوان بالكامل
                            </h3>
                            <TextArea
                                rows={3}
                                value={full_place}
                                onChange={(e) => setFullPlace(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* CLOSE PLACE */}
                        <div className="col-span-12">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                أقرب مكان
                            </h3>
                            <TextArea
                                value={close_place}
                                onChange={(e) => setClosePlace(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>
                    </div>
                </div>
            case "3":
                return <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 grid grid-cols-12 gap-4 rounded-xl bg-white p-5 shadow-md border border-gray-100">

                        {/* WAITING TIME */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                مدة الانتظار
                            </h3>
                            <Input
                                value={waiting_time_id ?? ""}
                                onChange={(e) => setWaitingTimeId(Number(e.target.value))}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* AVERAGE PATIENTS */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                عدد المرضى يومياً
                            </h3>
                            <Input
                                value={average_patients_per_day ?? ""}
                                onChange={(e) => setAveragePatientsPerDay(Number(e.target.value))}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* FIRST SHIFT OPEN */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                بداية الدوام (الفترة الأولى)
                            </h3>
                            <Input
                                type="time"
                                value={first_work_time_opening}
                                onChange={(e) => FirstWorkTimeOpening(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* FIRST SHIFT CLOSE */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                نهاية الدوام (الفترة الأولى)
                            </h3>
                            <Input
                                type="time"
                                value={first_work_time_closing}
                                onChange={(e) => setFirstWorkTimeClosing(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* SECOND SHIFT OPEN */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                بداية الدوام (الفترة الثانية)
                            </h3>
                            <Input
                                type="time"
                                value={second_work_time_opening}
                                onChange={(e) => setSecondTimeOpening(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* SECOND SHIFT CLOSE */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                نهاية الدوام (الفترة الثانية)
                            </h3>
                            <Input
                                type="time"
                                value={second_work_time_closing}
                                onChange={(e) => setSecondWorkTimeClosing(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* FAVORITE TIME OPEN */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                أفضل وقت للزيارة (من)
                            </h3>
                            <Input
                                type="time"
                                value={favourite_time_opening}
                                onChange={(e) => setFavouriteTimeOpening(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* FAVORITE TIME CLOSE */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                أفضل وقت للزيارة (إلى)
                            </h3>
                            <Input
                                type="time"
                                value={favourite_time_closing}
                                onChange={(e) => setFavouriteTimeClosing(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                    </div>
                </div>
            case "4":
                return <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 grid grid-cols-12 gap-4 rounded-xl bg-white p-5 shadow-md border border-gray-100">

                        {/* PERSONALITY STRENGTHS */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                نقاط القوة في الشخصية
                            </h3>
                            <TextArea
                                rows={4}
                                value={personality_strengthens}
                                onChange={(e) => setpersonality_strengthens(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* INTERESTS */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                الاهتمامات
                            </h3>
                            <TextArea
                                rows={4}
                                value={interestes}
                                onChange={(e) => setInterestes(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* PERSONALITY TYPE */}
                        <div className="col-span-12 md:col-span-4">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                نوع الشخصية
                            </h3>
                            <Input
                                value={personality_type_id ?? ""}
                                onChange={(e) => setPersonalityTypeId(Number(e.target.value))}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* SOCIAL PATTERN */}
                        <div className="col-span-12 md:col-span-4">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                النمط الاجتماعي
                            </h3>
                            <Input
                                value={social_pattern_id ?? ""}
                                onChange={(e) => setSocial_pattern_id(Number(e.target.value))}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* SALESMAN RELATIONSHIP */}
                        <div className="col-span-12 md:col-span-4">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                علاقته بالمندوب
                            </h3>
                            <Input
                                value={salesman_relationship_id ?? ""}
                                onChange={(e) => setSalesman_relationship_id(Number(e.target.value))}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                    </div>
                </div>
            case "5":
                return <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 grid grid-cols-12 gap-4 rounded-xl bg-white p-5 shadow-md border border-gray-100">

                        {/* AVERAGE PATIENTS PER DAY */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                متوسط عدد المرضى يومياً
                            </h3>
                            <Input
                                value={average_patients_per_day ?? ""}
                                onChange={(e) => setAveragePatientsPerDay(Number(e.target.value))}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* EXPECTED RECIPES */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                عدد الروشتات المتوقعة
                            </h3>
                            <Input
                                value={expected_recipes ?? ""}
                                onChange={(e) => setExpectedRecipes(Number(e.target.value))}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* ADOPTED TYPES */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                الأنواع المعتمدة
                            </h3>
                            <TextArea
                                rows={3}
                                value={adopted_types}
                                onChange={(e) => setAdoptedTypes(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* PREFERRED TREATMENT TYPES */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                أنواع العلاج المفضلة
                            </h3>
                            <TextArea
                                rows={3}
                                value={preffered_treatment_types}
                                onChange={(e) => setpreffered_treatment_types(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* PREFERRED DIETARY TYPES */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                أنواع المكملات المفضلة
                            </h3>
                            <TextArea
                                rows={3}
                                value={preffered_dietary_types}
                                onChange={(e) => setpreffered_dietary_types(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* PREFERRED COMPANIES */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                الشركات المفضلة
                            </h3>
                            <TextArea
                                rows={3}
                                value={preffered_companies}
                                onChange={(e) => setpreffered_companies(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* COMPETITIVE TYPES */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                الأنواع المنافسة
                            </h3>
                            <TextArea
                                rows={3}
                                value={competitive_types}
                                onChange={(e) => setcompetitive_types(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* STANCE ON DIETARY SUPPLEMENTS */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                موقفه من المكملات الغذائية
                            </h3>
                            <TextArea
                                rows={3}
                                value={stance_on_dietary_supp}
                                onChange={(e) => setStanceOnDietarySupp(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                    </div>
                </div>
            default:
                return null;
        }
    };
    const tabsItems = [
        {
            label: <div>معلومات الطبيب</div>, key: "1",
        },
        {
            label: <div>معلومات العيادة</div>, key: "2",
        },
        {
            label: <div>مواعيد الدوام</div>, key: "3",
        },
        {
            label: <div>العلاقة والتفاعل</div>, key: "4",
        },
        {
            label: <div>البصمة الدوائية</div>, key: "5",
        }
    ]

    return (
        <div className="col-span-12">
            <ConfigProvider direction="rtl" >
                <Tabs
                    defaultActiveKey="1"
                    tabPlacement="top"
                    onChange={setActiveKey}
                    style={{ borderColor: "#592C46" }}
                    items={tabsItems}
                    tabBarStyle={{ height: 50, maxWidth: "100%", marginRight: 0 }}
                />
            </ConfigProvider>

            {pageLoading ? (
                <Skeleton className="h-full w-full" paragraph={{ rows: 10 }} />
            ) : (
                <div style={{ padding: 20, maxHeight: 200, maxWidth: "100%" }}>
                    {renderContent()}
                </div>
            )}
        </div>
    );


}