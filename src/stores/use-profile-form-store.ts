import { create } from "zustand";
interface ProfileFormState {
  formData: {
    name: string;
    description: string;
    phone: string;
    cpf: string;
    email: string;
    profileImage: string | null;
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
    profileImage: null,
    education: [],
  },
  setFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        description: data.formData?.description || "",
        name: data.formData?.name || "",
        phone: data.formData?.phone || "",
        profileImage: data.formData?.profileImage || null,
        cpf: data.formData?.cpf || "",
        email: data.formData?.email || "",
      },
    })),
}));
