const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');
const Activity = require('./models/Activity');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    await Activity.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    });

    const pm = await User.create({
      name: 'Project Manager',
      email: 'pm@example.com',
      password: 'password123',
      role: 'project_manager',
    });

    const member1 = await User.create({
      name: 'John Developer',
      email: 'john@example.com',
      password: 'password123',
      role: 'team_member',
    });

    const member2 = await User.create({
      name: 'Jane Designer',
      email: 'jane@example.com',
      password: 'password123',
      role: 'team_member',
    });

    console.log('Created users');

    // Create projects
    const project1 = await Project.create({
      name: 'E-Commerce Platform',
      description: 'Build a full-featured e-commerce platform with React and Node.js',
      owner: pm._id,
      members: [member1._id, member2._id],
      status: 'active',
    });

    const project2 = await Project.create({
      name: 'Mobile App Redesign',
      description: 'Redesign the mobile app UI/UX for better user experience',
      owner: pm._id,
      members: [member2._id],
      status: 'active',
    });

    console.log('Created projects');

    // Create tasks
    const tasks = await Task.insertMany([
      {
        title: 'Setup project structure',
        description: 'Initialize React app with proper folder structure',
        project: project1._id,
        assignedTo: member1._id,
        status: 'completed',
        priority: 'high',
        dueDate: new Date('2026-02-15'),
      },
      {
        title: 'Design database schema',
        description: 'Create MongoDB schemas for products, orders, users',
        project: project1._id,
        assignedTo: member1._id,
        status: 'in_progress',
        priority: 'high',
        dueDate: new Date('2026-02-20'),
      },
      {
        title: 'Create product listing page',
        description: 'Implement product grid with filtering and sorting',
        project: project1._id,
        assignedTo: member1._id,
        status: 'todo',
        priority: 'medium',
        dueDate: new Date('2026-02-25'),
      },
      {
        title: 'Design checkout flow',
        description: 'Create wireframes for the checkout process',
        project: project1._id,
        assignedTo: member2._id,
        status: 'review',
        priority: 'high',
        dueDate: new Date('2026-02-18'),
      },
      {
        title: 'Create new app icons',
        description: 'Design new icons for the mobile app',
        project: project2._id,
        assignedTo: member2._id,
        status: 'in_progress',
        priority: 'medium',
        dueDate: new Date('2026-02-22'),
      },
      {
        title: 'User research interviews',
        description: 'Conduct user interviews for feedback',
        project: project2._id,
        assignedTo: member2._id,
        status: 'todo',
        priority: 'low',
        dueDate: new Date('2026-03-01'),
      },
    ]);

    console.log('Created tasks');

    // Create activities
    await Activity.insertMany([
      {
        action: 'project_created',
        description: 'Project "E-Commerce Platform" was created',
        user: pm._id,
        project: project1._id,
      },
      {
        action: 'project_created',
        description: 'Project "Mobile App Redesign" was created',
        user: pm._id,
        project: project2._id,
      },
      {
        action: 'task_created',
        description: 'Task "Setup project structure" was created',
        user: pm._id,
        project: project1._id,
        task: tasks[0]._id,
      },
      {
        action: 'task_status_changed',
        description: 'Task "Setup project structure" status changed to completed',
        user: member1._id,
        project: project1._id,
        task: tasks[0]._id,
      },
    ]);

    console.log('Created activities');

    console.log('\n========================================');
    console.log('Seed data created successfully!');
    console.log('========================================');
    console.log('\nTest Accounts:');
    console.log('----------------------------------------');
    console.log('Admin:           admin@example.com / password123');
    console.log('Project Manager: pm@example.com / password123');
    console.log('Team Member:     john@example.com / password123');
    console.log('Team Member:     jane@example.com / password123');
    console.log('----------------------------------------\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
