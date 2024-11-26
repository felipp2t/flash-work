import { create } from "zustand";
interface ProfileFormState {
  formData: {
    name: string;
    description: string;
    phone: string;
    cpf: string;
    email: string;
    profilePicture: File | null;
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
    cpf: "",
    email: "",
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
        cpf: data.formData?.cpf || "",
        email: data.formData?.email || "",
      },
    })),
}));
