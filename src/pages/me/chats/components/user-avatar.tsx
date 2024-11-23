import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserById } from "@/http/user/get-user-by-id";
import { useQuery } from "@tanstack/react-query";

interface UserAvatarProps {
  userId: string;
}

export const UserAvatar = ({ userId }: UserAvatarProps) => {
  const { data } = useQuery({
    queryKey: ["get-user-by-id", userId],
    queryFn: async () => await getUserById({ userId }),
    staleTime: 1000 * 60 * 15,
  });

  if (!data) return;

  return (
    <>
      <Avatar className="size-10">
        <AvatarImage src={data.user.profilePicture} alt={data.user.name} />
        <AvatarFallback>{data.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="ml-4 flex-1 overflow-hidden">
        <p className="font-medium">{data.user.name}</p>
      </div>
    </>
  );
};
