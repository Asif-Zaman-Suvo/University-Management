import { useGetAllAcademicSemestersQuery } from "../../../redux/features/academicSemesters/academicSemestersApi";

const AcademicSemester = () => {
  const { data } = useGetAllAcademicSemestersQuery(undefined);

  console.log(data, "+>Data");
  return (
    <div>
      <h1>This is AcademicSemester component</h1>
    </div>
  );
};

export default AcademicSemester;
