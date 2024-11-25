import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserById } from "@/http/user/get-user-by-id";
import { useQuery } from "@tanstack/react-query";

interface UserChatProps {
  userId: string;
}

export const UserChatHeader = ({ userId }: UserChatProps) => {
  const { data } = useQuery({
    queryKey: ["get-user-by-id", userId],
    queryFn: async () => await getUserById({ userId }),
    staleTime: 1000 * 60 * 15,
  });

  if (!data) return;

  return (
    <div className="flex h-20 bg-[#181616] items-center border-b p-4">
      <Avatar className="size-10">
        <AvatarImage src={data.user.profilePicture} alt={data.user.name} />
        <AvatarFallback>{data.user.name[0]}</AvatarFallback>
      </Avatar>

      <h2 className="ml-4 text-xl font-semibold">{data.user.name}</h2>
    </div>
  );
};
