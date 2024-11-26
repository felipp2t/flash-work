import { Education } from "@/@types/education";
import { create } from "zustand";
interface ProfileFormState {
  formData: {
    name: string;
    description: string;
    phone: string;
    profilePicture: File | null;
    education: Education[];
  };
}

interface ProfileFormActions {
  setFormData: (data: Partial<ProfileFormState>) => void;
}

type ProfileFormStore = ProfileFormState & ProfileFormActions;

export const useProfileFormStore = create<ProfileFormStore>((set) => ({
  formData: {
    name: "",
    description: "",
    phone: "",
    profilePicture: null,
    education: [],
  },
  setFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        description: data.formData?.description || "",
        name: data.formData?.name || "",
        phone: data.formData?.phone || "",
        profilePicture: data.formData?.profilePicture || null,
        education: data.formData?.education || [],
      },
    })),
}));
