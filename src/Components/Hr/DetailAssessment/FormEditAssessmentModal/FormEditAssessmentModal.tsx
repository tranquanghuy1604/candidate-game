import editAssessmentApi from "@/api/hr/editAssessment";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Cascader, Input } from "antd";
import { Moment } from "moment";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as yup from "yup";
import { projectData } from "../../CreateAssessment/projectData";
import FormDatePicker from "./FormDatePicker";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import detailAssessmentApi from "@/api/hr/detailAssessment";

interface FormEditAssessmentModalProps {
  onClose: () => void;
  listCandidate: any;
}

const schema = yup.object().shape({
  assessmentName: yup.string().required("Không được để trống"),
  positionHiring: yup.array().required("Vui lòng chọn một giá trị!"),
});

export default function FormEditAssessmentModal({
  onClose,
  listCandidate,
}: FormEditAssessmentModalProps) {
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

  const params = useParams();

  const handleDateChange = (dates: [Moment | null, Moment | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const editAssessmentMutation = useMutation(
    editAssessmentApi.handleEditAssessmentApi,
    {
      onSuccess: async (data) => {
        queryClient.invalidateQueries(["activeAssessments"]);
        toast.success("Sửa thành công");
        onClose();
      },
      onError: (error) => {
        console.log(error);
        toast.error("Sửa thất bại");
      },
    }
  );

  const onSubmit = async (data: any) => {
    console.log(data);
    const formattedStartDate = startDate
      ? startDate.format("DD-MM-YYYY HH:mm:ss")
      : "";
    const formattedEndDate = endDate
      ? endDate.format("DD-MM-YYYY HH:mm:ss")
      : "";

    const formData = new FormData();

    setLoading(true);
    if (data?.positionHiring.includes("Other")) {
      // formData.append("name", data?.assessmentName);
      // formData.append("job_function", data?.positionHiring[0]);
      // formData.append("job_position", valueOther);
      // formData.append("start_date", formattedStartDate);
      // formData.append("end_date", formattedEndDate);
      editAssessmentMutation.mutate({
        assessment_id: Number(params?.assessment_id),
        name: data?.assessmentName,
        job_function: data?.positionHiring[0],
        job_position: valueOther,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      });
    } else {
      // formData.append("name", data?.assessmentName);
      // formData.append("job_function", data?.positionHiring[0]);

      // formData.append("job_position", data?.positionHiring[1]);
      // formData.append("start_date", formattedStartDate);
      // formData.append("end_date", formattedEndDate);
      editAssessmentMutation.mutate({
        assessment_id: Number(params?.assessment_id),
        name: data?.assessmentName,
        job_function: data?.positionHiring[0],
        job_position: data?.positionHiring[1],
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      });
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
          <div className="mb-4">
            <Controller
              name="assessmentName"
              control={control}
              defaultValue={listCandidate?.name}
              render={({ field }) => (
                <Input {...field} className="w-full py-[10px]" />
              )}
            />
            {errors["assessmentName"] && listCandidate?.name === "" && (
              <span className="text-red-500">
                {errors["assessmentName"].message}
              </span>
            )}
          </div>
        </div>

        <div className="mt-[20px]">
          <label className="block text-[16px] font-[500] leading-[24px]">
            Position recruiting *
          </label>
          <Cascader
            defaultValue={[
              listCandidate?.job_function,
              listCandidate?.job_position,
            ]}
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

          {errors?.positionHiring && listCandidate?.job_function === "" && (
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

        <FormDatePicker
          listCandidate={listCandidate}
          onDateChange={handleDateChange}
        />

        <Button
          className="w-full mt-[40px] h-[40px]"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Save
        </Button>
      </form>
    </div>
  );
}
