import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  cloudUrl: string;
}

export function ContractModal({ isOpen, onClose, cloudUrl }: ContractModalProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-full ${isFullScreen ? "h-screen w-screen" : "h-5/6 w-11/12"}`}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Contrato Completo
            <Button variant="outline" size="icon" onClick={toggleFullScreen}>
              {isFullScreen ? (
                <Minimize2 className="size-4" />
              ) : (
                <Maximize2 className="size-4" />
              )}
            </Button>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="h-full overflow-y-auto p-4">
          <h2 className="mb-2 text-lg font-semibold">Termos de Contrato</h2>
          <iframe src={cloudUrl} width={1900} height={10000}></iframe>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
