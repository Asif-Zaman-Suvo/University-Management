import { Button, Col, Row } from "antd";
import {
  useEnrollCourseMutation,
  useGetOfferedCourseQuery,
} from "../../redux/features/student/studentCourseManagement.api";

type TCourseAccumulator = {
  [index: string]: any;
};
const OfferedCourse = () => {
  const { data: offeredCourseData } = useGetOfferedCourseQuery(undefined);
  const [enroll] = useEnrollCourseMutation();

  const singleObject = offeredCourseData?.data?.reduce(
    (acc: TCourseAccumulator, item) => {
      const key = item?.course?.title;
      acc[key] = acc[key] || { courseTitle: key, sections: [] };
      acc[key].sections.push({
        section: item.section,
        _id: item._id,
        days: item?.days,
        startTime: item?.startTime,
        endTime: item?.endTime,
      });
      return acc;
    },
    {}
  );

  const modifiedData = Object.values(singleObject ? singleObject : {});
  console.log(modifiedData, "modified data");

  const handleEnroll = async (id) => {
    const enrollData = {
      offeredCourse: id,
    };
    const res = await enroll(enrollData);
    console.log(res);
  };

  if (!modifiedData.length) {
    return "No Available Courses";
  }

  return (
    <Row gutter={[0, 20]}>
      {modifiedData?.map((item: any) => {
        return (
          <Col span={24} style={{ border: "solid #d4d4d4 2px" }}>
            <div style={{ padding: "10px" }}>
              <h2>{item?.courseTitle}</h2>
            </div>
            <div>
              {item?.sections?.map((section: any) => {
                return (
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
                  >
                    <Col span={5}>Section: {section.section} </Col>
                    <Col span={5}>
                      days:{" "}
                      {section?.days?.map((day: any) => (
                        <span> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section?.startTime} </Col>
                    <Col span={5}>End Time: {section?.endTime} </Col>
                    <Button onClick={() => handleEnroll(section._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;
