import { IResolvers } from 'graphql-tools';
import { database } from '../data/data.store';

const query: IResolvers = {
  Query: {
    students(): any {
      return database.students;
    },

    student(__: void, { id }): any {
      const result = database.students.filter(student => student.id === id)[0];
      if (result === undefined) {
        return {
          id: '-1',
          name: `The user with ID: ${id} not found`,
          email: '',
          courses: []
        };
      }
      return result;
    },

    courses(): any {
      return database.courses;
    },

    course(__: void, { course }): any {
      const result = database.courses.filter(course_ => course_.id === course)[0];
      if (result === undefined) {
        return {
          id: '-1',
          title: `The course with ID: ${course} not found`,
          description: '',
          clases: -1,
          time: 0.0,
          logo: '',
          level: 'ALL_LEVELS',
          path: '',
          teacher: '',
          reviews: []
        };
      }
      return result;
    },
  }
}

export default query;