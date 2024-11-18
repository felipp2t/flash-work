import { getUserById } from "@/http/user/get-user-by-id";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { School } from "lucide-react";
import { useParams } from "react-router-dom";

export const UserPage = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["get-user-by-id", id],
    queryFn: async () => {
      if (id) {
        return await getUserById({ userId: id });
      }
    },
  });

  if (!data) return;

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader className="flex flex-col items-center space-y-4">
        <Avatar className="h-32 w-32">
          <AvatarImage src={data.user.profession} alt={data.user.name} />
          <AvatarFallback>
            {data.user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-center text-2xl font-bold">{data.user.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-center text-muted-foreground">{data.user.description}</p>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Formação Acadêmica</h3>
          <ul className="space-y-3">
            {data.user..map((institution, index) => (
              <li key={index} className="flex items-start space-x-3">
                <School className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{institution.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {institution.years}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
