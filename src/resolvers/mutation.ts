import { IResolvers } from 'graphql-tools';
import _ from 'lodash';
import { database } from '../data/data.store';

const mutation: IResolvers = {
  Mutation: {
    newCourse(__: void, { course }): any {
      const ItemCourse = {
        id: String(database.courses.length + 1),
        title: course.title,
        description: course.description,
        clases: course.clases,
        time: course.time,
        level: course.level,
        logo: course.logo,
        path: course.path,
        teacher: course.teacher,
        reviews: []
      }
      if (database.courses.filter(itemCours => itemCours.title === ItemCourse.title).length === 0) {
        database.courses.push(ItemCourse);
        return ItemCourse;
      }
      return {
        id: '-1',
        title: 'This course exist with this title',
        description: '',
        clases: -1,
        time: 0.0,
        level: 'ALL_LEVELS',
        logo: '',
        path: '',
        teacher: '',
        reviews: []
      };
    },
    modifyCourse(__: void, { course }): any {
      const elementExist = _.findIndex(database.courses, function (o) {
        return o.id === course.id
      });

      if (elementExist > -1) {
        const review = database.courses[elementExist].reviews;
        course.reviews = review;
        database.courses[elementExist] = course;
        return course;
      }
      return {
        id: '-1',
        title: "This course doesn't exist on the database",
        description: '',
        clases: -1,
        time: 0.0,
        level: 'ALL_LEVELS',
        logo: '',
        path: '',
        teacher: '',
        reviews: []
      };
    },
    deleteCourse(__: void, { id }): any {
      const deleteCourse = _.remove(database.courses, function (course) {
        return course.id === id;
      });

      if (deleteCourse[0] === undefined) {
        return {
          id: '-1',
          title: "This course couldn't be deleted because it doesn't exist",
          description: '',
          clases: -1,
          time: 0.0,
          level: 'ALL_LEVELS',
          logo: '',
          path: '',
          teacher: '',
          reviews: []
        };
      }
      return deleteCourse[0];
    }
  }
}

export default mutation;