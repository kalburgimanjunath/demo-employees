const Employee = require('../model/Employee'); 

const mockEmployees = [
  {
    id: "1",
    name: "John Doe",
    age: 30,
    class: "A",
    subjects: ["Math", "Science"],
    attendance: "Present"
  }
];

const resolvers = {
  Query: {
    // Get single employee by ID from MongoDB
    getEmployee: async (_, { id }) => {
      try {
        const employee = await Employee.findById(id);
        if (!employee) throw new Error("Employee not found");
        return employee;
      } catch (error) {
        console.error("Error in getEmployee:", error);
        throw new Error("Failed to fetch employee");
      }
    },

    // List employees: Use MongoDB OR mock as fallback
    listEmployees: async (_, { filter = {}, page = 1, limit = 10, sortBy = "name", sortOrder = "asc" }) => {
      try {
        const query = {};

        // Apply filters if provided
        if (filter.name) query.name = { $regex: filter.name, $options: 'i' };
        if (filter.class) query.class = filter.class;
        if (filter.attendance) query.attendance = filter.attendance;

        const skip = (page - 1) * limit;
        const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

        const employees = await Employee.find(query).skip(skip).limit(limit).sort(sort);
        return employees.length ? employees : [];
      } catch (error) {
        console.error("Error fetching employees from DB, using mock:", error);
        // fallback to mock data
        return mockEmployees;
      }
    }
  },

  Mutation: {
    // Add employee to DB
    addEmployee: async (_, { input }, context) => {
      if (context.role !== 'admin') throw new Error('Unauthorized');
      try {
        const newEmployee = await Employee.create(input);
        return newEmployee;
      } catch (error) {
        console.error("Error in addEmployee:", error);
        throw new Error("Failed to add employee");
      }
    },

    // Update employee in DB
    updateEmployee: async (_, { id, input }, context) => {
      if (context.role !== 'admin') throw new Error('Unauthorized');
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, input, { new: true });
        if (!updatedEmployee) throw new Error("Employee not found");
        return updatedEmployee;
      } catch (error) {
        console.error("Error in updateEmployee:", error);
        throw new Error("Failed to update employee");
      }
    },
  }
};

module.exports = resolvers;
