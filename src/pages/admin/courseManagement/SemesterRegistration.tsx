import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import { Button, Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { TResponse } from "../../../constants/global";
import { semesterStatusOptions } from "../../../constants/semester";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import PhDatePicker from "../../../components/form/PhDatePicker";
import PhInput from "../../../components/form/PhInput";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";

const SemesterRegistration = () => {
  const { data: academicSemester } = useGetAllAcademicSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();
  console.log(academicSemester);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating....");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    try {
      const res = (await addSemesterRegistration(
        semesterData
      )) as TResponse<any>;
      console.log(res, "api res");
      if (res?.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }

    console.log(semesterData, "datasemester");
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm onSubmit={onSubmit}>
          <PhSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <PhSelect
            label="Status"
            name="status"
            options={semesterStatusOptions}
          />

          <PhDatePicker name="startDate" label="Start Date" />
          <PhDatePicker name="endDate" label="End Date" />
          <PhInput type="text" name="minCredit" label="Min Credit" />
          <PhInput type="text" name="maxCredit" label="Max Credit" />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
