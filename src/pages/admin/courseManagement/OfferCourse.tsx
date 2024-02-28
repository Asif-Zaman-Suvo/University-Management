import { Button, Col, Flex } from "antd";

import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import PhForm from "../../../components/form/PhForm";
import PhSelectWithWatch from "../../../components/form/PhSelectWithWatch";
import PhInput from "../../../components/form/PhInput";

const OfferCourse = () => {
  const [id, setId] = useState("");

  console.log("Inside parent component", id);

  const { data: academicFacultyData } = useGetAcademicFacultyQuery(undefined);

  const academicSemesterOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm onSubmit={onSubmit}>
          <PhSelectWithWatch
            onValueChange={setId}
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <PhInput disabled={!id} type="text" name="test" label="Test" />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
