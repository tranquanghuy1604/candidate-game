// import archiveAssessmentApi from "@/api/archiveAssessment";
// import { create } from "zustand";

// interface AssessmentStore {
//   data: []; // Danh sách assessment đang hoạt động
//   dataArchived: []; // Danh sách assessment đã lưu trữ
//   handleArchivedAssessment: (id: number) => Promise<void>; // Hàm xử lý lưu trữ
// }


// const useAssessmentStore = create<AssessmentStore>((set) => ({
//   data: null,
//   dataArchived: null,
// }))

// export default useAssessmentStore

import getListAssessment from "@/api/hr/listAssessment";
import create from "zustand";


interface State {
  isLoading: boolean,
  data: any;
  dataArchive: any
  listAssessment: () => Promise<void>;
  listAssessmentArchive: () => Promise<void>;
}

const useStore = create<State>((set) => ({
  isLoading: false,
  data: null,
  dataArchive: null,
  listAssessment: async () => {
    try {
      const res = await getListAssessment.handleGetListAssessmentApi({status: 1});
      set((state: State) => ({
        ...state,
        data: res?.data?.data?.assessments,
        isLoading: true
      }));
      
    } catch (error: any) {
      set((state: State) => ({
        ...state,
        isLoading:false
      }));
    }
  },
  listAssessmentArchive: async () => {
    try {
      const res = await getListAssessment.handleGetListAssessmentApi({status: 0});
      set((state: State) => ({
        ...state,
        dataArchive: res?.data?.data?.assessments,
      }));
    } catch (error: any) {
      set((state: State) => ({
        ...state,
      }));
    }
  },
}));

export default useStore;