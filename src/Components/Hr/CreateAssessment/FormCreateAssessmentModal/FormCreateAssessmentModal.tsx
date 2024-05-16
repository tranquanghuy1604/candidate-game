import createAssessmentApi from "@/api/hr/createAssessment";
import getListGameApi from "@/api/hr/getListGame";
import InputField from "@/common/Controller/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Cascader, Input } from "antd";
import { Moment } from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { projectData } from "../projectData";
import FormDatePicker from "./FormDatePicker";
import SelectTest from "./SelectTest";
import useStore from "@/zustand/assessmentStore";
import { useMutation, useQuery, useQueryClient } from "react-query";

const schema = yup.object().shape({
  assessmentName: yup.string().required("Không được để trống"),
  positionHiring: yup.array().required("Vui lòng chọn một giá trị!"),
  selectTest: yup.array().required("Vui lòng chọn một giá trị"),
});

export default function FormCreateAssessmentModal({ onClose }: any) {
  const displayRender = (label: string[]) => label.join(" - ");
  const [selectedValue, setSelectedValue] = useState(null);
  const [showAdditionalField, setShowAdditionalField] = useState(false);
  const [valueList, setValueList] = useState([]);
  const [selectedValueRadioButton, setSelectValueRadioButton] = useState("");
  const [valueOther, setValueOther] = useState("");
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [listGame, setListGame] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: "listGame",
    queryFn: getListGameApi.getListGameApi,
  });

  // console.log(data?.data?.data?.games);

  useEffect(() => {
    if (data) {
      setListGame(data?.data?.data?.games);
    }
  }, [data]);

  const {
    reset,
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChangeOther = (value: any) => {
    setValueOther(value);
  };

  const handleDateChange = (dates: [Moment | null, Moment | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // const { data: createAssessment } = useQuery({
  //   queryKey: ["createAssessment"],
  //   queryFn: createAssessmentApi.handleCreateAssessmentApi,
  // });

  const createAssessmentMutation = useMutation(
    createAssessmentApi.handleCreateAssessmentApi,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["activeAssessments"]);
        onClose();
        toast.success("Thêm thành công");
      },
      onError: (error) => {
        console.log(error);
        toast.error("Thêm thất bại");
      },
    }
  );
  // console.log(listGame);

  const onSubmit = async (data: any) => {
    const formattedStartDate = startDate
      ? startDate.format("DD-MM-YYYY HH:mm:ss")
      : "";
    const formattedEndDate = endDate
      ? endDate.format("DD-MM-YYYY HH:mm:ss")
      : "";

    const filterIdGame = valueList
      .map((item) => {
        const game = listGame.find((game: any) => game?.name === item);
        return game ? game?.id : null;
      })
      .filter((id) => id !== null);

    const params: any = {
      game: filterIdGame.map((item) => ({
        game_id: [item],
        option: [],
      })),
    };

    const formData = new FormData();

    setLoading(true);
    if (data?.positionHiring.includes("Other")) {
      formData.append("name", data?.assessmentName);
      formData.append("job_function", data?.positionHiring[0]);
      params?.game.forEach((items: any, index: number) => {
        formData.append(`game[${index}][game_id]`, items.game_id);
        formData.append(`game[${index}][option]`, items.option);
      });
      formData.append("job_position", valueOther);
      formData.append("start_date", formattedStartDate);
      formData.append("end_date", formattedEndDate);
      await createAssessmentMutation.mutateAsync(formData);
    } else {
      formData.append("name", data?.assessmentName);
      formData.append("job_function", data?.positionHiring[0]);
      console.log(params?.game);
      params?.game.forEach((items: any, index: number) => {
        console.log(items);
        formData.append(`game[${index}][game_id]`, items.game_id);
        formData.append(`game[${index}][option]`, items.option);
      });
      formData.append("job_position", data?.positionHiring[1]);
      formData.append("start_date", formattedStartDate);
      formData.append("end_date", formattedEndDate);
      await createAssessmentMutation.mutateAsync(formData);
    }
  };

  const handleCascaderChange = (value: any) => {
    setSelectedValue(value);
    setValue("positionHiring", value);
    setShowAdditionalField(value && value.length > 0 && value[0] === "Other");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-[16px] font-[500] leading-[24px]">
            Your assessment name *
          </label>
          <InputField
            name="assessmentName"
            control={control}
            placeholder="Assessment Name"
            errors={errors}
          />
        </div>
        <SelectTest
          valueList={valueList}
          setValueList={setValueList}
          selectedValueRadioButton={selectedValueRadioButton}
          setSelectValueRadioButton={setSelectValueRadioButton}
          setValue={setValue}
          errors={errors}
          listGame={listGame}
          register={register}
        />
        <div className="mt-[20px]">
          <label className="block text-[16px] font-[500] leading-[24px]">
            Position recruiting *
          </label>
          <Cascader
            placeholder="List of huring"
            options={projectData}
            fieldNames={{
              label: "projectName",
              value: "projectName",
              children: "children",
            }}
            expandTrigger="hover"
            allowClear
            showSearch
            displayRender={displayRender}
            {...register("positionHiring")}
            style={{ width: "100%", minHeight: "56px" }}
            onChange={handleCascaderChange}
          />
          {/* <Input type="text" className="min-h-[56px]" /> */}
          {errors?.positionHiring && (
            <span className="text-red-500">
              {errors?.positionHiring.message}
            </span>
          )}
        </div>
        {showAdditionalField && (
          <div className="mt-[20px]">
            <label className="block text-[16px] font-[500] leading-[24px]">
              Specify “Other” position
            </label>
            <Input
              placeholder="example: Sales - Senior Excutive"
              value={valueOther}
              className="h-[56px] w-full mt-[5px]"
              onChange={(e: any) => handleChangeOther(e.target.value)}
            />
          </div>
        )}

        <FormDatePicker onDateChange={handleDateChange} />

        <Button
          className="w-full mt-[40px] h-[40px]"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Create
        </Button>
      </form>
    </div>
  );
}
