export default [
    {
        id: 1,
        name: "Task Management",
        slug: "task-management",
        description: "A simple task management app",
        coverImage: "src/assets/images/project1.jpg",
        technologies: ["React", "Tailwind CSS"],
        lists: [
            {
                id: 1,
                name: "Planning",
                slug: "planning",
                cards: [
                    {
                        id: 1,
                        title: "Planning Task 1",
                        description: "Description of task 1",
                        dueDate: "2021-12-31",
                        assigned: [],
                        status: "planning",
                        tags: ["important", "critical"]
                    },
                    {
                        id: 2,
                        title: "Planning Task 2",
                        description: "Description of task 2",
                        dueDate: "2021-12-31",
                        assigned: [],
                        status: "planning",
                        tags: ["urgent", "feature"]
                    }
                ]
            },
            {
                id: 2,
                name: "Todo",
                slug: "todo",
                cards: [
                    {
                        id: 1,
                        title: "Todo Task 1",
                        description: "Description of task 1",
                        dueDate: "2021-12-31",
                        assigned: ["Sinisa"],
                        status: "todo",
                        tags: ["important", "critical"]

                    },
                    {
                        id: 2,
                        title: "Todo Task 2",
                        description: "Description of task 2",
                        dueDate: "2021-12-31",
                        assigned: ["Sinisa", "sm"],
                        status: "todo",
                        tags: ["urgent", "bug"]
                        
                    },
                    {
                        id: 3,
                        title: "Todo Task 3",
                        description: "Description of task 3",
                        dueDate: "2021-12-31",
                        assigned: ["Sinisa"],
                        status: "todo",
                        tags: ["default"]
                        
                    }
                ]
            },
            {
                id: 3,
                name: "Done",
                slug: "done",
                cards: [
                    {
                        id: 1,
                        title: "Done Task 5",
                        description: "Description of task 5",
                        dueDate: "2021-12-31",
                        assigned: ["Sinisa"],
                        status: "done",
                        tags: ["important", "critical"]
                    },
                ]
            },
        ]

    }   
]