export const treeData = [
    {
      title: "Verbal test",
      value: "0-0",
      key: "0-0",
      children: [],
    },
    {
      title: "Numerical test",
      value: "0-1",
      key: "0-1",
      children: [],
    },
    {
      title: "Logical test",
      value: "0-2",
      key: "0-2",
      children: [],
    },
    {
      title: "Visual test",
      value: "0-3",
      key: "0-3",
      children: [],
    },
    {
      title: "Memory test",
      value: "0-4",
      key: "0-4",
      children: [],
    },
    {
      title: "Personality test",
      value: "0-5",
      key: "0-5",
      children: [],
    },
  ];

  export type treeData ={
    title: string,
    value: string,
    key: string,
    children: treeData[] 
   }