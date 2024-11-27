import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { WORK_TYPE } from "@/constants/work-type";
import { getServiceById } from "@/http/services/get-service-by-id";
import { hanldeSplitBudget } from "@/utils/split-budget";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Undo2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateChatButton } from "./components/create-chat-button";
import { LocationBadge } from "./components/location-badge";
import { ProposalForm } from "./components/proposal-form";

export const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { data } = useQuery({
    queryKey: ["get-service-by-id", id],
    queryFn: async () => {
      if (id) {
        return await getServiceById({ serviceId: id });
      }
    },
  });

  if (!data) return;

  const transformDate = (date: Date) =>
    format(date, "d 'de' MMMM", { locale: pt });

  const toggleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flip-card h-[500px] w-1/3">
        <div
          onClick={() => navigate(-1)}
          className="ml-2 flex items-center gap-2"
        >
          <Undo2 className="size-6" />
          <p className="text-muted-foreground">Voltar</p>
        </div>
        <motion.div
          className="flip-card-inner mx-auto flex size-full max-w-[500px] items-center justify-center"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.2, animationDirection: "normal" }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <div className="flip-card-front">
            <Card className="bg-white/5">
              <CardHeader className="flex-row items-center gap-8">
                <Avatar className="size-24">
                  <AvatarImage
                    src={data.service.client.profileImage}
                    alt={data.service.client.name}
                  />
                  <AvatarFallback>
                    {data.service.client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <h1 className="text-2xl font-bold">
                    {data.service.client.name}
                  </h1>
                  <p className="text-muted-foreground">
                    {data.service.client.description}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {WORK_TYPE[data.service.workType]}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {data.service.budget.split("-")[0] !== "0" &&
                      Intl.NumberFormat("pt-BR", {
                        currency: "BRL",
                        style: "currency",
                      }).format(
                        Number(hanldeSplitBudget(data.service.budget).min),
                      )}{" "}
                    até{" "}
                    {Intl.NumberFormat("pt-BR", {
                      currency: "BRL",
                      style: "currency",
                    }).format(
                      Number(hanldeSplitBudget(data.service.budget).max),
                    )}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    <MapPin className="mr-1 size-4" />
                    <LocationBadge addressId={data.service.addressId} />
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 size-4" />
                    Data limite: {transformDate(data.service.deadline)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 size-4" />
                    Postado em: {transformDate(data.service.createdAt)}
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-primary">
                    {data.service.title}
                  </h2>

                  <div>
                    <h2 className="mb-1 text-lg font-semibold">
                      Descrição do Serviço
                    </h2>
                    <p className="text-muted-foreground">
                      {data.service.description}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button className="flex-1" onClick={toggleFlip}>
                  Está interessado?
                </Button>

                <CreateChatButton userId={data.service.client.id} />
              </CardFooter>
            </Card>
          </div>

          <div className="flip-card-back w-full">
            <ProposalForm service={data.service} toggleFlip={toggleFlip} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
