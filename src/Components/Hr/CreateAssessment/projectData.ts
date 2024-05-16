export const projectData  = [
      {
        projectId: 29,
        projectName: "Developer",
        description: "Developer",
        parent: "null",
      },
      {
        projectId: 31,
        projectName: "Quality control",
        description: "Quality control",
        parent: "null",
        children: [
          {
            projectId: 33,
            projectName: "C-level executive",
            description: "C-level executive",
          },
          {
            projectId: 34,
            projectName: "Director",
            description: "Director",
          },
          {
            projectId: 35,
            projectName: "Junior / Trainee",
            description: "Junior / Trainee",
          },
          {
            projectId: 36,
            projectName: "Manager",
            description: "Manager",
          },
          {
            projectId: 37,
            projectName: "Intern",
            description: "Intern",
          },
        ]
      },
      {
        projectId: 38,
        projectName: "Accounting",
        description: "Accounting",
        parent: "null",
      },
      {
        projectId: 39,
        projectName: "Product Owner",
        description: "Product Owner",
        parent: "null",
      },
      {
        projectId: 40,
        projectName: "Talent Acquisition",
        description: "Talent Acquisition",
        parent: "null",
      },
      {
        projectId: 41,
        projectName: "Other",
        description: "Other",
        parent: "null",
      },
]

export const treeData = [
  {
    id: 0,
    title: "Verbal test",
    value: "Verbal test",
    children: [],
  },
  {
    id:1,
    title: "Numerical test",
    value: "Numerical test",
    children: [],
  },
  {
    id:2,
    title: "Logical test",
    value: "Logical test",
    children: [],
  },
  {
    id:3,
    title: "Visual test",
    value: "Visual test",
    children: [],
  },
  {
    id:4,
    title: "Memory test",
    value: "Memory test",
    children: [],
  },
  // {
  //   title: "Personality test",
  //   value: "Personality test",
  //   children: [],
  // },
];



export type treeData ={
 title: string,
 value: string,
 key: string,
 children: treeData[] 
}


export type ProjectData = {
    key?: number;
    projectId: number;
    projectName: string;
    description: string;
    level: number;
    parent?: string;
    parentId: number;
    children: ProjectData[];
  };
  