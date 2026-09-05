export const initialProjects = [
  {
    id: 'p1',
    name: 'Website Redesign',
    description: 'Redesign corporate website with modern look and mobile responsiveness.',
    color: 'blue',
    createdAt: '2026-08-01',
    members: ['u1', 'u2'],
  },
  {
    id: 'p2',
    name: 'Mobile App',
    description: 'Cross-platform mobile app for customers.',
    color: 'green',
    createdAt: '2026-08-10',
    members: ['u2', 'u3'],
  },
  {
    id: 'p3',
    name: 'API Development',
    description: 'Build REST APIs for internal services.',
    color: 'orange',
    createdAt: '2026-08-15',
    members: ['u1', 'u3'],
  },
]

export const initialTasks = [
  {
    id: 't1',
    title: 'Design homepage hero section',
    description: 'Create a compelling hero banner for the homepage.',
    projectId: 'p1',
    status: 'todo',
    priority: 'high',
    assignee: 'u1',
    createdAt: '2026-08-02',
  },
  {
    id: 't2',
    title: 'Implement responsive navbar',
    description: 'Navbar should collapse into hamburger on mobile.',
    projectId: 'p1',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'u2',
    createdAt: '2026-08-03',
  },
  {
    id: 't3',
    title: 'Set up login screen',
    description: 'Login form with validation and error handling.',
    projectId: 'p2',
    status: 'todo',
    priority: 'high',
    assignee: 'u2',
    createdAt: '2026-08-11',
  },
  {
    id: 't4',
    title: 'Create user profile API',
    description: 'GET and PUT endpoints for user profile.',
    projectId: 'p3',
    status: 'done',
    priority: 'low',
    assignee: 'u3',
    createdAt: '2026-08-16',
  },
  {
    id: 't5',
    title: 'Deploy to staging',
    description: 'Deploy latest build to staging environment.',
    projectId: 'p3',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'u1',
    createdAt: '2026-08-17',
  },
]

export const initialMembers = [
  { id: 'u1', name: 'Amit Sharma', role: 'Developer', avatarColor: 'bg-blue-600' },
  { id: 'u2', name: 'Priya Verma', role: 'Designer', avatarColor: 'bg-green-600' },
  { id: 'u3', name: 'Rahul Gupta', role: 'Tester', avatarColor: 'bg-purple-600' },
]

export const initialComments = [
  {
    id: 'c1',
    taskId: 't1',
    author: 'u2',
    text: 'Pehle ek hero section ka design high resolution mein bhej dijiye.',
    createdAt: '2026-08-02T10:30:00',
  },
  {
    id: 'c2',
    taskId: 't1',
    author: 'u1',
    text: 'Design approve ho gaya, ab implementation shuru karte hain.',
    createdAt: '2026-08-03T09:15:00',
  },
  {
    id: 'c3',
    taskId: 't3',
    author: 'u3',
    text: 'Login validation ka test case likh raha hoon.',
    createdAt: '2026-08-12T14:00:00',
  },
]

export const initialNotifications = [
  {
    id: 'n1',
    type: 'assign',
    text: 'Priya Verma ne aapko "Set up login screen" task assign kiya.',
    time: '2 min ago',
    read: false,
  },
  {
    id: 'n2',
    type: 'comment',
    text: 'Rahul Gupta ne "Create user profile API" par comment kiya.',
    time: '25 min ago',
    read: false,
  },
  {
    id: 'n3',
    type: 'status',
    text: '"Deploy to staging" task Done move ho gaya.',
    time: '1 hour ago',
    read: true,
  },
  {
    id: 'n4',
    type: 'project',
    text: 'Naya project "Mobile App" create hua.',
    time: '3 hours ago',
    read: true,
  },
]

export const notificationIcons = {
  assign: '👤',
  comment: '💬',
  status: '✅',
  project: '📁',
}
