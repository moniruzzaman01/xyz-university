import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import Course from "./course.model";
import { TCourse } from "./course.type";

const createACourseIntoDB = async (payload: TCourse) => {
  return await Course.create(payload);
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  return await new QueryBuilder(Course.find(), query)
    .search(["title", "prefix", "code"])
    .filter()
    .sort()
    .pagination()
    .projection()
    .build();
};

const getACourseFromDB = async (id: string) => {
  return await Course.findById(id);
};

const deleteACourseFromDB = async (id: string) => {
  return await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

const updateACourseFromDB = async (id: string, payload: Partial<TCourse>) => {
  const { prerequisiteCourses, ...remaining } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const needsToDeleted = prerequisiteCourses
      ? prerequisiteCourses
          .filter((pq) => pq.isDeleted) //filterd data where isdeleted true
          .map((pq) => new mongoose.Types.ObjectId(pq.course)) //format the data to store in the db new ObjectId("id")
      : [];

    if (needsToDeleted.length) {
      await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            prerequisiteCourses: { course: { $in: needsToDeleted } },
          },
        },
        { new: true, session }
      );
    }

    const storedData = await Course.findById(id);
    const existingPrerequisite = storedData?.prerequisiteCourses?.map((pq) =>
      pq.course.toString()
    );

    const needsToBeAdded = prerequisiteCourses
      ? prerequisiteCourses
          ?.filter((pq) => !pq.isDeleted) //filterd data where isdeleted false or isdelete null
          .filter((pq) => !existingPrerequisite?.includes(pq.course.toString())) //check the data already exist in the db or not
          .map((pq) => ({
            //format the data to store in the db {course:"id", isDeleted:boolean}
            course: new mongoose.Types.ObjectId(pq.course),
            isDeleted: false,
          }))
      : [];

    const finalResult = await Course.findByIdAndUpdate(
      id,
      {
        ...remaining,
        ...(needsToBeAdded && {
          $addToSet: {
            prerequisiteCourses: { $each: needsToBeAdded },
          },
        }),
      },
      { new: true, session }
    );

    await session.commitTransaction();
    await session.endSession();
    return finalResult;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const courseServices = {
  createACourseIntoDB,
  getAllCoursesFromDB,
  getACourseFromDB,
  deleteACourseFromDB,
  updateACourseFromDB,
};
